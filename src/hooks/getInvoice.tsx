import axios from "axios";
import { useQuery } from "react-query";
import getInvoices from "./getInvoices";

export default function getInvoice(id: any) {
  const { invoices } = getInvoices();
  /* if (invoices == "undefined") {
    return useQuery("invoice", () => {
      axios.get(`http://localhost:4000/api/invoices/${id}`);
    });
  } else { */
  return invoices?.find((invoice: { _id: any }) => invoice._id === id);
  /* } */
}
