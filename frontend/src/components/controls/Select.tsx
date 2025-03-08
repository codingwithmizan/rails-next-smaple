import {
  Controller,
  Control,
  FieldValues,
  FieldErrors,
  Path,
} from "react-hook-form";
import { Select } from "antd";

const { Option } = Select;

interface OptionType {
  value: string | number | boolean;
  label: string | number;
}

interface Props<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  errors?: FieldErrors<T>;
  options: OptionType[];
  multiple?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  msg?: string;
  size?: "small" | "middle" | "large";
  defaultValue?: string | number | boolean;
  onChangeOption?: (value: string | number | boolean) => void;
}

export const SelectControl = <T extends FieldValues>({
  name,
  control,
  options,
  errors = {} as FieldErrors<T>,
  defaultValue = "",
  msg,
  disabled = false,
  placeholder = "",
  className = "",
  onChangeOption,
  multiple = false,
}: Props<T>) => {
  const errMsg = msg || errors?.[name]?.message;

  return (
    <div className="relative w-full">
      <Controller
        control={control}
        name={name as Path<T>}
        render={({ field }) => (
          <Select
            {...field}
            value={field.value as string | number | boolean | null | undefined}
            mode={multiple ? "multiple" : undefined}
            disabled={disabled}
            className={`w-full ${className}`}
            status={errMsg ? "error" : ""}
            size="large"
            defaultValue={defaultValue}
            id={name as string}
            virtual={false}
            onChange={(e) => {
              onChangeOption?.(e);
              field.onChange(e);
            }}
          >
            {placeholder && (
              <Option value="">
                <span className="text-gray-400 wave-money-text">
                  {placeholder}
                </span>
              </Option>
            )}
            {options.map((item, index) => (
              <Option key={index} value={item.value}>
                <span className="">{item.label}</span>
              </Option>
            ))}
          </Select>
        )}
      />
      {errMsg && <p className="text-red-600 mt-1">{String(errMsg)}</p>}
    </div>
  );
};
