import React, { useState } from "react";
import axios from "axios";
import { Link, useLoaderData, Form } from "react-router-dom";
import AddInvoiceImg from "../assets/icon-plus.svg";
import getInvoices from "../hooks/getInvoices";

function HomePage() {
  const [selectedValue, setSelectedValue] = useState("name");
  const { isLoading, isError, invoices, error } = getInvoices();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>Error detected</h2>;
  }

  // Create our number formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return (
    <div className="main">
      <h1 className="sr-only">Preprince investments business transactions</h1>
      <div className="flex summary">
        <div className="summary-headings">
          <h2 className="summary-title">Invoices</h2>
          <p className="invoice-total-num" aria-live="polite">
            {invoices.length} invoices
          </p>
        </div>
        <div className="flex filter-new">
          <Form className="select-options">
            <label className="filter-label" htmlFor="filter-options">
              Filter
            </label>
            <select
              name="choice"
              id="filter-options"
              value={selectedValue}
              onChange={(evt) => setSelectedValue(evt.target.value)}
            >
              <option value="status"> status</option>
              <option value="pending"> pending </option>
              <option value="draft"> draft</option>
            </select>
          </Form>
          <Form>
            <button className="btn flex btn-new-invoice">
              <span className="container-img">
                <img src={AddInvoiceImg} alt="" />
              </span>
              <span className="flex btn-label">
                New <span className="mobile-hidden">Invoice</span>
              </span>
            </button>
          </Form>
        </div>
      </div>
      <div className="cards">
        {invoices.map(
          (invoice: {
            _id: any;
            status: string;
            total: number;
            paymentDue: string;
            id: React.Key;
            clientName: string;
          }) => {
            return (
              <div key={invoice.id} className="card">
                <p className="invoice-num">{invoice.id}</p>
                <p className="clientname">{invoice.clientName}</p>
                <p className="payment-date">Due {invoice.paymentDue}</p>
                <p className="amount-total">
                  {formatter.format(invoice.total)}
                </p>
                <Link
                  className={`btn-link ${
                    invoice.status === "paid"
                      ? "paid-status"
                      : invoice.status === "draft"
                      ? "draft-status"
                      : "pending-status"
                  } `}
                  to={`/viewInvoice/${invoice._id}`}
                >
                  {invoice.status}
                </Link>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default HomePage;
