import { Product } from "@/lib/models";
import { getData } from "@/lib/services/api";
import Link from "next/link";
import { FC } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const ProductDetails: FC<Props> = async ({ params }) => {
  const { id } = await params;
  const res = await getData<Product>(`products/${id}`);
  const product = res.data;
  return (
    <div className="mx-10">
      <div className="flex justify-end">
        <Link
          className="block bg-sky-700 text-white p-2 rounded"
          href={`/products/${id}/edit`}
        >
          Edit Product
        </Link>
      </div>
      <div>
        <h2>ID: {product?.id}</h2>
        <h2>{product?.title}</h2>
        <p>{product?.description}</p>
        <p>Price: ${product?.price}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
