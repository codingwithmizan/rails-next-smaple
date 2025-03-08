import { getData } from "@/lib/services/api";

export const getUserFormData = async () => {
  const [addressRes, companyRes] = await Promise.all([
    getData<{ id: number; city: string }[]>("addresses"),
    getData<{ id: number; name: string }[]>("companies"),
  ]);

  return {
    addresses: addressRes.data || [],
    companies: companyRes.data || [],
  };
};
