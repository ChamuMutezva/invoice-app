import React, { useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import PreviousPage from "../components/PreviousPage";
import fetchInvoice from "../hooks/fetchInvoice";
import getInvoice from "../hooks/getInvoice";

function EditInvoice() {
  const [terms, setTerms] = useState("thirty");
  let params = useParams();
  const invoice =
    getInvoice(params.id) === undefined
      ? fetchInvoice(params.id)
      : getInvoice(params.id);
  console.log(invoice);
  return (
    <div className="main">
      <PreviousPage title={`Edit the invoice of ${invoice.clientName}`} />
      <Form className="edit-form">
        <h2 className="edit-title">
          Edit
          <span className="invoice-num invoice-num-edit">{invoice.id}</span>
        </h2>

        {/*Sender details */}
        <fieldset className="edit-invoice-details">
          <legend className="edit-field-title">Bill From</legend>
          <div className="street-address">
            <label htmlFor="street">Street address</label>
            <input
              type="text"
              id="street"
              className="street sender-street"
              placeholder="19 street"
            />
          </div>
          <div className="city-address">
            <label htmlFor="street">City</label>
            <input
              type="text"
              id="city"
              className="city sender-street"
              placeholder="Mudzi"
            />
          </div>
          <div className="postal-address">
            <label htmlFor="postal">Postal code</label>
            <input
              type="text"
              id="postal"
              className="postal sender-postal"
              placeholder="6229"
            />
          </div>
          <div className="country-address">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              className="country sender-country"
              placeholder="South Africa"
            />
          </div>
        </fieldset>

        {/* Reciever details */}
        <fieldset className="edit-invoice-details">
          <legend className="edit-field-title">Bill to</legend>
          <div className="street-address">
            <label htmlFor="client-name">Client name</label>
            <input
              type="text"
              id="client-name"
              className="client-name"
              placeholder="Chamu Mutezva"
            />
          </div>

          <div className="street-address">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email-address"
              className="email-address"
              placeholder="ckmutezva@gmail.com"
            />
          </div>

          <div className="street-address">
            <label htmlFor="street">Street address</label>
            <input
              type="text"
              id="street"
              className="street reciever-street"
              placeholder="19 street"
            />
          </div>
          <div className="city-address">
            <label htmlFor="street">City</label>
            <input
              type="text"
              id="city"
              className="city reciver-street"
              placeholder="Besa"
            />
          </div>
          <div className="postal-address">
            <label htmlFor="postal">Postal code</label>
            <input
              type="text"
              id="postal"
              className="postal reciever-postal"
              placeholder="20099"
            />
          </div>
          <div className="country-address">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              className="country reciever-country"
              placeholder="Zimbabwe"
            />
          </div>
        </fieldset>

        {/* invoice details */}
        <fieldset className="edit-invoice-details">
          <div className="invoice-date">
            <label htmlFor="date">Invoice date</label>
            <input type="date" name="invoice-date" id="date" />
          </div>
          <div className="payment-terms">
            <label htmlFor="terms">Payment terms</label>
            <select
              name="choice"
              className="terms-options"
              id="terms-options"
              value={terms}
              onChange={(evt) => setTerms(evt.target.value)}
            >
              <option value="one">Net 1 Day</option>
              <option value="seven">Net 7 days</option>
              <option value="fourteen">Net 14 Days</option>
              <option value="thirty">Net 30 Days</option>
            </select>
          </div>
          <div className="project">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="project-name"
              className="project-name"
              placeholder="Name of project"
            />
          </div>
        </fieldset>
      </Form>
    </div>
  );
}

export default EditInvoice;
