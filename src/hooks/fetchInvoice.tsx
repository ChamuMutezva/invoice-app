import axios from "axios";
import { useQuery } from "react-query";

export default function fetchInvoice(id: any) {
  const { isLoading, data, isError, error } = useQuery(["invoices", id], () => {
    return axios.get(`http://localhost:4000/api/invoices/${id}`);
  });
  const invoice = data?.data;
  return { isLoading, invoice, isError, error };
}
