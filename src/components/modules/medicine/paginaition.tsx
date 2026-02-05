"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {
  page: number;
  totalPage: number;
};

export default function Pagination({ page, totalPage }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPage <= 1) return null;

  const goToPage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    router.push(`/medicine?${params.toString()}`);
  };

  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      <Button
        variant="outline"
        disabled={page === 1}
        onClick={() => goToPage(page - 1)}
      >
        Previous
      </Button>

      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPage}
      </span>

      <Button
        variant="outline"
        disabled={page === totalPage}
        onClick={() => goToPage(page + 1)}
      >
        Next
      </Button>
    </div>
  );
}
