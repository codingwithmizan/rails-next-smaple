//user create page
import React from "react";
import { UserForm } from "@/components/users";
import { getUserFormData } from "@/lib/services/user";

const UserAdd = async () => {
  const { addresses, companies } = await getUserFormData();

  return (
    <div className="mx-20">
      <UserForm addresses={addresses} companies={companies} />
    </div>
  );
};

export default UserAdd;
