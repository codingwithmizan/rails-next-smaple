import { FC } from "react";
import { Controller, Control } from "react-hook-form";
import { Radio, Space } from "antd";

interface option {
  id: string | number;
  value: string | number;
  label: string | number;
}
interface RadioGroupControlProps {
  name: string;
  options: option[];
  control: Control<{ [key: string]: unknown }>;
  errors?: { [key: string]: { message: string } };
  disabled?: boolean;
  direction?: "horizontal" | "vertical";
}

export const RadioGroupControl: FC<RadioGroupControlProps> = ({
  name,
  control,
  options,
  errors,
  disabled = false,
  direction = "horizontal",
}) => {
  const errMsg = errors?.[name]?.message;

  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Radio.Group
            {...field}
            disabled={disabled}
            className="rounded my-1 w-full"
            size="large"
          >
            <Space direction={direction}>
              {options?.length > 0 &&
                options?.map((option) => (
                  <Radio value={option?.value} key={option?.id}>
                    <span className="text-xs">{option?.label}</span>
                  </Radio>
                ))}
            </Space>
          </Radio.Group>
        )}
      />
      <p className="text-red-600 text-xs">{errMsg}</p>
    </div>
  );
};
