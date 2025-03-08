"use client";

//user card
import { User } from "@/lib/models";
import { deleteData } from "@/lib/services/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useTransition } from "react";

interface Props {
  user: User;
}

export const UserCard: FC<Props> = ({ user }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const deleteUser = async (id: number) => {
    const res = await deleteData(`/users/${id}`);

    if (res.success) {
      startTransition(() => {
        router.refresh();
      });
    }
  };

  return (
    <div className="bg-sky-300 p-4 rounded">
      <Link href={`/users/${user.id}`}>
        <h2>ID: {user.id}</h2>
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>{user.phone}</p>
      </Link>

      <div className="mt-4">
        <button
          className="bg-red-600 text-white py-1.5 px-2"
          onClick={() => deleteUser(user.id)}
        >
          {isPending ? "Deleteing..." : "Delete"}
        </button>
      </div>
    </div>
  );
};
