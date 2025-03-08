import {
  Controller,
  Control,
  FieldValues,
  FieldErrors,
  Path,
  PathValue,
} from "react-hook-form";
import { Input } from "antd";

interface Props<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  type?: string;
  errors?: FieldErrors<T>;
  defaultValue?: PathValue<T, Path<T>>;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  msg?: string;
  size?: "small" | "middle" | "large";
  toUpper?: boolean;
  onChangeField?: () => void;
  allowCopyPaste?: boolean;
}

export const InputControl = <T extends FieldValues>({
  name,
  type = "text",
  control,
  errors = {} as FieldErrors<T>,
  msg,
  disabled = false,
  placeholder = "",
  className = "",
  size = "large",
  defaultValue,
  toUpper = false,
  onChangeField,
  allowCopyPaste = true,
}: Props<T>) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { selectionStart, selectionEnd, value } = e.target;
    e.target.value = toUpper ? value.toUpperCase() : value;
    e.target.setSelectionRange(selectionStart ?? 0, selectionEnd ?? 0);
    onChangeField?.();
  };

  const errMsg = msg || errors?.[name]?.message;
  return (
    <div className="relative w-full">
      <Controller
        control={control}
        name={name as Path<T>}
        defaultValue={defaultValue}
        render={({ field: { value, ...field } }) => (
          <Input
            {...field}
            value={value as string}
            allowClear
            type={type}
            id={name as string}
            className={`rounded my-1 py-2 w-full ${className}`}
            status={errMsg ? "error" : ""}
            size={size}
            disabled={disabled}
            placeholder={placeholder}
            onChange={(e) => {
              field.onChange(e);
              handleInputChange(e);
            }}
            onPaste={(e) => !allowCopyPaste && e.preventDefault()}
            onCopy={(e) => !allowCopyPaste && e.preventDefault()}
          />
        )}
      />
      {errMsg && <p className="text-red-600 mt-1">{String(errMsg)}</p>}
    </div>
  );
};
