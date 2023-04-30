import React, { useEffect, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import add from "date-fns/add";
import PreviousPage from "../components/PreviousPage";
import { randomId } from "../hooks/useRandomID";
import createInvoice from "../hooks/useCreateInvoice";
import DeleteBtn from "../assets/icon-delete.svg";
import AddItemImg from "../assets/icon-plus.svg";
import { reducer } from "../hooks/useReducer";
import CreateInvoiceDialog from "../components/CreateInvoiceDialog";
import { ICosting } from "../Types/DataTypes";
import { InvoiceTypes } from "../Types/DataTypes";

function NewInvoice() { 

  const newProject: ICosting = {
    name: "Project Name",
    quantity: 1,
    price: 100.0,
    total: 100.0,
  };

  const navigate = useNavigate();
  const { mutate, isError, isSuccess } = createInvoice();
  const [deleteProjectModal, setDeleteProjectModal] = useState(false);
  const [project, setProject] = useState(newProject);
  const [showDialog, setShowDialog] = useState(false);

  // load initial form data on first visit to site
  const initialState = {
    id: randomId(),
    createdAt: new Date().toJSON().slice(0, 10),
    paymentDue: add(Date.now(), { days: 1 }),
    description: "",
    paymentTerms: "Net 6 days",
    clientEmail: "ckmutezva@gmail.com",
    clientName: "Chamu Mutezva",
    status: "draft",
    total: 100.0,
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
    items: [project],
  };

  const [data, setData] = useState(initialState);

  // Opens the Delete Project dialog with 2 options
  // 1. Option 1 - Cancel delete and return to previous page
  // 2. Option 2 - Delete project and return to previous page
  const deleteProjectDialog = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    name: string
  ) => {
    evt.preventDefault();
    setDeleteProjectModal(!deleteProjectModal);
  };

  // Updates The obj which has the following
  // Name of project, quantity, price and total.
  const updateItems = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    evt.preventDefault();
    setProject({
      ...project,
      name: `Project name${data.items.length + 1}`,
    });
    setData({ ...data, items: data.items.concat(project) });
    console.log(evt);
  };

  // calculate the paymentDue date, when the payment options has been selected
  // using the add function provided by "date-fns"
  const onTermsChange = (numOfDays: number) => {
    console.log(numOfDays);
    setValue("paymentDue", add(Date.now(), { days: numOfDays }));
  };

  // load form with initialstate
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors, isDirty, isValid, touchedFields },
  } = useForm({ defaultValues: initialState });
  console.log(errors);

  const handleSubmitForm = (data: any) => {
    setData({
      ...data,
      total: calculateTotal(),
    });
    setShowDialog(() => true);
    console.log(data);
    mutate(data);
    if (isSuccess) console.log("hurray");
    if (isError) console.log("abort mission");
  };

  function calculateTotal(): number {
    const totalArray = watchTotal[0].map((item: { total: any }) => item.total);
    setValue("total", totalArray.length > 0 ? totalArray.reduce(reducer) : 0);
    console.log(watchTotal[0]);
    const total = totalArray.length > 0 ? totalArray.reduce(reducer) : 0;
    return total.toFixed(2);
  }

  const watchTotal = watch(["items", "total"]);
  console.log(watchTotal);

  useEffect(() => {
    if (showDialog) {
      document.body.classList.add("body-size");
    }
    return () => {
      document.body.classList.remove("body-size");
    };
  });

  return (
    <>
      <main className="main">
        <PreviousPage title={`Create new invoice`} />
        <Form
          method="post"
          className="edit-form"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <h2 className="edit-title">New invoice</h2>
          {/* SENDER DETAILS */}
          <fieldset className="edit-invoice-details">
            <legend className="edit-field-title">Bill From</legend>
            {/* SENDER STREET DETAILS */}
            <div className={`address-line `}>
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
                  minLength: {
                    value: 4,
                    message: "Length must be more than 4",
                  },
                  onChange(event) {
                    console.log(data);
                  },
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
              <div className={`address-line`}>
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
                    minLength: {
                      value: 4,
                      message: "Length must be more than 4",
                    },
                  })}
                />
                {errors.senderAddress?.city && (
                  <p role="alert" id="sender-city" className="form-errors">
                    {errors.senderAddress.city.message?.toString()}
                  </p>
                )}
              </div>

              {/* SENDER POSTAL CODE DETAILS */}
              <div className={`address-line `}>
                <label className="label" htmlFor={`postal`}>
                  Postal code
                </label>
                <input
                  type="text"
                  id={`postal`}
                  className={`input postal`}
                  aria-labelledby="sender-postal"
                  placeholder={`6229`}
                  aria-invalid={
                    errors.senderAddress?.postCode ? "true" : "false"
                  }
                  {...register("senderAddress.postCode", {
                    required: "Enter postal code",
                    minLength: {
                      value: 4,
                      message: "Length must be more than 4",
                    },
                  })}
                />
                {errors.senderAddress?.postCode && (
                  <p role="alert" id="sender-postal" className="form-errors">
                    {errors.senderAddress.postCode.message?.toString()}
                  </p>
                )}
              </div>

              {/* SENDER COUNTRY DETAILS */}
              <div className={`address-line `}>
                <label className="label" htmlFor={`country`}>
                  Country
                </label>
                <input
                  type="text"
                  id={`country`}
                  className={`input country`}
                  placeholder={`South Africa`}
                  aria-labelledby="sender-country"
                  aria-invalid={
                    errors.senderAddress?.country ? "true" : "false"
                  }
                  {...register("senderAddress.country", {
                    required: "Country is required",
                    minLength: {
                      value: 4,
                      message: "Length must be more than 4",
                    },
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
                  minLength: {
                    value: 1,
                    message: "Length must be more than 1",
                  },
                })}
              />
              {errors.clientName && (
                <p role="alert" id="client-name-lbl" className="form-errors">
                  {errors.clientName.message?.toString()}
                </p>
              )}
            </div>

            {/* CLIENT EMAIL DETAILS */}
            <div className={`address-line`}>
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
                  minLength: {
                    value: 4,
                    message: "Length must be more than 4",
                  },
                })}
              />
              {errors.clientEmail && (
                <p role="alert" id="client-email-lbl" className="form-errors">
                  {errors.clientEmail.message?.toString()}
                </p>
              )}
            </div>

            {/* CLIENT STREET DETAILS */}
            <div className={`address-line`}>
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
                  minLength: {
                    value: 4,
                    message: "Length must be more than 4",
                  },
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
              <div className={`address-line`}>
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
                    minLength: {
                      value: 4,
                      message: "Length must be more than 4",
                    },
                  })}
                />
                {errors.clientAddress?.city && (
                  <p role="alert" id="client-city-lbl" className="form-errors">
                    {errors.clientAddress.city.message?.toString()}
                  </p>
                )}
              </div>
              {/* CLIENT POSTAL DETAILS */}
              <div className={`address-line`}>
                <label className="label" htmlFor={`client-postal`}>
                  Postal code
                </label>
                <input
                  type="text"
                  id={`client-postal`}
                  className={`input postal`}
                  placeholder={`AE123`}
                  aria-labelledby="client-postal-lbl"
                  aria-invalid={
                    errors.clientAddress?.postCode ? "true" : "false"
                  }
                  {...register("clientAddress.postCode", {
                    required: "Postal code is required",
                    minLength: {
                      value: 4,
                      message: "Length must be more than 4",
                    },
                  })}
                />
                {errors.clientAddress?.postCode && (
                  <p
                    role="alert"
                    id="client-postal-lbl"
                    className="form-errors"
                  >
                    {errors.clientAddress.postCode.message?.toString()}
                  </p>
                )}
              </div>

              {/* CLIENT COUNTRY DETAILS */}
              <div className={`address-line`}>
                <label className="label" htmlFor={`country`}>
                  Country
                </label>
                <input
                  type="text"
                  id={`country`}
                  className={`input country`}
                  placeholder={`South Africa`}
                  aria-labelledby="client-country-lbl"
                  aria-invalid={
                    errors.clientAddress?.country ? "true" : "false"
                  }
                  {...register("clientAddress.country", {
                    required: "Client country is required",
                    minLength: {
                      value: 4,
                      message: "Length must be more than 4",
                    },
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
                <label className="label" htmlFor={`date-created`}>
                  Invoice date
                </label>
                <input
                  type="date"
                  id={`date-created`}
                  className={`input date-created`}
                  placeholder={""}
                  aria-labelledby="invoice-date-lbl"
                  aria-invalid={errors.createdAt ? "true" : "false"}
                  {...register("createdAt", {
                    required: "Select a date",
                  })}
                />
                {errors.createdAt && (
                  <p role="alert" id="invoice-date-lbl" className="form-errors">
                    {errors.createdAt?.message?.toString()}
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
                    onChange(evt) {
                      onTermsChange(evt.target.value);
                    },
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

            {/* PAYMENT DUE DETAILS */}
            <div className={`sr-only address-line`}>
              <label className="label" htmlFor={`payment-due`}>
                Payment due date
              </label>
              <input
                type="text"
                id={`payment-due`}
                className={`input payment-due`}
                readOnly={true}
                {...register("paymentDue")}
              />
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
                  minLength: {
                    value: 4,
                    message: "Length must be more than 4",
                  },
                })}
              />
              {errors.description && (
                <p role="alert" id="description-lbl" className="form-errors">
                  {errors.description.message?.toString()}
                </p>
              )}
            </div>
          </fieldset>

          <fieldset className="edit-invoice-details">
            <legend className="edit-field-title">Item list</legend>
            {data.items.length <= 0 ? (
              <p>They is no projects yet to display</p>
            ) : (
              data.items.map((item, index) => (
                <div className="item-line" key={item.name}>
                  {/* PROJECT NAME DETAILS */}
                  <div className={`project-line`}>
                    <label className="label" htmlFor={`project-name`}>
                      Project name
                    </label>
                    <input
                      type="text"
                      id={`project-name`}
                      className={`input project-name`}
                      placeholder={"Name of project"}
                      {...register(`items.${index}.name`, {
                        required: true,
                        minLength: {
                          value: 4,
                          message: "Must be longer than 4",
                        },
                        onChange(evt) {
                          console.log(evt.target.value);
                          console.log(data);
                          console.log(item, index);
                          setProject({
                            ...project,
                            name: evt.target.value,
                          });
                        },
                      })}
                    />
                  </div>

                  {/* QUANTITY DETAILS */}
                  <div className={`costing-line`}>
                    <div className="quantity-line calculate-line-container">
                      <label className="label" htmlFor={`qty-line`}>
                        Qty
                      </label>
                      {watchTotal && (
                        <input
                          type="number"
                          id={`qty`}
                          className={`qty input calculate-line`}
                          placeholder={"1"}
                          {...register(`items.${index}.quantity`, {
                            required: true,
                            onChange: (evt) => {
                              setValue(
                                `items.${index}.total`,
                                evt.target.value *
                                  getValues(`items.${index}.price`)
                              );
                              setProject({
                                ...project,
                                quantity: evt.target.value,
                                total:
                                  evt.target.value *
                                  getValues(`items.${index}.price`),
                              });
                              setValue("total", calculateTotal());
                            },
                            onBlur: () => {
                              setValue("total", calculateTotal());
                            },
                          })}
                        />
                      )}
                    </div>

                    {/* PRICE DETAILS */}
                    <div className={`price-line calculate-line-container`}>
                      <label className="label" htmlFor={`price`}>
                        Price
                      </label>
                      {watchTotal && (
                        <input
                          type="number"
                          step={0.01}
                          id={`price`}
                          className={`price input calculate-line`}
                          placeholder={"200.00"}
                          {...register(`items.${index}.price`, {
                            required: true,
                            onChange: (evt) => {
                              setValue(
                                `items.${index}.total`,
                                evt.target.value *
                                  getValues(`items.${index}.quantity`)
                              );
                              setProject({
                                ...project,
                                price: evt.target.value,
                                total:
                                  evt.target.value *
                                  getValues(`items.${index}.quantity`),
                              });
                              setValue("total", calculateTotal());
                            },
                            onBlur: () => {
                              setValue("total", calculateTotal());
                            },
                          })}
                        />
                      )}
                    </div>

                    {/* PROJECT TOTAL DETAILS */}
                    <div className={`item-total-line calculate-line-container`}>
                      <label className="label" htmlFor={`item-total`}>
                        Total
                      </label>

                      <input
                        type="number"
                        id={`item-total`}
                        className={`item-total input calculate-line`}
                        placeholder={"200.00"}
                        readOnly={true}
                        {...register(`items.${index}.total`, {
                          required: true,
                        })}
                      />
                    </div>

                    {/* DELETE PROJECT */}
                    <div className="container-delete calculate-line-container">
                      <button
                        className="btn btn-delete calculate-line"
                        aria-label="delete product"
                        onClick={(evt) =>
                          deleteProjectDialog(evt, data.items[index].name)
                        }
                      >
                        <img src={DeleteBtn} alt="" aria-hidden={true} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* PROJECT TOTAL DETAILS */}
            <div className={`sr-only item-total-line calculate-line-container`}>
              <label className="label" htmlFor={`grand-total`}>
                Grand Total
              </label>

              <input
                type="number"
                id={`grand-total`}
                className={`grand-total input calculate-line`}
                placeholder={"200.00"}
                readOnly={true}
                {...register(`total`, {
                  required: true,
                })}
              />
            </div>

            <button
              className="btn btn-add-item"
              disabled={!isDirty || !isValid}
              onClick={updateItems}
            >
              <img src={AddItemImg} alt="" aria-hidden={true} />
              Add new Item
            </button>
          </fieldset>

          <div className="footer flex">
            <div className="flex footer-edit">
              <button className="btn btn-cancel" onClick={() => navigate(-1)}>
                Discard
                <span className="sr-only">and return to homepage</span>
              </button>
              <button className="btn btn-save" type="submit">
                Save as draft
              </button>
              <button className="btn btn-save" type="submit">
                Save & send
              </button>
            </div>
          </div>
        </Form>
      </main>
      <CreateInvoiceDialog showDialog={showDialog} />
    </>
  );
}

export default NewInvoice;
