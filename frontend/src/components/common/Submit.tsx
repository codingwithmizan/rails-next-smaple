"use client";
import { useFormStatus } from "react-dom";

export const Submit = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-sky-800 text-white rounded p-2 disabled:bg-gray-500"
      type="submit"
      disabled={pending}
    >
      Submit
    </button>
  );
};
