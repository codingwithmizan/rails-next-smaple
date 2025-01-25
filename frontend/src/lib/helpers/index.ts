import moment from "moment";
import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

export const scrollToTop = (): void => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 50);
  }
};

export const capitalize = (str: string = ""): string => {
  const lower = str.toLocaleLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
};

export const titleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getFormattedDate = (
  date?: string,
  format: string = "YYYY-MM-DD"
): string => {
  return date ? moment(date).utcOffset("+0630").format(format) : "";
};

export const commaRemover = (value: string): string => {
  return value.replace(/,/g, "");
};

export const getDate = (date: string): moment.Moment => {
  return moment(date).utcOffset("+0600");
};

export const refreshPage = (url: string, callback?: () => void): void => {
  setTimeout(() => {
    callback?.();
    window.location.replace(url);
  }, 1000);
};

export const humanize = (str: string): string => {
  return str
    .replace(/^[\s_]+|[\s_]+$/g, "")
    .replace(/[_\s]+/g, " ")
    .replace(/^[a-z]/, (match) => match.toUpperCase());
};

export const getRole = (role: number): string => {
  switch (role) {
    case 0:
      return "Member";
    case 1:
      return "Admin";
    case 2:
      return "Super Admin";
    case 3:
      return "Manager";
    default:
      return "";
  }
};

export const isImage = (url: string): boolean => {
  try {
    const u = new URL(url);
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/i.test(u.pathname);
  } catch {
    return false;
  }
};

export const isValidUrl = (val: string): boolean => {
  try {
    const url = new URL(val);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

export const isValidDate = (val: string): boolean => {
  return /\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])T(?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+|)(?:Z|(?:[+\-]\d{2}):?(\d{2}))/.test(
    val
  );
};

export const validOnlyDate = (val: string): boolean => {
  return /^\d{4}-\d{1,2}-\d{1,2}$/.test(val);
};

export const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
