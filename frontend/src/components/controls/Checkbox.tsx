import { FC } from "react";
import { Controller, Control } from "react-hook-form";
import { Checkbox } from "antd";

interface Props {
  name: string;
  control: Control<{ [key: string]: unknown }>;
  label: string;
  errors?: { [key: string]: { message: string } };
  disabled?: boolean;
  className?: string;
}

export const CheckboxControl: FC<Props> = ({
  name,
  control,
  label = "",
  errors,
  disabled = false,
  className = "",
}) => {
  const errMsg = errors?.[name]?.message;

  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Checkbox
            onChange={onChange}
            checked={value as boolean}
            disabled={disabled}
            className={`rounded my-1 ${className}`}
          >
            <span className="text-xs">{label}</span>
          </Checkbox>
        )}
      />
      <p className="text-red-600 text-xs">{errMsg}</p>
    </div>
  );
};
