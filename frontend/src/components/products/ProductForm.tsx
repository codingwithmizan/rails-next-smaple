// "use client";

// import { useFormState } from "react-dom";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { submitForm } from "@/app/actions/formActions";
// import { z } from "zod";

// const formSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   email: z.string().email("Invalid email format"),
// });

// type FormData = z.infer<typeof formSchema>;

// export default function Form() {
//   const [state, formAction] = useFormState(submitForm, null);
//   const {
//     register,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//   });

//   return (
//     <form action={formAction} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium">Name</label>
//         <input
//           {...register("name")}
//           className="border p-2 w-full rounded"
//           placeholder="Enter your name"
//         />
//         {errors.name && <p className="text-red-500">{errors.name.message}</p>}
//       </div>

//       {/* Email Input */}
//       <div>
//         <label className="block text-sm font-medium">Email</label>
//         <input
//           {...register("email")}
//           className="border p-2 w-full rounded"
//           placeholder="Enter your email"
//         />
//         {errors.email && <p className="text-red-500">{errors.email.message}</p>}
//       </div>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Submit
//       </button>

//       {/* Server Response */}
//       {state && (
//         <p className={state.success ? "text-green-500" : "text-red-500"}>
//           {state.message}
//         </p>
//       )}
//     </form>
//   );
// }

import React from 'react'

export const ProductForm = () => {
  return (
    <div>ProductForm</div>
  )
}
