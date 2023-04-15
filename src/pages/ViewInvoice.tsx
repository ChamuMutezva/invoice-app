import { useParams, Link } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import format from "date-fns/format";
import getInvoice from "../hooks/getInvoice";
import PreviousPage from "../components/PreviousPage";
import { reducer } from "../hooks/reducer";
import { updateInvoice } from "../hooks/updateInvoice";

function ViewInvoice() {
  const queryClient = useQueryClient();
  let params = useParams();

  const invoice = getInvoice(params.id);

  if (invoice === undefined) {
    return <h2>Loading...</h2>;
  }

  const totalArray = invoice.items.map((item: { total: any }) => item.total);
  const grandTotal = totalArray.length > 0 ? totalArray.reduce(reducer) : 0;

  // Create our number formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const updateInvoiceMutation = useMutation(updateInvoice, {
    onSuccess: () => {
      queryClient.invalidateQueries("invoices");
    },
  });

  function handleClick() {
    console.log(invoice.status);
    if (invoice.status !== "paid") {
      updateInvoiceMutation.mutate({
        ...invoice,
        status: "paid",
      });
    }
  }

  return (
    <div className="main" aria-live="polite">
      <PreviousPage
        title={`Complete invoice details of ${invoice.clientName}`}
      />

      <main>
        <nav className="flex nav-view">
          <div className="flex status-container">
            <p className="status-label">Status </p>
            <p
              className={`flex status ${
                invoice.status === "paid"
                  ? "paid-status"
                  : invoice.status === "draft"
                  ? "draft-status"
                  : "pending-status"
              } `}
            >
              <span
                aria-hidden={true}
                className={`status-span ${invoice.status}-span`}
              ></span>
              {invoice.status}
            </p>
          </div>
          <div className="mobile-hidden nav-view-btns ">
            <Link className="btn btn-edit" to={`/editInvoice/${invoice._id}`}>
              Edit
            </Link>
            <Link className="btn btn-delete-view" to={`/deleteInvoice/:id`}>
              Delete
            </Link>
            <button className="btn btn-mark" onClick={handleClick}>
              Mark as paid
            </button>
          </div>
        </nav>
        <section className="container container-invoice">
          <section className="invoice-details">
            <h2 className="sr-only">Invoice client details</h2>

            {/* Invoice intro */}
            <div className="intro">
              <p className="invoice-num">
                <span className="sr-only">Invoice number</span>{" "}
                <span className="invoice-num">{invoice.id}</span>
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
                <span className="postCode">
                  {invoice.senderAddress.postCode}
                </span>
                <span className="country">{invoice.senderAddress.country}</span>
              </p>
            </div>

            {/* Dates */}
            <div className="invoice-dates">
              <div className="dated">
                <h3 className="invoice-date-title">Invoice date</h3>
                <p className="invoice-date">
                  {format(new Date(invoice.createdAt), "dd MMM yyyy")}
                </p>
              </div>
              <div className="due-date">
                <h3 className="invoice-date-title">Payment due</h3>
                <p className="payment-date-view">{invoice.paymentDue}</p>
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
                  <span className="country">
                    {invoice.clientAddress.country}
                  </span>
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="email-address">
              <h3 className="email-title">Sent to</h3>
              <p className="email-to">{invoice.clientEmail}</p>
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
                  <div className="item-details" key={item.name}>
                    <div className="item-name">
                      <h3 className="mobile-hidden item-title">Item name</h3>
                      <p className="item-descr">{item.name}</p>
                    </div>
                    <div className="item-qty">
                      <h3 className="mobile-hidden quantity-title">Qty.</h3>
                      <p className="item-sold">
                        {item.quantity}{" "}
                        <span className="tablet-hidden">
                          x {formatter.format(item.price)}{" "}
                        </span>
                      </p>
                    </div>
                    <div className="mobile-hidden item-price">
                      <h3 className="price-heading">Price</h3>
                      <p className="unit-price">
                        {formatter.format(item.price)}
                      </p>
                    </div>
                    <div className="total">
                      <h3 className="mobile-hidden total-heading">Total</h3>
                      <p className="gross-total">
                        {formatter.format(item.total)}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </section>
          <div className="grand-total-container">
            <h3 className="grand-total-title">Grand Total</h3>
            <p className="grand-total">{formatter.format(grandTotal)}</p>
          </div>
        </section>
      </main>
      <footer className="footer-view tablet-hidden">
        <div className="nav-view-btns ">
          <Link className="btn-edit" to={`/editInvoice/${invoice._id}`}>
            Edit
          </Link>
          <Link className="btn-delete-view" to={`/deleteInvoice/:id`}>
            Delete
          </Link>
          <button className="btn-mark">Mark as paid</button>
        </div>
      </footer>
    </div>
  );
}

export default ViewInvoice;
