import React, { useState } from "react";
import { Link, useLoaderData, Form } from "react-router-dom";
import format from "date-fns/format";
import AddInvoiceImg from "../assets/icon-plus.svg";
import EmptyInvoiceImg from "../assets/illustration-empty.svg";
import getInvoices from "../hooks/useGetInvoices";

function HomePage() {
  const [selectedValue, setSelectedValue] = useState("all");
  let { isLoading, isError, invoices, isSuccess } = getInvoices(selectedValue);

  console.log(invoices);
  
  if (isLoading) {
    return (
      <div className="flex loading">
        <h2 className="pre-loading">Loading...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex loading">
        <h2 className="pre-loading">Error: </h2>
      </div>
    );
  }

  const noInvoices = () => {
    return (
      <div className="no-cards">
        <div className="container-img">
          <img src={EmptyInvoiceImg} alt="" />
        </div>
        <h2>There is nothing here</h2>
        <p>Create an invoice by clicking the New button and get started</p>
      </div>
    );
  };

  // Create our number formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    // These options are needed to round to whole numbers if that's what you want.
    // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  // the onchange triggers the backend to apply filters through the dependency used in
  // the queryKey of the useGetInvoices hook. High five to React Query
  const onChange = (evt: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedValue(evt.target.value);
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

  const setMessageLength = (length: number) => {
    if (length === 0) {
      return "No invoices";
    } else if (length === 1) {
      return `${length} invoice`;
    } else {
      return `${length} invoices`;
    }
  };

  return (
    <div className="main">
      <h1 className="sr-only">Preprince investments business transactions</h1>

      <div className="invoices-list">
        <div className="flex summary">
          <div className="summary-headings">
            <h2 className="summary-title">Invoices</h2>
            <p className="invoice-total-num" aria-live="polite">
              {setMessageLength(invoices.length)}
            </p>
          </div>

          <div className="flex filter-new">
            <Form className="select-options">
              <label className="filter-label" htmlFor="filter-options">
                Filter
              </label>
              <select
                name="choice"
                className="filter"
                id="filter-options"
                value={selectedValue}
                onChange={(evt) => onChange(evt)}
              >
                <option value="all">All</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="draft">Draft</option>
              </select>
            </Form>

            <div>
              <Link to={`/newInvoice`} className="btn flex btn-new-invoice">
                <span className="container-img">
                  <img src={AddInvoiceImg} alt="" />
                </span>
                <span className="flex btn-label">
                  New <span className="mobile-hidden">Invoice</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
        {/* main section */}
        {invoices.length === 0 ? (
          noInvoices()
        ) : (
          <div className="cards">
            {invoices.map(
              (invoice: {
                _id: any;
                status: string;
                total: number;
                paymentDue: Date;
                id: React.Key;
                clientName: string;
              }) => {
                return (
                  <div key={invoice.id} className="card">
                    <p className="invoice-num">
                      <span className="sr-only">invoice number</span>
                      {invoice.id}
                    </p>

                    <Link
                      className={`client-name btn btn-link`}
                      to={`/viewInvoice/${invoice._id}`}
                    >
                      <span className="sr-only">Invoice for</span>{" "}
                      {invoice.clientName}
                    </Link>

                    <p className="payment-date">
                      Due <span className="sr-only">date</span>{" "}
                      {format(new Date(invoice.paymentDue), "yyyy/MM/dd")}
                    </p>

                    <p className="amount-total">
                      <span className="sr-only">total amount to be paid</span>
                      {formatter.format(invoice.total)}
                    </p>

                    <p
                      className={`flex status ${getStatus(invoice.status)}
                         `}
                    >
                      <span
                        aria-hidden={true}
                        className={`status-span ${invoice.status}-span`}
                      ></span>
                      <span className="sr-only">invoice status</span>
                      {invoice.status}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
