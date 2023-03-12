import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

function HomePage() {
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
          <h2>Invoices</h2>
          <p>{data?.data.length} invoices</p>
        </div>
        <div className="filter-edit"></div>
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
            <div key={invoice.id} className="card">
              <p>{invoice.id}</p>
              <p>{invoice.clientName}</p>
              <p>{invoice.paymentDue}</p>
              <p>R: {invoice.total}</p>
              <p>{invoice.status}</p>
            </div>
          );
        }
      )}
    </div>
  );
}

export default HomePage;
