import { useQueryStates, parseAsInteger, parseAsString } from "nuqs";

type SearchParams = {
  sort: string;
  query: string;
  page: number;
};

type SetSearchParams = {
  setSort: (newSort: string) => void;
  setQuery: (newQuery: string) => void;
  setPage: (newPage: number) => void;
};

export const useSearchParams = (): SearchParams & SetSearchParams => {
  const [params, setParams] = useQueryStates(
    {
      sort: parseAsString.withDefault("asc"),
      query: parseAsString.withDefault(""),
      page: parseAsInteger.withDefault(1),
    },
    {
      shallow: false,
    }
  );

  const setSort = (sort: string) => setParams({ sort, page: 1 });
  const setQuery = (query: string) => setParams({ query, page: 1 });
  const setPage = (page: number) => setParams({ page });

  return {
    sort: params.sort,
    query: params.query,
    page: params.page,
    setSort,
    setQuery,
    setPage,
  };
};
