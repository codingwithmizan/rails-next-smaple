"use client";

import { FC } from "react";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "@/hooks";

interface Props {
  total_pages: number;
  total_count: number;
}

export const CustomPagination: FC<Props> = ({ total_pages, total_count }) => {
  const { page, setPage } = useSearchParams();
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <div className="flex justify-between items-center">
      <div className="text-sky-700">
        <span className="font-bold pr-1">Total Item:</span>
        {total_count}
      </div>
      <Pagination
        count={total_pages}
        page={page}
        variant="outlined"
        color="primary"
        onChange={handleChange}
        showFirstButton
        showLastButton
      />
    </div>
  );
};
