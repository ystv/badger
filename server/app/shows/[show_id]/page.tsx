import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { RundownOrContinuity } from "./types";
import { ShowItemsList } from "./ShowItemsList";
import { TusEndpointProvider } from "@/components/MediaUpload";
import { getTusEndpoint } from "@/lib/tus";
import { DateTime } from "@/components/DateTIme";
import { MetadataFields } from "@/components/Metadata";
import { MetadataTargetType } from "@badger/prisma/client";
import { addMeta, revalidateIfChanged, setMetaValue } from "./actions";
import { cache } from "react";
import { PastShowsMedia } from "@/components/MediaSelection";
import { FlagGate } from "@/components/FeatureFlags";
import { PermissionGate } from "@/components/PermissionGate";
import Button from "@badger/components/button";
import Link from "next/link";
import { Poll } from "../../../components/Poll";
import { ShowDeletButton } from "./DeletButton";

// TODO: duplicated in rundown/id/page.ts
const pastShowsPromise = cache(
  () =>
    db.show.findMany({
      where: {
        start: {
          lt: new Date(),
        },
      },
      include: {
        rundowns: {
          include: {
            items: {
              include: {
                media: true,
              },
            },
            assets: {
              include: {
                media: true,
              },
            },
            metadata: {
              include: {
                field: true,
                media: true,
              },
            },
          },
        },
        continuityItems: {
          include: {
            media: true,
          },
        },
        metadata: {
          include: {
            field: true,
            media: true,
          },
        },
      },
    }) satisfies Promise<PastShowsMedia>,
);

export default async function ShowPage(props: { params: { show_id: string } }) {
  const show = await db.show.findFirst({
    where: {
      id: parseInt(props.params.show_id, 10),
    },
    include: {
      rundowns: {
        include: {
          items: true,
        },
      },
      continuityItems: {
        include: {
          media: {
            include: {
              tasks: true,
            },
          },
        },
      },
      metadata: {
        include: {
          field: true,
          media: {
            include: {
              tasks: true,
            },
          },
        },
        orderBy: {
          fieldId: "asc",
        },
      },
    },
  });
  if (!show) {
    notFound();
  }
  const metaFields = await db.metadataField.findMany({
    where: {
      target: {
        in: [MetadataTargetType.Show, MetadataTargetType.ShowOrRundown],
      },
      archived: false,
    },
    orderBy: {
      id: "asc",
    },
  });
  const items: RundownOrContinuity[] = (
    show.rundowns.map((r) => ({
      ...r,
      _type: "rundown",
    })) as RundownOrContinuity[]
  )
    .concat(
      show.continuityItems.map((c) => ({ ...c, _type: "continuity_item" })),
    )
    .sort((a, b) => a.order - b.order);
  return (
    <>
      <p>
        Start: <DateTime val={show.start.toUTCString()} />
      </p>
      <FlagGate flag="enableYoutube">
        <PermissionGate permission="ManageYouTubeStreams">
          <Button asChild>
            <Link href={`/shows/${show.id}/youtube`}>YouTube streams</Link>
          </Button>
        </PermissionGate>
      </FlagGate>
      <PermissionGate permission="ManageShows">
        <Button asChild>
          <Link href={`/shows/${show.id}/edit`}>
            Edit <span className="sr-only">Show</span>
          </Link>
        </Button>
        <ShowDeletButton showID={show.id} />
      </PermissionGate>
      <TusEndpointProvider value={getTusEndpoint()}>
        <MetadataFields
          metadata={show.metadata}
          fields={metaFields}
          createMeta={async (fieldID, val) => {
            "use server";
            return addMeta(show.id, fieldID, val);
          }}
          setValue={async (metaID, val) => {
            "use server";
            return setMetaValue(show.id, metaID, val);
          }}
          pastShowsPromise={pastShowsPromise()}
        />
        <ShowItemsList
          show={show}
          items={items}
          pastShowsPromise={pastShowsPromise()}
        />
      </TusEndpointProvider>
      <Poll action={revalidateIfChanged} params={[show.id, show.version]} />
    </>
  );
}
