import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { API_ENDPOINT_PATH } from "../config";
//axios.get(`http://localhost:4000/api/invoices`);
export default function getInvoices() {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: "invoices",
    queryFn: () => {
      return axios.get(`${API_ENDPOINT_PATH}`);
    },
  });
  const invoices = data?.data;
  return { isLoading, invoices, isError, error };
}
