import {
  Controller,
  Control,
  FieldValues,
  FieldErrors,
  Path,
} from "react-hook-form";
import { InputNumber } from "antd";

interface Props<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  errors?: FieldErrors<T>;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  msg?: string;
  size?: "small" | "middle" | "large";
  max?: number;
  min?: number;
  step?: number;
  allowCopyPaste?: boolean;
}

export const InputNumberControl = <T extends FieldValues>({
  name,
  control,
  errors,
  disabled = false,
  placeholder = "",
  max = 999999999,
  min = 0,
  className = "",
  step = 1,
  allowCopyPaste = true,
  msg,
  size = "large",
}: Props<T>) => {
  const errMsg = msg || errors?.[name]?.message;
  return (
    <div>
      <Controller
        control={control}
        name={name as Path<T>}
        render={({ field }) => (
          <InputNumber
            {...field}
            id={name as string}
            className={`rounded my-1  ${className}`}
            status={errMsg && "error"}
            size={size}
            max={max}
            min={min}
            step={step}
            onPaste={(e) => {
              if (!allowCopyPaste) e.preventDefault();
            }}
            onCopy={(e) => {
              if (!allowCopyPaste) e.preventDefault();
            }}
            disabled={disabled}
            placeholder={placeholder}
            style={{ width: "100%" }}
          />
        )}
      />
      {errMsg && <p className="text-red-600 mt-1">{String(errMsg)}</p>}
    </div>
  );
};
