"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@/lib/models";
import { z } from "zod";
import { redirect } from "next/navigation";
import { putData, postData } from "@/lib/services/api";
import {
  Input,
  FieldLabel,
  TextArea,
  InputNumber,
} from "@/components/controls";

interface Props {
  product: Product | null;
}

export const schema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  price: z.coerce
    .number()
    .min(0.01, { message: "Price must be greater than 0." }),
});

export type FormtData = z.infer<typeof schema>;

export const ClientProductForm: FC<Props> = ({ product }) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormtData>({
    mode: "all",
    defaultValues: {
      title: product?.title || "",
      description: product?.description || "",
      price: product?.price ? Number(product?.price) : 0,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormtData) => {
    const formData = {
      product: {
        title: data.title,
        description: data.description,
        price: Number(data.price),
      },
    };

    const res = product
      ? await putData(`products/${product?.id}`, formData)
      : await postData("products", formData);

    if (res.success) redirect(`/products`);
  };

  return (
    <div className="w-4xl mx-auto px-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-4">
          <FieldLabel name="title" label="Title" required />
          <Input
            name="title"
            control={control}
            errors={errors}
            placeholder="Enter product title"
          />
        </div>
        <div className="my-4">
          <FieldLabel name="description" label="Description" required />
          <TextArea
            name="description"
            control={control}
            errors={errors}
            placeholder="Write Here..."
          />
        </div>
        <div className="my-4">
          <FieldLabel name="price" label="Price" required />
          <InputNumber
            name="price"
            control={control}
            errors={errors}
            placeholder="Ex. 0.0"
          />
        </div>
        <div className="my-4">
          <button
            className="bg-sky-800 text-white rounded p-2"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};
