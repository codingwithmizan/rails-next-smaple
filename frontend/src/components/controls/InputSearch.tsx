import { ChangeEvent, FC } from "react";
import { Input } from "antd";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  name: string;
  setQuery: (value: string) => Promise<URLSearchParams>;
  debounceTime?: number;
  placeholder?: string;
  size?: "small" | "middle" | "large";
  allowClear?: boolean;
}

export const InputSearch: FC<Props> = ({
  name,
  setQuery,
  debounceTime = 500,
  size = "large",
  placeholder = "Enter search text here...",
  allowClear = true,
}) => {
  const updateQuery = useDebouncedCallback((value) => {
    setQuery(value);
  }, debounceTime);

  const onSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    updateQuery(e.target.value);
  };

  return (
    <Input
      allowClear={allowClear}
      className="w-full"
      name={name}
      id={name}
      size={size}
      onChange={onSearchQuery}
      placeholder={placeholder}
    />
  );
};
