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
      <h1 className="sr-only">
        Complete invoice details of {invoice.clientName}
      </h1>
      <header>
        <button className="btn flex btn-return" onClick={() => navigate(-1)}>
          <img src={BackImg} alt="" aria-hidden={true} />
          Go back
        </button>
      </header>

      <main>
        <section className="flex status">
          <h2 className="sr-only">Invoice status</h2>
          <span className="status-label">Status </span>
          <span className="status-type">{invoice.status}</span>
        </section>

        <section className="invoice-details">
          <h2 className="sr-only">Invoice client details</h2>

          {/* Invoice intro */}
          <div className="intro">
            <p className="invoice-num">
              <span className="sr-only">Invoice number</span> #{invoice.id}
            </p>
            <p className="invoice-descr">
              <span className="sr-only">item</span>
              {invoice.description}
            </p>
          </div>

          {/* sender details */}
          <div className="address-sender">
            <p className="address-sender-details">
              <span className="street">{invoice.senderAddress.street}</span>
              <span className="city">{invoice.senderAddress.city}</span>
              <span className="postCode">{invoice.senderAddress.postCode}</span>
              <span className="country">{invoice.senderAddress.country}</span>
            </p>
          </div>

          {/* Dates */}
          <div className="invoice-dates">
            <div className="dated">
              <h3 className="invoice-date-title">Invoice date</h3>
              <p className="invoice-date">{invoice.createdAt}</p>
            </div>
            <div className="due-date">
              <h3 className="invoice-date-title">Payment due</h3>
              <p className="due-date">{invoice.paymentDue}</p>
            </div>
          </div>

          {/* Reciever */}
          <div className="bill-to">
            <h3 className="bill-to-title">Bill to</h3>
            <p className="billed-name">{invoice.clientName}</p>
            <div className="address-reciever">
              <p className="address-reciever-details">
                <span className="street">{invoice.clientAddress.street}</span>
                <span className="city">{invoice.clientAddress.city}</span>
                <span className="postCode">
                  {invoice.clientAddress.postCode}
                </span>
                <span className="country">{invoice.clientAddress.country}</span>
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="email-address">
            <h3 className="email-title">Sent to</h3>
            <p>{invoice.clientEmail}</p>
          </div>
        </section>

        <section className="item-summary">
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
        </section>
      </main>
    </div>
  );
}

export default ViewInvoice;
