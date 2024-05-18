"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function Pagination(props: {
  current: number;
  total: number;
  pageSize: number;
}) {
  const router = useRouter();
  const path = usePathname();
  const search = useSearchParams();

  const totalPages = Math.ceil(props.total / props.pageSize);

  const goToPage = useCallback(
    (page: number) => {
      const url = new URL(
        (path ?? "") + (search?.toString() ?? ""),
        window.location.href,
      );
      url.searchParams.set("page", page.toString());
      router.push(url.toString());
    },
    [router, path, search],
  );

  return (
    <div className="flex flex-row justify-center">
      {props.current > 1 && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => goToPage(props.current - 1)}
        >
          Previous
        </button>
      )}
      <div className="mx-2">
        Page {props.current} of {totalPages}
      </div>
      {props.current < totalPages && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => goToPage(props.current + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
}
