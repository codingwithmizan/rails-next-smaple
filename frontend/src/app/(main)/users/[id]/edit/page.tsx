//user edit page
import { FC } from "react";
import { User } from "@/lib/models";
import { getData } from "@/lib/services/api";
import { UserForm } from "@/components/users";
import { getUserFormData } from "@/lib/services/user";

interface Props {
  params: Promise<{ id: string }>;
}

const UserEdit: FC<Props> = async ({ params }) => {
  const { id } = await params;
  const [userRes, { addresses, companies }] = await Promise.all([
    getData<User>(`users/${id}`),
    getUserFormData(),
  ]);
  const user = userRes.data ?? undefined;
  return (
    <div className="mx-20">
      <UserForm user={user} addresses={addresses} companies={companies} />
    </div>
  );
};

export default UserEdit;
