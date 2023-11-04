import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { RundownItems } from "./RundownItems";
import RundownAssets from "./RundownAssets";
import Link from "next/link";
import { TusEndpointProvider } from "@/components/MediaUpload";
import { getTusEndpoint } from "@/lib/tus";
import { Suspense, cache } from "react";
import { Button } from "@bowser/components/button";
import { MetadataTargetType } from "@bowser/prisma/client";
import { MetadataFields } from "@/components/Metadata";
import { addMeta, setMetaValue } from "./metaActions";
import { PastShowsMedia } from "@/components/MediaSelection";

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
          },
        },
        continuityItems: {
          include: {
            media: true,
          },
        },
      },
    }) satisfies Promise<PastShowsMedia>,
);

async function RundownAssetsFetcher(props: { rundownID: number }) {
  const rundown = await db.rundown.findFirstOrThrow({
    where: {
      id: props.rundownID,
    },
    include: {
      assets: {
        include: {
          media: true,
        },
      },
    },
  });
  return (
    <RundownAssets rundown={rundown} pastShowsPromise={pastShowsPromise()} />
  );
}

async function RundownItemsFetcher(props: { rundownID: number }) {
  const rundown = await db.rundown.findFirstOrThrow({
    where: {
      id: props.rundownID,
    },
    include: {
      items: {
        include: {
          media: {
            include: {
              tasks: true,
            },
          },
        },
        orderBy: {
          order: "asc",
        },
      },
    },
  });
  return (
    <RundownItems rundown={rundown} pastShowsPromise={pastShowsPromise()} />
  );
}

async function RundownMetadata(props: { showID: number; rundownID: number }) {
  const [fields, meta] = await Promise.all([
    db.metadataField.findMany({
      where: {
        target: {
          in: [MetadataTargetType.Rundown, MetadataTargetType.ShowOrRundown],
        },
        archived: false,
      },
      orderBy: {
        id: "asc",
      },
    }),
    db.metadata.findMany({
      where: {
        rundownId: props.rundownID,
      },
      include: {
        field: true,
      },
      orderBy: {
        fieldId: "asc",
      },
    }),
  ] as const);
  return (
    <MetadataFields
      metadata={meta}
      fields={fields}
      createMeta={async (fieldID, val) => {
        "use server";
        return addMeta(props.showID, props.rundownID, fieldID, val);
      }}
      setValue={async (metaID, val) => {
        "use server";
        return setMetaValue(props.rundownID, props.rundownID, metaID, val);
      }}
    />
  );
}

export default async function RundownPage(props: {
  params: { show_id: string; rundown_id: string };
}) {
  const rundown = await db.rundown.findFirst({
    where: {
      id: parseInt(props.params.rundown_id, 10),
    },
  });
  if (!rundown) {
    notFound();
  }
  return (
    <div>
      <div className="flex-col space-y-4">
        <div>
          <Button color="link" asChild>
            <Link href={`/shows/${rundown.showId}`}>Back</Link>
          </Button>

          <h2 className="text-xl font-bold">{rundown.name}</h2>
        </div>
        <TusEndpointProvider value={getTusEndpoint()}>
          <Suspense fallback={<div>Loading...</div>}>
            <RundownMetadata showID={rundown.showId} rundownID={rundown.id} />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <RundownAssetsFetcher rundownID={rundown.id} />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <RundownItemsFetcher rundownID={rundown.id} />
          </Suspense>
        </TusEndpointProvider>
      </div>
    </div>
  );
}
