// import { useState } from "react";

// export const usePagination = () => {
//   const [page, setPage] = useState(1);
//   const [perPage, setPerPage] = useState(25);
//   const [totalPages, setTotalPages] = useState<number>(0);
//   const [totalData, setTotalData] = useState<number>(0);
//   const [prevPage, setPrevPage] = useState<null | number>(null);
//   const [nextPage, setNextPage] = useState<null | number>(null);
//   return {
//     page,
//     perPage,
//     totalPages,
//     totalData,
//     setPage,
//     setPerPage,
//     setTotalPages,
//     setTotalData,
//     prevPage,
//     setPrevPage,
//     nextPage,
//     setNextPage,
//   };
// };

import { useState, useMemo } from "react";

export const usePagination = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [totalData, setTotalData] = useState(0);

  const totalPages = useMemo(
    () => Math.ceil(totalData / perPage),
    [totalData, perPage]
  );
  const prevPage = useMemo(() => (page > 1 ? page - 1 : null), [page]);
  const nextPage = useMemo(
    () => (page < totalPages ? page + 1 : null),
    [page, totalPages]
  );

  return {
    page,
    perPage,
    totalPages,
    totalData,
    prevPage,
    nextPage,
    setPage,
    setPerPage,
    setTotalData,
  };
};
