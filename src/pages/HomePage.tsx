import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { useQuery } from "react-query";
// import { useLoaderData } from "react-router-dom";
import AddInvoiceImg from "../assets/icon-plus.svg";
import getData from "../hooks/getData";

export async function loader() {
  const { invoices } =  getData()
  return invoices
}

function HomePage() {
  const [selectedValue, setSelectedValue] = useState("name");
  /*  const { isLoading, data, isError, error } = useQuery("invoices", () => {
    return axios.get("http://localhost:4000/api/invoices");
  });
*/
  const { isLoading, invoices, isError, error } = getData();

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
          <button className="btn btn-new-invoice">
            <span className="container-img">
              <img src={AddInvoiceImg} alt="" />
            </span>
            New Invoice
          </button>
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
