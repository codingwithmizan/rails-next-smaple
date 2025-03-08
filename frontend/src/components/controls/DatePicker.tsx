import {
  Controller,
  Control,
  FieldValues,
  FieldErrors,
  Path,
} from "react-hook-form";
import type { RangePickerProps } from "antd/es/date-picker";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/lib/constants";

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before today and today
  // return current && current < dayjs().endOf('day');
  //   disable dates before current date and after 1 month of current date.
  //   return dayjs().add(-1, 'days')  >= current ||
  //   dayjs().add(1, 'month')  <= current;
  return dayjs() <= current;
  // return dayjs().endOf("day") <= current;
};

const disabledForAduldDate: RangePickerProps["disabledDate"] = (current) => {
  return dayjs().add(-18, "years") < current;
};

interface Props<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  errors?: FieldErrors<T>;
  defaultValue?: dayjs.Dayjs | null;
  disabled?: boolean;
  placeholder?: string;
  size?: "small" | "middle" | "large";
  format?: string;
  className?: string;
  allowClear?: boolean;
  checkAdult?: boolean;
  onChangeField?: () => void;
}

export const DatePickerControl = <T extends FieldValues>({
  name,
  control,
  errors,
  defaultValue,
  disabled = false,
  placeholder = "2022-01-01",
  className = "",
  size="large",
  allowClear = false,
  checkAdult = false,
  onChangeField,
}: Props<T>) => {
  const errMsg = errors?.[name]?.message;
  return (
    <div className="w-full">
      <Controller
        control={control}
        name={name as Path<T>}
        render={({ field }) => (
          <DatePicker
            allowClear={allowClear}
            {...field}
            id={name as string}
            defaultValue={defaultValue}
            className={`rounded  w-full ${className}`}
            status={errMsg && "error"}
            size={size}
            disabled={disabled}
            placeholder={placeholder}
            placement={"bottomLeft"}
            format={DATE_FORMAT}
            onChange={(e) => {
              if (onChangeField) {
                onChangeField();
              }
              field.onChange(e);
            }}
            disabledDate={checkAdult ? disabledForAduldDate : disabledDate}
          />
        )}
      />
      {errMsg && <p className="text-red-600 mt-1">{String(errMsg)}</p>}
    </div>
  );
};
