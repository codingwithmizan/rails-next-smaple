"use client";

import { useSearchParams } from "@/hooks";
import { InputSearch } from "@/components/controls";

export const ProductSearch = () => {
  const { setQuery } = useSearchParams();

  return (
    <InputSearch
      name="query"
      setQuery={setQuery}
      placeholder="Search by title and description"
    />
  );
};
