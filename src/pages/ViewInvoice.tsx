import { useParams, Link } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import format from "date-fns/format";
import { currencyFormatter } from "../hooks/useFormatter";
import PreviousPage from "../components/PreviousPage";
import { reducer } from "../hooks/useReducer";
import { updateInvoice } from "../hooks/useUpdateInvoice";
import { useDeleteInvoice } from "../hooks/useDeleteInvoice";
import { useGetSingleInvoice } from "../hooks/useFetchInvoice";
import DeleteInvoiceDialog from "../components/DeleteInvoiceDialog";

function ViewInvoice() {
  const queryClient = useQueryClient();
  let params = useParams();
  const [deletionError, setDeletionError] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const { mutate, isLoading: isDeleting } = useDeleteInvoice(setDeletionError);
  const { data } = useGetSingleInvoice(params.id);

  const onDelete = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  const confirmDelete = () => {
    mutate(data._id);
    setShowDialog(false);
  };

  const getStatus = (status: string) => {
    if (status === "paid") {
      return "paid-status";
    } else if (status === "draft") {
      return "draft-status";
    } else {
      return "pending-status";
    }
  };

  const updateInvoiceMutation = useMutation(updateInvoice, {
    onSuccess: () => {
      queryClient.invalidateQueries("invoices");
    },
  });

  if (data === undefined) {
    return (
      <div className="flex loading">
        <h2 className="pre-loading">Loading...</h2>
      </div>
    );
  }

  if (deletionError) {
    return <h2>Error encountered, invoice cannot be deleted</h2>;
  }

  const totalArray = data.items.map((item: { total: any }) => item.total);
  const grandTotal = totalArray.length > 0 ? totalArray.reduce(reducer) : 0;

  
  function handleClick() {
    console.log(data.status);
    if (data.status !== "paid") {
      updateInvoiceMutation.mutate({
        ...data,
        status: "paid",
      });
    }
  }

  return (
    <main className="main" aria-live="polite">
      <PreviousPage title={`Complete invoice details of ${data.clientName}`} />

      <div className="main-container">
        <nav className="flex nav-view">
          <div className="flex status-container">
            <p className="status-label">Status </p>
            <p className={`flex status ${getStatus(data.status)} `}>
              <span
                aria-hidden={true}
                className={`status-span ${data.status}-span`}
              ></span>
              {data.status}
            </p>
          </div>
          <div className="mobile-hidden nav-view-btns ">
            <Link className="btn btn-edit" to={`/editInvoice/${data._id}`}>
              Edit
            </Link>
            <button className="btn btn-delete-view" onClick={onDelete}>
              Delete
            </button>
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
                <span className="invoice-num">{data.id}</span>
              </p>
              <p className="invoice-descr">
                <span className="sr-only">item</span>
                {data.description}
              </p>
            </div>

            {/* sender details */}
            <div className="address-sender">
              <p className="address-sender-details">
                <span className="street">{data.senderAddress.street}</span>
                <span className="city">{data.senderAddress.city}</span>
                <span className="postCode">{data.senderAddress.postCode}</span>
                <span className="country">{data.senderAddress.country}</span>
              </p>
            </div>

            {/* Dates */}
            <div className="invoice-dates">
              <div className="dated">
                <h3 className="invoice-date-title">Invoice date</h3>
                <p className="invoice-date">
                  {format(new Date(data.createdAt), "dd MMM yyyy")}
                </p>
              </div>
              <div className="due-date">
                <h3 className="invoice-date-title">Payment due</h3>
                <p className="payment-date-view">
                  {format(new Date(data.paymentDue), "dd MMM yyyy")}
                </p>
              </div>
            </div>

            {/* Reciever */}
            <div className="bill-to">
              <h3 className="bill-to-title">Bill to</h3>
              <p className="billed-name">{data.clientName}</p>
              <div className="address-reciever">
                <p className="address-reciever-details">
                  <span className="street">{data.clientAddress.street}</span>
                  <span className="city">{data.clientAddress.city}</span>
                  <span className="postCode">
                    {data.clientAddress.postCode}
                  </span>
                  <span className="country">{data.clientAddress.country}</span>
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="email-address">
              <h3 className="email-title">Sent to</h3>
              <p className="email-to">{data.clientEmail}</p>
            </div>
          </section>

          <section className="item-summary">
            <div className="items">
              {data.items.map(
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
                          x {currencyFormatter.format(item.price)}{" "}
                        </span>
                      </p>
                    </div>
                    <div className="mobile-hidden item-price">
                      <h3 className="price-heading">Price</h3>
                      <p className="unit-price">
                        {currencyFormatter.format(item.price)}
                      </p>
                    </div>
                    <div className="total">
                      <h3 className="mobile-hidden total-heading">Total</h3>
                      <p className="gross-total">
                        {currencyFormatter.format(item.total)}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </section>
          <div className="grand-total-container">
            <h3 className="grand-total-title">Grand Total</h3>
            <p className="grand-total">{currencyFormatter.format(grandTotal)}</p>
          </div>
        </section>
      </div>
      <DeleteInvoiceDialog
        showDialog={showDialog}
        closeDialog={closeDialog}
        invoiceID={data.id}
        confirmDelete={confirmDelete}
      />
      <footer className="footer-view tablet-hidden">
        <div className="nav-view-btns ">
          <Link className="btn-edit" to={`/editInvoice/${data._id}`}>
            Edit
          </Link>
          <button className="btn-delete-view" onClick={onDelete}>
            Delete
          </button>
          <button className="btn-mark" onClick={handleClick}>
            Mark as paid
          </button>
        </div>
      </footer>
    </main>
  );
}

export default ViewInvoice;
