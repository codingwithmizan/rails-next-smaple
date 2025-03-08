import { useState, FC } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import Image from "next/image";
import { Controller, Control } from "react-hook-form";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { getBase64 } from "@/lib/helpers";

interface Props {
  name: string;
  control: Control<{ [key: string]: unknown }>;
  errors?: { [key: string]: { message: string } };
  msg?: string;
  disabled?: boolean;
  acceptFileFormat: string;
  afterFileUpload?: () => void;
}

export const ImageUploader: FC<Props> = ({
  control,
  name,
  errors,
  msg,
  disabled = false,
  acceptFileFormat,
  afterFileUpload,
}) => {
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const errMsg = msg ? msg : errors?.[name]?.message;

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }} className="wave-money-text">
        Upload
      </div>
    </div>
  );
  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Upload
            {...field}
            multiple={false}
            accept={acceptFileFormat}
            maxCount={1}
            onChange={(e) => {
              field.onChange(e);
              handleChange(e);
              if (afterFileUpload) {
                afterFileUpload();
              }
            }}
            onRemove={() => {
              setFileList([]);
            }}
            onPreview={handlePreview}
            fileList={fileList}
            listType="picture-card"
            beforeUpload={() => false}
            disabled={disabled}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        )}
      />
      {fileList.length > 0 && <p className="error-msg">{errMsg}</p>}
      <Image
        alt="profile image"
        layout="responsive"
        width={500}
        height={500}
        src={previewImage}
      />
    </div>
  );
};
