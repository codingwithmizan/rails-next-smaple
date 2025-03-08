import {
  Controller,
  Control,
  FieldValues,
  FieldErrors,
  Path,
} from "react-hook-form";
import { Input } from "antd";

interface Props<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  errors?: FieldErrors<T>;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  msg?: string;
  size?: "small" | "middle" | "large";
  allowCopyPaste?: boolean;
}
export const PasswordControl = <T extends FieldValues>({
  name,
  control,
  errors = {} as FieldErrors<T>,
  disabled = false,
  placeholder = "",
  className = "",
  msg,
  size = "large",
  allowCopyPaste = true,
}: Props<T>) => {
  const errMsg = msg || errors?.[name]?.message;
  return (
    <div className="relative">
      <Controller
        control={control}
        name={name as Path<T>}
        render={({ field }) => (
          <Input.Password
            allowClear
            {...field}
            value={field.value as string}
            id={name as string}
            className={`rounded my-1 ${className}`}
            status={errMsg && "error"}
            size={size}
            disabled={disabled}
            placeholder={placeholder}
            onPaste={(e) => {
              if (!allowCopyPaste) e.preventDefault();
            }}
            onCopy={(e) => {
              if (!allowCopyPaste) e.preventDefault();
            }}
          />
        )}
      />
      {errMsg && <p className="text-red-600 mt-1">{String(errMsg)}</p>}
    </div>
  );
};
