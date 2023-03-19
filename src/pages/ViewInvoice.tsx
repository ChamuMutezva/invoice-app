import { useParams } from "react-router-dom";
import getInvoices from "../hooks/getInvoices";
import getInvoice from "../hooks/getInvoice";

export async function loader() {
  const invoices = getInvoices();
  return { invoices };
}

function ViewInvoice() {
  let params = useParams();

  const invoice = getInvoice(params.id);
  console.log(params.id);
  return (
    <div className="main">
      <h1>ViewInvoice</h1>
      <h2>{invoice.clientName}</h2>
    </div>
  );
}

export default ViewInvoice;
