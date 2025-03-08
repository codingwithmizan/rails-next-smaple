//user list page
import Link from "next/link";
import { getData } from "@/lib/services/api";
import { User } from "@/lib/models";
import { UserCard } from "@/components/users/UserCard";

const UserList = async () => {
  const res = await getData<User[]>("users");
  const users = res.data || [];

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
    </div>
  );
};

export default UserList;
