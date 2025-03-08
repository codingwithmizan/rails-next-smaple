import { FC } from "react";
import { Product } from "@/lib/models";
import { getData } from "@/lib/services/api";
import { ClientProductForm } from "@/components/products";

interface Props {
  params: Promise<{ id: string }>;
}

const ProductEdit: FC<Props> = async ({ params }) => {
  const { id } = await params;
  const res = await getData<Product>(`products/${id}`);
  const product = res.data || null;

  return (
    <div className="mx-10">
      <ClientProductForm product={product} />
    </div>
  );
};

export default ProductEdit;
