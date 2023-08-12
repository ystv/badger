import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { RundownItems } from "./RundownItems";
import RundownAssets from "./RundownAssets";
import Link from "next/link";
import { TusEndpointProvider } from "@/components/MediaUpload";
import { getTusEndpoint } from "@/lib/tus";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";

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
  return <RundownAssets rundown={rundown} />;
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
  return <RundownItems rundown={rundown} />;
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

          <h2 className="text-xl">{rundown.name}</h2>
        </div>
        <TusEndpointProvider value={getTusEndpoint()}>
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
