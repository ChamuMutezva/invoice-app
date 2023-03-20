import { useParams, useNavigate } from "react-router-dom";
import getInvoices from "../hooks/getInvoices";
import getInvoice from "../hooks/getInvoice";
import BackImg from "../assets/icon-arrow-left.svg";

export async function loader() {
  const invoices = getInvoices();
  return { invoices };
}

function ViewInvoice() {
  let params = useParams();
  const navigate = useNavigate();

  const invoice = getInvoice(params.id);
  console.log(params.id);

  if (invoice === undefined) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="main" aria-live="polite">
      <button onClick={() => navigate(-1)}>
        <img src={BackImg} alt="" />
        Go back
      </button>

      <div className="status">
        <span className="status-label">Status </span>
        <span className="status-type">{invoice.status}</span>
      </div>

      <div className="invoice-details">
        <div className="intro">
          <p className="invoice-num">
            <span className="sr-only">Invoice number</span> #{invoice.id}
          </p>
          <p className="invoice-descr">
            <span className="sr-only">item</span>
            {invoice.description}
          </p>
        </div>
        <div className="address-sender">
          <p className="street">{invoice.senderAddress.street}</p>
          <p className="city">{invoice.senderAddress.city}</p>
          <p className="postCode">{invoice.senderAddress.postCode}</p>
          <p className="country">{invoice.senderAddress.country}</p>
        </div>
        <div className="invoice-dates">
          <div className="dated">
            <p className="invoice-dated-label">Invoice date</p>
            <p className="invoice-date">{invoice.createdAt}</p>
          </div>
          <div className="due-date">
            <p className="due-date-label">Payment due</p>
            <p className="due-date">{invoice.paymentDue}</p>
          </div>
        </div>
        <div className="bill-to">
          <h3>Bill to</h3>
          <p>{invoice.clientName}</p>
          <div className="address-reciever">
            <p className="street">{invoice.clientAddress.street}</p>
            <p className="city">{invoice.clientAddress.city}</p>
            <p className="postCode">{invoice.clientAddress.postCode}</p>
            <p className="country">{invoice.clientAddress.country}</p>
          </div>
        </div>
        <div className="email-address">
          <h3 className="email-title">Sent to</h3>
          <p>{invoice.clientEmail}</p>
        </div>
        <div className="items">
          {invoice.items.map(
            (item: {
              name: string;
              quantity: number;
              price: number;
              total: number;
            }) => (
              <div key={item.name}>
                <p>{item.name}</p>
                <p>{item.quantity}</p>
                <p>{item.price}</p>
                <p>{item.total}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewInvoice;
