import {  useQuery } from "react-query";
import axios from "axios";
import { API_ENDPOINT_PATH } from "../config";

export default function getInvoices(filters: string) {
  const { isLoading, data, isError, error, isSuccess } = useQuery({
    queryKey: ["invoices", filters],
    queryFn: (filters) => {
      console.log(filters);
      return axios.get(`${API_ENDPOINT_PATH}`);
    },
  });
  const invoices = data?.data;
  return { isLoading, invoices, isError, error, isSuccess };
}
