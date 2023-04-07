import axios from "axios";
import { useQuery } from "react-query";

export default function fetchInvoice(id: any) {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["invoices", id],
    queryFn: () => {
      return axios.get(`http://localhost:4000/api/invoices/${id}`);
    },
  });
  const invoice = data?.data;
  return { isLoading, invoice, isError, error };
}
/*
export const fetchInvoice = ( id: any) =>
   axios.get(`http://localhost:4000/api/invoices/${id}`).then((res) => res.data)

export default function useInvoice(id: any) {
  return useQuery(id && ['invoice', id], fetchInvoice)
}
*/
