"use client";
import Link from "next/link";
import { Product } from "@/lib/models";
import { FC, useOptimistic } from "react";

interface Props {
  products: Product[];
  deleteProduct: (id: number) => void;
}

export const ProductCard: FC<Props> = ({ products, deleteProduct }) => {
  const [optimisticProducts, addOptimisticProduct] = useOptimistic(
    products,
    (currentProducts, id) => {
      return currentProducts.filter((product) => product.id !== id);
    }
  );

  const deleteProductById = async (id: number) => {
    addOptimisticProduct(id);
    deleteProduct(id);
  };

  return (
    <div>
      {optimisticProducts.map((product) => (
        <div className="bg-sky-200 p-2 my-4 rounded block" key={product.id}>
          <Link href={`/products/${product.id}`}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </Link>

          <form action={deleteProductById.bind(null, product.id)}>
            <button className="bg-red-700 text-white py-1.5 px-2 rounded mt-2">
              Delete
            </button>
          </form>
        </div>
      ))}
    </div>
  );
};
