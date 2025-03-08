//user details page

import { User } from "@/lib/models";
import { getData } from "@/lib/services/api";
import Link from "next/link";
import { FC } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const UserDetails: FC<Props> = async ({ params }) => {
  const { id } = await params;
  const res = await getData<User>(`users/${id}`);
  const user = res.data;
  return (
    <div className="px-10">
      <div className="flex justify-between">
        <h2 className="text-2xl">User Details</h2>
        <Link
          href={`/users/${id}/edit`}
          className="bg-sky-700 text-white py-1.5 px-2 rounded"
        >
          Edit User
        </Link>
      </div>
      <div className="mt-10">
        <ul>
          <li>
            <span className="font-semibold">ID:</span> {user?.id}
          </li>
          <li>
            <span className="font-semibold">Name:</span> {user?.name}
          </li>
          <li>
            <span className="font-semibold">Username:</span> {user?.username}
          </li>
          <li>
            <span className="font-semibold">Email:</span> {user?.email}
          </li>
          <li>
            <span className="font-semibold">Phone:</span> {user?.phone}
          </li>
          <li>
            <span className="font-semibold">Website:</span> {user?.website}
          </li>
          <li>
            <span className="font-semibold">Company:</span>
            {user?.company?.name}
          </li>
          <li>
            <span className="font-semibold">City:</span> {user?.address?.city}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDetails;
