import axios from "axios";
import { useQuery } from "react-query";
import getInvoices from "./getInvoices";

export default function getInvoice(id: any) {
  const { invoices } = getInvoices();
  return invoices?.find((invoice: { _id: any }) => invoice._id === id);
}
