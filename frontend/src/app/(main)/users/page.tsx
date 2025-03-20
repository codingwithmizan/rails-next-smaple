//user list page
import { FC } from "react";
import Link from "next/link";
import { getData } from "@/lib/services/api";
import { UsersResponse } from "@/lib/models";
import { UserCard } from "@/components/users/UserCard";
import { Pagination } from "@/components/common";

interface Props {
  searchParams: Promise<{ query?: string; page?: string; perPage?: string }>;
}

const UserList: FC<Props> = async ({ searchParams }) => {
  const { query = "", page = 1, perPage = 5 } = await searchParams;
  const res = await getData<UsersResponse>(
    `users?page=${page}&query=${query}&per_page=${perPage}`
  );
  const users = res.data?.users || [];
  const page_meta = res.data?.meta;

  return (
    <div className="mx-10">
      <h2 className="text-3xl">User List</h2>

      <div className="flex justify-end">
        <Link
          href="/users/new"
          className="bg-sky-700 text-white py-1.5 px-2 rounded "
        >
          Add User
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-10 mt-10">
        {users.map((user) => (
          <UserCard user={user} key={user.id} />
        ))}
      </div>
      <div className="mt-6">
        <Pagination
          total_pages={page_meta?.total_pages || 0}
          total_count={page_meta?.total_count || 0}
        />
      </div>
    </div>
  );
};

export default UserList;
