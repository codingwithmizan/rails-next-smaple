import { useSearchParams, useRouter } from "next/navigation";

export const useQuerySearchParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return {
    handleFilterChange,
  };
};
