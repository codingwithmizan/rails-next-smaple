import {
  Controller,
  Control,
  FieldValues,
  FieldErrors,
  Path,
} from "react-hook-form";
import { Input } from "antd";

const { TextArea } = Input;

interface Props<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  type?: string;
  errors?: FieldErrors<T>;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  rows?: number;
  msg?: string;
  size?: "small" | "middle" | "large";
}

export const TextAreaControl = <T extends FieldValues>({
  name,
  control,
  errors = {} as FieldErrors<T>,
  disabled = false,
  placeholder = "",
  maxLength = 1000,
  rows = 3,
  size = "large",
  className = "",
  msg,
}: Props<T>) => {
  const errMsg = msg || errors?.[name]?.message;
  return (
    <div className="relative">
      <Controller
        control={control}
        name={name as Path<T>}
        render={({ field }) => (
          <TextArea
            {...field}
            value={field.value as string}
            allowClear
            id={name as string}
            className={`rounded ${className}`}
            status={errMsg ? "error" : ""}
            rows={rows}
            maxLength={maxLength}
            disabled={disabled}
            placeholder={placeholder}
            size={size}
          />
        )}
      />
      {errMsg && <p className="text-red-600">{String(errMsg)}</p>}
    </div>
  );
};
