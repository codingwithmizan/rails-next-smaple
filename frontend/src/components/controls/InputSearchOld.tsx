import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface Props<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  placeholder?: string;
  className?: string;
  size?: "small" | "middle" | "large";
}

export const InputSearchOld = <T extends FieldValues>({
  name,
  control,
  placeholder = "",
  className = "",
  size = "large",
}: Props<T>) => {
  return (
    <div className="relative">
      <Controller
        control={control}
        name={name as Path<T>}
        render={({ field }) => (
          <Input
            allowClear
            {...field}
            value={field.value as string}
            type="text"
            id={name as string}
            className={`rounded w-full ${className}`}
            size={size}
            placeholder={placeholder}
            prefix={
              <SearchOutlined
                className="text-gray-400"
                style={{ fontSize: "18px" }}
              />
            }
          />
        )}
      />
    </div>
  );
};
