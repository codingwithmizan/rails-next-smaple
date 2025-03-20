export const dynamic = "force-dynamic";
import { FC } from "react";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { deleteData, getData } from "@/lib/services/api";
import { ProductsResponse } from "@/lib/models";
import { ProductCard, ProductSearch } from "@/components/products";
import { Pagination } from "@/components/common";

interface Props {
  searchParams: Promise<{ query?: string; page?: string; perPage?: string }>;
}

const ProductList: FC<Props> = async ({ searchParams }) => {
  const { query = "", page = 1, perPage = 5 } = await searchParams;

  const res = await getData<ProductsResponse>(
    `products?page=${page}&query=${query}&per_page=${perPage}`
  );
  const products = res.data?.products || [];
  const page_meta = res.data?.meta;

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
          <Pagination
            total_pages={page_meta?.total_pages || 0}
            total_count={page_meta?.total_count || 0}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
