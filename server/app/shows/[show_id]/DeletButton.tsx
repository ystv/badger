"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@badger/components/popover";
import { useTransition } from "react";
import { deletShow } from "./actions";
import Button from "@badger/components/button";

export function ShowDeletButton(props: { showID: number }) {
  const [isPending, startTransition] = useTransition();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button color="danger">
          Delet <span className="sr-only">Show</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Button
          color="danger"
          onClick={() => {
            startTransition(async () => {
              await deletShow(props.showID);
            });
          }}
          disabled={isPending}
        >
          You sure boss?
        </Button>
      </PopoverContent>
    </Popover>
  );
}
