import { useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import PreviousPage from "../components/PreviousPage";
import fetchInvoice from "../hooks/fetchInvoice";
import getInvoice from "../hooks/getInvoice";
import DeleteBtn from "../assets/icon-delete.svg";

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
          <div className="address-line street-address">
            <label className="label" htmlFor="street">
              Street address
            </label>
            <input
              type="text"
              id="street"
              className="input street"
              placeholder="19 street"
            />
          </div>

          <div className="address-line city-line">
            <label className="label" htmlFor="street">
              City
            </label>
            <input
              type="text"
              id="city"
              className="input city"
              placeholder="Mudzi"
            />
          </div>
          <div className="address-line postal-line">
            <label className="label" htmlFor="postal">
              Postal code
            </label>
            <input
              type="text"
              id="postal"
              className="input postal"
              placeholder="6229"
            />
          </div>

          <div className="address-line country-line">
            <label className="label" htmlFor="country">
              Country
            </label>
            <input
              type="text"
              id="country"
              className="input country"
              placeholder="South Africa"
            />
          </div>
        </fieldset>

        {/* Reciever details */}
        <fieldset className="edit-invoice-details">
          <legend className="edit-field-title">Bill to</legend>
          <div className="address-line client-line">
            <label className="label" htmlFor="client-name">
              Client name
            </label>
            <input
              type="text"
              id="client-name"
              className="input client-name"
              placeholder="Chamu Mutezva"
            />
          </div>

          <div className="address-line email-line">
            <label className="label" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              id="email-address"
              className="input email-address"
              placeholder="ckmutezva@gmail.com"
            />
          </div>

          <div className="address-line street-line">
            <label className="label" htmlFor="street">
              Street address
            </label>
            <input
              type="text"
              id="street"
              className="input street"
              placeholder="19 street"
            />
          </div>

          <div className="address-line city-line">
            <label className="label" htmlFor="street">
              City
            </label>
            <input
              type="text"
              id="city"
              className="input city"
              placeholder="Besa"
            />
          </div>
          <div className="address-line postal-line">
            <label className="label" htmlFor="postal">
              Postal code
            </label>
            <input
              type="text"
              id="postal"
              className="input postal"
              placeholder="20099"
            />
          </div>

          <div className="address-line country-line">
            <label className="label" htmlFor="country">
              Country
            </label>
            <input
              type="text"
              id="country"
              className="input country"
              placeholder="Zimbabwe"
            />
          </div>
        </fieldset>

        {/* invoice details */}
        <fieldset className="edit-invoice-details">
          <div className="invoice-date">
            <label className="label" htmlFor="date">
              Invoice date
            </label>
            <input
              type="date"
              className="input"
              name="invoice-date"
              id="date"
            />
          </div>
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
          <div className="project">
            <label className="label" htmlFor="country">
              Country
            </label>
            <input
              type="text"
              id="country"
              className="input country-name"
              placeholder="Zimbabwe"
            />
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
                <div className="project-line">
                  <label className="label" htmlFor="street">
                    Project name
                  </label>
                  <input
                    type="text"
                    id="street"
                    className="input project-name"
                    placeholder="Project name"
                  />
                </div>
                <div className="costing-line">
                  <div className="qty-line">
                    <label className="label" htmlFor="qty">
                      Qty
                    </label>
                    <input
                      type="number"
                      id="qty"
                      className="input quantity"
                      placeholder="1"
                    />
                  </div>

                  <div className="qty-line">
                    <label className="label" htmlFor="price">
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      className="input price"
                      placeholder="200.00"
                    />
                  </div>

                  <div className="total-line">
                    <label className="label" htmlFor="total">
                      Total
                    </label>
                    <input
                      type="number"
                      id="total"
                      className="input total"
                      placeholder="200.00"
                    />
                  </div>
                </div>
              </div>
            )
          )}

          <button className="delete" aria-label="delete product">
            <img src={DeleteBtn} alt="" aria-hidden={true} />
          </button>
        </fieldset>
      </Form>
    </div>
  );
}

export default EditInvoice;
