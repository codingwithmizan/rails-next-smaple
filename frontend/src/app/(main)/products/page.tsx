export const dynamic = "force-dynamic";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { deleteData, getData } from "@/lib/services/api";
import { Product } from "@/lib/models";
import { ProductCard, ProductSearch } from "@/components/products";
import { FC } from "react";
import { Pagination } from "@/components/common";

interface Props {
  searchParams: Promise<{ query?: string; page?: string; perPage?: string }>;
}

const ProductList: FC<Props> = async ({ searchParams }) => {
  const { query = "", page = 1, perPage = 3 } = await searchParams;

  const res = await getData<{ products: Product[]; total: number }>(
    `products?page=${page}&query=${query}&per_page=${perPage}`
  );
  const products = res.data?.products || [];
  const total = res.data?.total || 0;

  const deleteProduct = async (id: number) => {
    "use server";

    await new Promise((resolve) => setTimeout(resolve, 2000));
    const res = await deleteData(`products/${id}`);
    if (res.success) {
      revalidatePath("/products");
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-10">
      <div className="flex justify-between">
        <h2 className="text-3xl mb-5">Product List</h2>
        <div>
          <Link
            href="/products/new"
            className="bg-sky-800 text-white rounded p-2"
          >
            Add Product
          </Link>
        </div>
      </div>

      <div>
        <ProductSearch />
        <ProductCard products={products} deleteProduct={deleteProduct} />
        <div className="mt-6">
          <Pagination total={total} />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
