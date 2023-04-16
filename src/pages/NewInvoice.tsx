import React from "react";
import PreviousPage from "../components/PreviousPage";
import { Form } from "react-router-dom";
import { useForm } from "react-hook-form";

function NewInvoice() {
  // load initial form data on first visit to site
  const initialState = {
    id: "",
    createdAt: "",
    paymentDue: "",
    description: "",
    paymentTerms: "",
    clientEmail: "ckmutezva@gmail.com",
    clientName: "Chamu Mutezva",
    status: "draft",
    total: 0.0,
    senderAddress: {
      street: "36 Gomarara street",
      city: "Mabvuku",
      postCode: "48900",
      country: "Zimbabwe",
    },
    clientAddress: {
      street: "37 Besa street",
      city: "Chitungwiza",
      postCode: "9000",
      country: "Zimbabwe",
    },
    items: [],
  };

  // load form with initialstate
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty, isValid, touchedFields },
  } = useForm({ defaultValues: initialState });
  console.log(errors);
  return (
    <div className="main">
      <PreviousPage title={`Create new invoice`} />
      <Form method="post" className="edit-form">
        <h2 className="edit-title">New invoice</h2>
        {/* SENDER DETAILS */}
        <fieldset className="edit-invoice-details">
          <legend className="edit-field-title">Bill From</legend>
          {/* SENDER STREET DETAILS */}
          <div className={`address-line street-line`}>
            <label className="label" htmlFor={`street`}>
              Street Address
            </label>
            <input
              type="text"
              id={`street`}
              aria-labelledby="sender-street"
              className={`input street`}
              placeholder={`116 Caledorn street`}
              aria-invalid={errors.senderAddress?.street ? "true" : false}
              {...register("senderAddress.street", {
                required: "Street address is required",
                minLength: 4,
              })}
            />
            {errors.senderAddress?.street && (
              <p role="alert" id="sender-street" className="form-errors">
                {errors.senderAddress.street.message?.toString()}
              </p>
            )}
          </div>
          {/* SENDER CITY DETAILS */}
          <div className="grid postal-city">
            <div className={`address-line city-line`}>
              <label className="label" htmlFor={`city`}>
                City
              </label>
              <input
                type="text"
                id={`city`}
                aria-labelledby="sender-city"
                className={`input city`}
                placeholder={`Uitenhage`}
                aria-invalid={errors.senderAddress?.city ? "true" : "false"}
                {...register("senderAddress.city", {
                  required: "City is required",
                  minLength: 4,
                })}
              />
              {errors.senderAddress?.city && (
                <p role="alert" id="sender-city" className="form-errors">
                  {errors.senderAddress.city.message?.toString()}
                </p>
              )}
            </div>

            {/* SENDER POSTAL CODE DETAILS */}
            <div className={`address-line postal-line`}>
              <label className="label" htmlFor={`postal`}>
                Postal code
              </label>
              <input
                type="text"
                id={`postal`}
                className={`input postal`}
                aria-labelledby="sender-postal"
                placeholder={`6229`}
                aria-invalid={errors.senderAddress?.postCode ? "true" : "false"}
                {...register("senderAddress.postCode", {
                  required: "Enter postal code",
                  minLength: 4,
                })}
              />
              {errors.senderAddress?.postCode && (
                <p role="alert" id="sender-postal" className="form-errors">
                  {errors.senderAddress.postCode.message?.toString()}
                </p>
              )}
            </div>

            {/* SENDER COUNTRY DETAILS */}
            <div className={`address-line country-line`}>
              <label className="label" htmlFor={`country`}>
                Country
              </label>
              <input
                type="text"
                id={`country`}
                className={`input country`}
                placeholder={`South Africa`}
                aria-labelledby="sender-country"
                aria-invalid={errors.senderAddress?.country ? "true" : "false"}
                {...register("senderAddress.country", {
                  required: "Country is required",
                  minLength: 4,
                })}
              />
              {errors.senderAddress?.country && (
                <p role="alert" id="sender-country" className="form-errors">
                  {errors.senderAddress.country.message?.toString()}
                </p>
              )}
            </div>
          </div>
        </fieldset>
        {/* CLIENT DETAILS */}
        <fieldset className="edit-invoice-details">
          <legend className="edit-field-title">Bill to</legend>

          {/* CLIENT NAME DETAILS */}
          <div className={`address-line`}>
            <label className="label" htmlFor={`client`}>
              Client name
            </label>
            <input
              type="text"
              id={`client`}
              className={`input`}
              placeholder={`Chamu mutezva`}
              aria-labelledby="client-name-lbl"
              aria-invalid={errors.clientName ? "true" : "false"}
              {...register("clientName", {
                required: "Client name is required",
                minLength: 1,
              })}
            />
            {errors.clientName && (
              <p role="alert" id="client-name-lbl" className="form-errors">
                {errors.clientName.message?.toString()}
              </p>
            )}
          </div>

          {/* CLIENT EMAIL DETAILS */}
          <div className={`address-line email-line`}>
            <label className="label" htmlFor={`email`}>
              Client email
            </label>
            <input
              type="text"
              id={`email`}
              className={`input email-address`}
              placeholder={`mutezva@gmail.com`}
              aria-labelledby="client-email-lbl"
              aria-invalid={errors.clientEmail ? "true" : "false"}
              {...register("clientEmail", {
                required: "Enter valid email",
                minLength: 4,
              })}
            />
            {errors.clientEmail && (
              <p role="alert" id="client-email-lbl" className="form-errors">
                {errors.clientEmail.message?.toString()}
              </p>
            )}
          </div>

          {/* CLIENT STREET DETAILS */}
          <div className={`address-line street-line`}>
            <label className="label" htmlFor={`client-street`}>
              street name
            </label>
            <input
              type="text"
              id={`client-street`}
              className={`input street`}
              placeholder="19 Receiver street"
              aria-labelledby="client-street-lbl"
              aria-invalid={errors.clientAddress?.street ? "true" : "false"}
              {...register("clientAddress.street", {
                required: "Client street is required",
                minLength: 4,
              })}
            />
            {errors.clientAddress?.street && (
              <p role="alert" id="client-street-lbl" className="form-errors">
                {errors.clientAddress.street.message?.toString()}
              </p>
            )}
          </div>

          <div className="grid postal-city">
            {/* CLIENT CITY DETAILS */}
            <div className={`address-line city-line`}>
              <label className="label" htmlFor={`client-city`}>
                City
              </label>
              <input
                type="text"
                id={`client-city`}
                className={`input city`}
                placeholder={`London`}
                aria-labelledby="client-city-lbl"
                aria-invalid={errors.clientAddress?.city ? "true" : "false"}
                {...register("clientAddress.city", {
                  required: "Client city is required",
                  minLength: 4,
                })}
              />
              {errors.clientAddress?.city && (
                <p role="alert" id="client-city-lbl" className="form-errors">
                  {errors.clientAddress.city.message?.toString()}
                </p>
              )}
            </div>
            {/* CLIENT POSTAL DETAILS */}
            <div className={`address-line postal-line`}>
              <label className="label" htmlFor={`client-postal`}>
                Postal code
              </label>
              <input
                type="text"
                id={`client-postal`}
                className={`input postal`}
                placeholder={`AE123`}
                aria-labelledby="client-postal-lbl"
                aria-invalid={errors.clientAddress?.postCode ? "true" : "false"}
                {...register("clientAddress.postCode", {
                  required: "Postal code is required",
                  minLength: 4,
                })}
              />
              {errors.clientAddress?.postCode && (
                <p role="alert" id="client-postal-lbl" className="form-errors">
                  {errors.clientAddress.postCode.message?.toString()}
                </p>
              )}
            </div>

            {/* CLIENT COUNTRY DETAILS */}
            <div className={`address-line country-line`}>
              <label className="label" htmlFor={`country`}>
                Country
              </label>
              <input
                type="text"
                id={`country`}
                className={`input country`}
                placeholder={`South Africa`}
                aria-labelledby="client-country-lbl"
                aria-invalid={errors.clientAddress?.country ? "true" : "false"}
                {...register("clientAddress.country", {
                  required: "Client country is required",
                  minLength: 4,
                })}
              />
              {errors.clientAddress?.country && (
                <p id="client-country-lbl" className="form-errors">
                  {errors.clientAddress.country.message?.toString()}
                </p>
              )}
            </div>
          </div>
        </fieldset>
        {/* INVOICE DETAILS  */}
        <fieldset className="edit-invoice-details">
          <div className="grid">
            <div className={`invoice-date`}>
              <label className="label" htmlFor={`date`}>
                Invoice date
              </label>
              <input
                type="date"
                id={`date`}
                className={`input date-signed`}
                placeholder={""}
                aria-labelledby="invoice-date-lbl"
                aria-invalid={errors.paymentDue ? "true" : "false"}
                {...register("paymentDue", {
                  required: "Select a date",
                })}
              />
              {errors.paymentDue && (
                <p role="alert" id="invoice-date-lbl" className="form-errors">
                  {errors.paymentDue.message?.toString()}
                </p>
              )}
            </div>

            {/* PAYMENT DETAILS */}
            <div className="payment-terms">
              <label className="label" htmlFor="terms">
                Payment terms
              </label>
              <select
                className="input terms-options"
                id="terms"
                aria-labelledby="terms-lbl"
                aria-invalid={errors.paymentTerms ? "true" : "false"}
                {...register("paymentTerms", {
                  required: "Select payment option",
                })}
              >
                <option value={1}>Net 1 Day</option>
                <option value={6}>Net 6 days</option>
                <option value={7}>Net 7 days</option>
                <option value={14}>Net 14 Days</option>
                <option value={30}>Net 30 Days</option>
              </select>
              {errors.paymentTerms && (
                <p role="alert" id="terms-lbl" className="form-errors">
                  {errors.paymentTerms.message?.toString()}
                </p>
              )}
            </div>
          </div>

          {/* PROJECT NAME DETAILS */}
          <div className={`project`}>
            <label className="label" htmlFor={`project-desc`}>
              Project Description
            </label>
            <input
              type="text"
              id={`project-desc`}
              className={`input project-desc`}
              placeholder={"Description"}
              aria-labelledby="description-lbl"
              aria-invalid={errors.description ? "true" : "false"}
              {...register("description", {
                required: "Project description required",
                minLength: 4,
              })}
            />
            {errors.description && (
              <p role="alert" id="description-lbl" className="form-errors">
                {errors.description.message?.toString()}
              </p>
            )}
          </div>
        </fieldset>
        
      </Form>
    </div>
  );
}

export default NewInvoice;
