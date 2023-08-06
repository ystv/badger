import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { DebugOnly } from "@/components/DebugMode";

export default async function ShowLayout(props: {
  children: ReactNode;
  params: { show_id: string };
}) {
  const show = await db.show.findFirst({
    where: {
      id: parseInt(props.params.show_id, 10),
    },
  });
  if (!show) {
    notFound();
  }
  return (
    <div>
      <h1 className="text-3xl mb-2">{show.name}</h1>
      <DebugOnly>
        <b>Version: {show.version}</b>
      </DebugOnly>
      {props.children}
    </div>
  );
}
