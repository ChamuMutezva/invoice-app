import { useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import PreviousPage from "../components/PreviousPage";
import fetchInvoice from "../hooks/fetchInvoice";
import getInvoice from "../hooks/getInvoice";
import DeleteBtn from "../assets/icon-delete.svg";
import Inputs from "../components/Inputs";
import { format } from "path";

function EditInvoice() {
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

  const initialState = {
    // id: invoice.id,
    createdAt: invoice.createdAt,
    paymentDue: invoice.paymentDue,
    description: invoice.description,
    paymentTerms: invoice.paymentTerms,
    clientEmail: invoice.clientEmail,
    clientName: invoice.clientName,
    status: invoice.status,
    total: invoice.total,
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

  const [formData, setFormData] = useState(initialState);

  const onChange = (evt: { target: { name: any; value: any } }) => {
    const { name, value } = evt.target;
    console.log(evt.target);
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData);

  const {
    clientName,
    clientEmail,
    paymentDue,
    paymentTerms,
    senderAddress: { street },
  } = formData;
  console.log(street);
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
            name="street-address"
            inputClass="street"
            placeholder="19 street"
            value={street}
            onChange={onChange}
          />

          <Inputs
            divClass="city-line"
            htmlFor="city"
            text="City"
            type="text"
            id="city"
            name="city"
            inputClass="city"
            placeholder="Mudzi"
            value={invoice.senderAddress.city}
            onChange={onChange}
          />
          <Inputs
            divClass="postal-line"
            htmlFor="postal"
            text="Postal Code"
            type="text"
            id="postal"
            name="postal"
            inputClass="postal"
            placeholder="6009"
            value={invoice.senderAddress.postCode}
            onChange={onChange}
          />
          <Inputs
            divClass="country-line"
            htmlFor="country"
            text="Country"
            type="text"
            id="country"
            name="country"
            inputClass="country"
            placeholder="South Africa"
            value={invoice.senderAddress.country}
            onChange={onChange}
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
            name="clientName"
            inputClass="client-name"
            placeholder="Chamu Mutezva"
            value={clientName}
            onChange={onChange}
          />

          <Inputs
            divClass="email-line"
            htmlFor="email"
            text="Email address"
            type="email"
            id="email-address"
            name="clientEmail"
            inputClass="email-address"
            placeholder="ckmutezva@gmail.com"
            value={clientEmail}
            onChange={onChange}
          />

          <Inputs
            divClass="street-line"
            htmlFor="street"
            text="Street address"
            type="text"
            id="street"
            name="street"
            inputClass="street"
            placeholder="19 Receiver street"
            value={invoice.clientAddress.street}
            onChange={onChange}
          />

          <Inputs
            divClass="city-line"
            htmlFor="city"
            text="City"
            type="text"
            id="city"
            name="city"
            inputClass="city"
            placeholder="Besa"
            value={invoice.clientAddress.city}
            onChange={onChange}
          />

          <Inputs
            divClass="postal-line"
            htmlFor="postal"
            text="Postal Code"
            type="text"
            id="postal"
            name="postal"
            inputClass="postal"
            placeholder="6900"
            value={invoice.clientAddress.postCode}
            onChange={onChange}
          />
          <Inputs
            divClass="country-line"
            htmlFor="country"
            text="Country"
            type="text"
            id="country"
            name="country"
            inputClass="country"
            placeholder="Zimbabwe"
            value={invoice.clientAddress.country}
            onChange={onChange}
          />
        </fieldset>
        invoice details
        <fieldset className="edit-invoice-details">
          <Inputs
            divClass="invoice-date"
            htmlFor="date"
            text="Invoice date"
            type="date"
            id="date"
            name="paymentDue"
            inputClass="date-signed"
            placeholder=""
            value={paymentDue}
            onChange={onChange}
          />

          <div className="payment-terms">
            <label className="label" htmlFor="terms">
              Payment terms
            </label>
            <select
              name="paymentTerms"
              className="input terms-options"
              id="terms"
              value={paymentTerms}
              onChange={onChange}
            >
              <option value={1}>Net 1 Day</option>
              <option value={6}>Net 6 days</option>
              <option value={7}>Net 7 days</option>
              <option value={14}>Net 14 Days</option>
              <option value={30}>Net 30 Days</option>
            </select>
          </div>
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
                  name="project-name"
                  inputClass="project-name"
                  placeholder="Project name"
                  value={item.name}
                  onChange={onChange}
                />

                <div className="costing-line">
                  <Inputs
                    divClass="qty-line"
                    htmlFor="qty"
                    text="Qty"
                    type="number"
                    id="qty"
                    name="qty"
                    inputClass="quantity"
                    placeholder="1"
                    value={Number(item.quantity)}
                    onChange={onChange}
                  />

                  <Inputs
                    divClass="price-line"
                    htmlFor="price"
                    text="Price"
                    type="number"
                    id="price"
                    name="price"
                    inputClass="price"
                    placeholder="200.00"
                    value={item.price}
                    onChange={onChange}
                  />

                  <p className="total-line">
                    <span className="label">Total</span>
                    <span className="label">{invoice.total}</span>
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

/*
 const initialState = {
    // id: invoice.id,
    createdAt: invoice.createdAt,
    paymentDue: invoice.paymentDue,
    description: invoice.description,
    paymentTerms: invoice.paymentTerms,
    clientEmail: invoice.clientEmail,
    clientName: invoice.clientName,
    status: invoice.status,
    total: invoice.total,
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
  console.log(initialState); */
