import { useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import PreviousPage from "../components/PreviousPage";
import fetchInvoice from "../hooks/fetchInvoice";
import getInvoice from "../hooks/getInvoice";
import DeleteBtn from "../assets/icon-delete.svg";
import Inputs from "../components/Inputs";

function EditInvoice() {
  const [terms, setTerms] = useState("thirty");
  let params = useParams();

  // Create our number formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const invoice =
    getInvoice(params.id) === undefined
      ? fetchInvoice(params.id)
      : getInvoice(params.id);
 // console.log(invoice);

  const initialState = {
   // id: invoice.id,
    createdAt: invoice.createdAt,
    paymentDue: invoice.paymentDue,
    description: invoice.description,
    paymentTerms: invoice.paymentTerms,
    clientEmail: invoice.clientEmail,
    clientName: invoice.clientName,
    status: invoice.status,
    senderAddress: {
      street: invoice.senderAddress.street,
      city: invoice.senderAddress.city,
      postCode: invoice.senderAddress.postCode,
      country: invoice.senderAddress.country,
    },
    clientAddress: {
      street: invoice.clientAddress.street,
      city: invoice.clientAddress.city,
      postCode: invoice.clientAddress.postCode,
      country: invoice.clientAddress.country,
    },
    items: invoice.items,
  };
  console.log(initialState);

  const [formData, setFormData] = useState(initialState)

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
          <Inputs
            divClass="street-line"
            htmlFor="street"
            text="Street address"
            type="text"
            id="street"
            inputClass="street"
            placeholder="19 street"
          />
          <Inputs
            divClass="city-line"
            htmlFor="city"
            text="City"
            type="text"
            id="city"
            inputClass="city"
            placeholder="Mudzi"
          />
          <Inputs
            divClass="postal-line"
            htmlFor="postal"
            text="Postal Code"
            type="text"
            id="postal"
            inputClass="postal"
            placeholder="6009"
          />
          <Inputs
            divClass="country-line"
            htmlFor="country"
            text="Country"
            type="text"
            id="country"
            inputClass="country"
            placeholder="South Africa"
          />
        </fieldset>

        {/* Reciever details */}
        <fieldset className="edit-invoice-details">
          <legend className="edit-field-title">Bill to</legend>
          <Inputs
            divClass="client-line"
            htmlFor="client-name"
            text="Client name"
            type="text"
            id="client-name"
            inputClass="client-name"
            placeholder="Chamu Mutezva"
          />

          <Inputs
            divClass="email-line"
            htmlFor="email"
            text="Email address"
            type="email"
            id="email-address"
            inputClass="email-address"
            placeholder="ckmutezva@gmail.com"
          />

          <Inputs
            divClass="street-line"
            htmlFor="street"
            text="Street address"
            type="text"
            id="street"
            inputClass="street"
            placeholder="19 Receiver street"
          />

          <Inputs
            divClass="city-line"
            htmlFor="city"
            text="City"
            type="text"
            id="city"
            inputClass="city"
            placeholder="Besa"
          />

          <Inputs
            divClass="postal-line"
            htmlFor="postal"
            text="Postal Code"
            type="text"
            id="postal"
            inputClass="postal"
            placeholder="6900"
          />
          <Inputs
            divClass="country-line"
            htmlFor="country"
            text="Country"
            type="text"
            id="country"
            inputClass="country"
            placeholder="Zimbabwe"
          />
        </fieldset>

        {/* invoice details */}
        <fieldset className="edit-invoice-details">
          <Inputs
            divClass="invoice-date"
            htmlFor="date"
            text="Invoice date"
            type="date"
            id="date"
            inputClass="date-signed"
            placeholder=""
          />

          <div className="payment-terms">
            <label className="label" htmlFor="terms">
              Payment terms
            </label>
            <select
              name="choice"
              className="input terms-options"
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

          <Inputs
            divClass="project"
            htmlFor="country"
            text="Country"
            type="text"
            id="country"
            inputClass="country-name"
            placeholder="Zimbabwe"
          />
        </fieldset>

        <fieldset className="edit-invoice-details">
          <legend className="edit-field-title">Item list</legend>
          {invoice.items.map(
            (item: {
              name: string;
              quantity: number;
              price: number;
              total: number;
            }) => (
              <div className="item-line" key={item.name}>
                <Inputs
                  divClass="project-line"
                  htmlFor="project-name"
                  text="Project name"
                  type="text"
                  id="project-name"
                  inputClass="project-name"
                  placeholder="Project name"
                />

                <div className="costing-line">
                  <Inputs
                    divClass="qty-line"
                    htmlFor="qty"
                    text="Qty"
                    type="number"
                    id="qty"
                    inputClass="quantity"
                    placeholder="1"
                  />

                  <Inputs
                    divClass="price-line"
                    htmlFor="price"
                    text="Price"
                    type="number"
                    id="price"
                    inputClass="price"
                    placeholder="200.00"
                  />

                  <p className="total-line">
                    <span className="label">Total</span>
                    <span className="label">200.00</span>
                  </p>
                  <div className="container-delete">
                    <button className="delete" aria-label="delete product">
                      <img src={DeleteBtn} alt="" aria-hidden={true} />
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </fieldset>
      </Form>
    </div>
  );
}

export default EditInvoice;
