import {
  Controller,
  Control,
  FieldValues,
  FieldErrors,
  Path,
} from "react-hook-form";
import { DatePicker } from "antd";
import { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

interface Props<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  errors?: FieldErrors<T>;
  disabled?: boolean;
  format?: string;
  size?: "small" | "middle" | "large";
  className?: string;
  defaultPickerValue?: [Dayjs, Dayjs] | undefined | null;
}

export const DateRangePickerControl = <T extends FieldValues>({
  name,
  control,
  errors,
  disabled = false,
  format = "DD/MM/YYYY",
  size = "large",
  className = "",
  defaultPickerValue,
}: Props<T>) => {
  const errMsg = errors?.[name]?.message;
  return (
    <div>
      <Controller
        control={control}
        name={name as Path<T>}
        render={({ field }) => (
          <RangePicker
            allowClear
            {...field}
            id={name as string}
            className={`!my-1 !w-full  ${className}`}
            status={errMsg && "error"}
            size={size}
            disabled={disabled}
            placement={"bottomLeft"}
            value={defaultPickerValue}
            format={format}
            data-testid={name}
          />
        )}
      />
      {errMsg && <p className="text-red-600 mt-1">{String(errMsg)}</p>}
    </div>
  );
};
