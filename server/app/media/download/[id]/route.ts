import { requirePermission } from "@/lib/auth";
import { db } from "@/lib/db";
import { getPresignedURL } from "@/lib/s3";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  await requirePermission("Basic");
  const media = await db.media.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!media) {
    notFound();
  }
  if (media.state !== "Ready" && media.state !== "ReadyWithWarnings") {
    return new NextResponse("This media item is not ready yet.", {
      status: 400,
    });
  }
  if (!media.path) {
    return new NextResponse("This media item has no path.", { status: 400 });
  }
  const url = await getPresignedURL(media.path, 3600);
  return NextResponse.redirect(url, {
    status: 303,
  });
}
