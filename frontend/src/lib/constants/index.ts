
import dayjs from "dayjs";

// Date and Time Formats
export const CURRENT_DATE = dayjs().format("YYYY-MM-DD");
export const DATE_FORMAT = "YYYY-MM-DD";
export const DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

// File Upload Constraints
export const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB
export const IMAGE_UPLOAD_FORMATS = [".png", ".jpg", ".jpeg", ".webp"].join(
  ", "
);
export const IMAGE_UPLOAD_MIME_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
];
export const BULK_UPLOAD_FILE_FORMATS = [".csv"].join(", ");
export const BULK_UPLOAD_FILE_MIME_TYPES = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "text/comma-separated-values",
  "application/csv",
  "text/csv",
];

// Labels
export const FILE_TYPE_LABEL_TXT =
  "Only .jpg/jpeg, .png, .webp image types are supported.";
export const FILE_SIZE_LABEL_TXT = "Image size must not exceed 1 MB.";

// Debounce Time
export const DEBOUNCE_TIME = 600; // in milliseconds

// Validation Regex
export const PASSPORT_REGEX = /^(?!^0+$)[a-zA-Z0-9]{3,20}$/;
export const NRC_REGEX = /^([0-9]{1,2}\/\[a-zA-Z]{6,8}\([A-Z]{1}\)[0-9]{6})$/;
