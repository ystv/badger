import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { RundownItems } from "./RundownItems";
import Link from "next/link";
import { TusEndpointProvider } from "@/components/MediaUpload";
import { getTusEndpoint } from "@/lib/tus";

export default async function RundownPage(props: {
  params: { show_id: string; rundown_id: string };
}) {
  const rundown = await db.rundown.findFirst({
    where: {
      id: parseInt(props.params.rundown_id, 10),
    },
    include: {
      show: true,
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
  if (!rundown) {
    notFound();
  }
  return (
    <div>
      <Link
        href={`/shows/${rundown.show.id}`}
        className="ml-1 text-sm font-medium text-dark hover:text-primary-4 dark:hover:text-white mb-32"
      >
        Back
      </Link>

      <h2 className="text-xl">{rundown.name}</h2>
      <TusEndpointProvider value={getTusEndpoint()}>
        <RundownItems rundown={rundown} />
      </TusEndpointProvider>
    </div>
  );
}
