import { useQuery } from "@tanstack/react-query";
import { remoteInstance } from "@/http/axios";
import { ICustomer } from "@/types/global";
import ENDPOINTS from "@/http/endpoints";

const fetchCustomers = async (): Promise<ICustomer[]> => {
  const { data } = await remoteInstance.get(ENDPOINTS.customer.getCustomers);
  return data;
};

export const useGetCustomer = () => {
  return useQuery<ICustomer[], Error>({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
