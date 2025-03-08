import { ClientProductForm } from "@/components/products";

const ProductAdd = async () => {
  return (
    <div className="mx-10">
      <ClientProductForm product={null} />
    </div>
  );
};

export default ProductAdd;

// import { redirect } from "next/navigation";
// import { postData } from "@/lib/services";
// import { getValue } from "@/lib/helpers";
// import { AddProductForm, type FormState } from "@/components/products";

// const ProductAdd = async () => {
//   const onSubmit = async (
//     state: FormState,
//     formData: FormData
//   ): Promise<FormState> => {
//     "use server";

//     const title = getValue(formData, "title");
//     const description = getValue(formData, "description");
//     const priceStr = getValue(formData, "price");
//     const price = priceStr ? Number(priceStr) : "";

//     const res = await postData("products", {
//       product: { title, description, price },
//     });

//     if (res.success) redirect("/products");

//     return {
//       errors: {},
//       values: { title: "", description: "", price: "" },
//     };
//   };

//   return (
//     <div className="mx-10">
//       <AddProductForm action={onSubmit} />
//     </div>
//   );
// };

// export default ProductAdd;
