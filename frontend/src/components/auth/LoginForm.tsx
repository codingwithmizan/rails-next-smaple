"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { Input, Password, FieldLabel } from "@/components/controls";


const schema = z.object({
  email: z
    .string()
    .min(5, { message: "Email is required." })
    .email({ message: "Invalid Email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

type FormData = z.infer<typeof schema>;

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      console.log("Invalid credentials 33");
    } else {
      redirect("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <FieldLabel name="email" label="Email" required />
        <Input
          name="email"
          control={control}
          errors={errors}
          placeholder="Ex: abc@gmail.com"
        />
      </div>
      <div className="mb-4">
        <FieldLabel name="password" label="Password" required />
        <Password
          name="password"
          control={control}
          errors={errors}
          placeholder="*************"
        />
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="bg-sky-700 text-white py-1.5 px-2 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
