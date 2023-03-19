import React, { useState } from "react";
import axios from "axios";
import { Link, useLoaderData, Form } from "react-router-dom";
import AddInvoiceImg from "../assets/icon-plus.svg";
import getInvoices from "../hooks/getInvoices";

function HomePage() {
  const [selectedValue, setSelectedValue] = useState("name");
  /*  const { isLoading, data, isError, error } = useQuery("invoices", () => {
    return axios.get("http://localhost:4000/api/invoices");
  });
*/

  const { isLoading, isError, invoices, error } = getInvoices();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>Error detected</h2>;
  }
  return (
    <div className="main">
      <h1 className="sr-only">Preprince investments business transactions</h1>
      <div className="flex summary">
        <div className="summary-headings">
          <h2 className="summary-title">Invoices</h2>
          <p aria-live="polite">{invoices.length} invoices</p>
        </div>
        <div className="flex filter-new">
          <div className="select-options">
            <label htmlFor="filter-options">Filter by</label>
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
          </div>
          <Form>
            <button className="btn btn-new-invoice">
              <span className="container-img">
                <img src={AddInvoiceImg} alt="" />
              </span>
              New Invoice
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
                <p>{invoice.id}</p>
                <p>{invoice.clientName}</p>
                <p>{invoice.paymentDue}</p>
                <p>R: {invoice.total}</p>
                <Link className="btn-link" to={`/viewInvoice/${invoice._id}`}>
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
