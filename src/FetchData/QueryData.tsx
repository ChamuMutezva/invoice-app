import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

function QueryData() {
  const { isLoading, data } = useQuery("invoices", () => {
    return axios.get("http://localhost:4000/api/invoices");
  });
  if (isLoading) {
    <h2>Loading...</h2>;
  }
  return <div>
    <h2>List of data</h2>
    {
        data?.data.map((invoice: { id: React.Key; clientName: string  }) => {
            return <div key={invoice.id}>
                <h3>{invoice.clientName}</h3>
            </div>
        })
    }

  </div>;
}

export default QueryData;
