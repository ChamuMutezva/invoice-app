import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

function HomePage() {
  const [selectedValue, setSelectedValue] = useState("name");
  const { isLoading, data, isError, error } = useQuery("invoices", () => {
    return axios.get("http://localhost:4000/api/invoices");
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>Error detected</h2>;
  }
  return (
    <div>
      <h1 className="sr-only">Preprince investments business transactions</h1>
      <div className="summary">
        <div className="summary-headings">
          <h2 className="summary-title">Invoices</h2>
          <p aria-live="polite">{data?.data.length} invoices</p>
        </div>
        <div className="filter-new">
          <label htmlFor="filter-options">Filter by</label>
          <select
            name="choice"
            id="filter-options"
            value={selectedValue}
            onChange={(evt) => setSelectedValue(evt.target.value)}
          >
            <option value="status"> status</option>
            <option value="name"> name </option>
            <option value="date"> date</option>
          </select>
        </div>
      </div>
      {data?.data.map(
        (invoice: {
          status: string;
          total: number;
          paymentDue: string;
          id: React.Key;
          clientName: string;
        }) => {
          return (
            <Link to={"/viewInvoice"} key={invoice.id} className="card">
              <p>{invoice.id}</p>
              <p>{invoice.clientName}</p>
              <p>{invoice.paymentDue}</p>
              <p>R: {invoice.total}</p>
              <p>{invoice.status}</p>
            </Link>
          );
        }
      )}
    </div>
  );
}

export default HomePage;
