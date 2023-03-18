import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

export default function useData() {
  return useQuery("invoices", () => {
    axios.get("http://localhost:4000/api/invoices");
  });
}
