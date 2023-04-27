import getInvoices from "./useGetInvoices";

export default function getInvoice(id: any) {
  const { invoices } = getInvoices();
  return invoices?.find((invoice: { _id: any }) => invoice._id === id);
}
