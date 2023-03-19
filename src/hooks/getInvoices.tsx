import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

export default function getInvoices() {
   const  { isLoading, data, isError, error } = useQuery("invoices", () => {
    return axios.get("http://localhost:4000/api/invoices");
  });
  const invoices =  data?.data
  return  {isLoading, invoices, isError, error}
};


