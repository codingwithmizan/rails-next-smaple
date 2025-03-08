"use client";

//edit user form
import { FC } from "react";
import { User } from "@/lib/models";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { putData, postData } from "@/lib/services/api";
import { redirect } from "next/navigation";
import { z } from "zod";

interface Props {
  user?: User;
  addresses: { id: number; city: string }[];
  companies: { id: number; name: string }[];
}

export const schema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  username: z.string().min(1, { message: "UserName is required." }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email address." }),
  phone: z.string().min(1, { message: "Phone is required." }),
  website: z.string().min(1, { message: "Website is required." }),
  company: z.string().min(1, { message: "Company is required." }),
  address: z.string().min(1, { message: "Address is required." }),
});

export type FormData = z.infer<typeof schema>;

export const UserForm: FC<Props> = ({ addresses, companies, user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "all",
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
      website: user?.website || "",
      company: user?.company ? String(user?.company.id) : "",
      address: user?.address ? String(user?.address.id) : "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const formData = {
      user: {
        name: data.name,
        username: data.username,
        email: data.email,
        phone: data.phone,
        website: data.website,
        address_id: data.address,
        company_id: data.company,
      },
    };

    const res = user
      ? await putData(`users/${user?.id}`, formData)
      : await postData("users", formData);
    if (res.success) {
      redirect("/users");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          {...register("name")}
          className="w-full p-2 border rounded"
        />
        {errors.name && <p className="text-red-700">{errors.name.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          {...register("username")}
          className="w-full p-2 border rounded"
        />
        {errors.username && (
          <p className="text-red-700">{errors.username.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-700">{errors.email.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          {...register("phone")}
          className="w-full p-2 border rounded"
        />
        {errors.phone && <p className="text-red-700">{errors.phone.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          {...register("website")}
          className="w-full p-2 border rounded"
        />
        {errors.website && (
          <p className="text-red-700">{errors.website.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="company">Company</label>
        <select {...register("company")} className="w-full p-2 border rounded">
          <option value="">Select Company</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
        {errors.company && (
          <p className="text-red-700">{errors.company.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="address">City</label>
        <select {...register("address")} className="w-full p-2 border rounded">
          <option value="">Select City</option>
          {addresses.map((address) => (
            <option key={address.id} value={address.id}>
              {address.city}
            </option>
          ))}
        </select>
        {errors.address && (
          <p className="text-red-700">{errors.address.message}</p>
        )}
      </div>

      <div className="mt-4">
        <button
          className="bg-sky-700 text-white py-1.5 px-2 rounded"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
