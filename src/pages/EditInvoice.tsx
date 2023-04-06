import { MouseEvent, useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import PreviousPage from "../components/PreviousPage";
import fetchInvoice from "../hooks/fetchInvoice";
import getInvoice from "../hooks/getInvoice";
import DeleteBtn from "../assets/icon-delete.svg";
import AddItemImg from "../assets/icon-plus.svg";
import AddNewProject from "./AddNewProject";
// import Inputs from "../components/Inputs";

function EditInvoice() {
  const newProject = {
    name: "Project Name",
    quantity: 1,
    price: 0.0,
    total: function () {
      return this.quantity * this.price;
    },
  };

  let [showModal, setShowModal] = useState(false);
  let [project, setProject] = useState(newProject);
  let params = useParams();

  // Create our number formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // Fetch an invoice
  const invoice =
    getInvoice(params.id) === undefined
      ? fetchInvoice(params.id)
      : getInvoice(params.id);

 // console.log(invoice);
  if (invoice === "undefined") {
    return <h1>Error in presenting page</h1>;
  }

  const initialState = {
    id: invoice.id,
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
 // console.log(initialState);

  // load foam with initialstate
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm({ defaultValues: initialState });

  const displayModal = (
    evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    evt.preventDefault();
    setShowModal(!showModal);
  };

  const updateItems = (
    evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    /*const newProject = {
      name: "Project Name",
      quantity: 1,
      price: 0.0,
      total: function () {
        this.quantity * this.price;
      },
    }; */

    evt.preventDefault();
    displayModal(evt);
  };

  const onChangeNewProject = (evt: { target: { name: any; value: any } }) => {
    const { name, value } = evt.target;
    console.log(evt.target);
    setProject({ ...project, [name]: value });
  };

  useEffect(() => {
    const subscription = watch((data) => {
      // setValue( `items.${index}.total`, )
     // console.log(data);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      <main className="main">
        <PreviousPage title={`Edit the invoice of ${invoice.clientName}`} />
        <Form
          className="edit-form"
          onSubmit={handleSubmit((data) => console.log(data))}
        >
          <h2 className="edit-title">
            Edit
            <span className="invoice-num invoice-num-edit">{invoice.id}</span>
          </h2>

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
                className={`input street`}
                placeholder={`116 Caledorn street`}
                {...register("senderAddress.street", {
                  required: true,
                  minLength: 4,
                })}
              />
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
                  className={`input city`}
                  placeholder={`Uitenhage`}
                  {...register("senderAddress.city", {
                    required: true,
                    minLength: 4,
                  })}
                />
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
                  placeholder={`6229`}
                  {...register("senderAddress.postCode", {
                    required: true,
                    minLength: 4,
                  })}
                />
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
                  {...register("senderAddress.country", {
                    required: true,
                    minLength: 4,
                  })}
                />
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
                {...register("clientName", { required: true, minLength: 1 })}
              />
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
                {...register("clientEmail", { required: true, minLength: 4 })}
              />
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
                {...register("clientAddress.street", {
                  required: true,
                  minLength: 4,
                })}
              />
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
                  {...register("clientAddress.city", {
                    required: true,
                    minLength: 4,
                  })}
                />
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
                  {...register("clientAddress.postCode", {
                    required: true,
                    minLength: 4,
                  })}
                />
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
                  {...register("clientAddress.country", {
                    required: true,
                    minLength: 4,
                  })}
                />
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
                  {...register("paymentDue")}
                />
              </div>

              {/* PAYMENT DETAILS */}
              <div className="payment-terms">
                <label className="label" htmlFor="terms">
                  Payment terms
                </label>
                <select
                  className="input terms-options"
                  id="terms"
                  {...register("paymentTerms")}
                >
                  <option value={1}>Net 1 Day</option>
                  <option value={6}>Net 6 days</option>
                  <option value={7}>Net 7 days</option>
                  <option value={14}>Net 14 Days</option>
                  <option value={30}>Net 30 Days</option>
                </select>
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
                {...register("description", { required: true, minLength: 4 })}
              />
            </div>
          </fieldset>

          <fieldset className="edit-invoice-details">
            <legend className="edit-field-title">Item list</legend>
            {invoice.items.map(
              (
                item: {
                  name: string;
                  quantity: number;
                  price: number;
                  total: number;
                },
                index: number
              ) => (
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
                        minLength: 4,
                      })}
                    />
                  </div>

                  {/* QUANTITY DETAILS */}
                  <div className={`costing-line`}>
                    <div className="quantity-line calculate-line-container">
                      <label className="label" htmlFor={`qty-line`}>
                        Qty
                      </label>
                      <input
                        type="number"
                        id={`qty`}
                        className={`qty calculate-line`}
                        placeholder={"1"}
                        {...register(`items.${index}.quantity`, {
                          required: true,
                          onChange: (evt) => {
                            console.log(item.quantity * item.price);
                            console.log(item.quantity);
                            setValue(
                              `items.${index}.total`,
                              item.quantity * item.price
                            );
                          },
                        })}
                      />
                    </div>

                    {/* PRICE DETAILS */}
                    <div className={`price-line calculate-line-container`}>
                      <label className="label" htmlFor={`price`}>
                        Price
                      </label>
                      <input
                        type="number"
                        step={0.01}
                        id={`price`}
                        className={`price calculate-line`}
                        placeholder={"200.00"}
                        {...register(`items.${index}.price`, {
                          required: true,
                          onChange: (evt) => {
                            console.log(item.quantity * item.price);
                            setValue(
                              `items.${index}.total`,
                              evt.target.value * item.quantity
                            );
                          },
                        })}
                      />
                    </div>

                    {/* PROJECT TOTAL DETAILS */}
                    <div className={`item-total-line calculate-line-container`}>
                      <label className="label" htmlFor={`item-total`}>
                        Total
                      </label>
                      <input
                        type="number"
                        id={`item-total`}
                        className={`item-total calculate-line`}
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
                        className="delete calculate-line"
                        aria-label="delete product"
                        onClick={(evt) => {
                          evt.preventDefault();
                        }}
                      >
                        <img src={DeleteBtn} alt="" aria-hidden={true} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
            <button
              className="btn-add-item"
              disabled={!isDirty || !isValid}
              onClick={(evt) => displayModal(evt)}
            >
              <img src={AddItemImg} alt="" aria-hidden={true} />
              Add new Item
            </button>
          </fieldset>
          {/* 
         <AddNewProject showModal={showModal} click={(evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => updateItems(evt)} />
                      */}
        </Form>
        <div className={`modal ${showModal ? "showModal" : ""}`}>
          <div className="grid project-container">
            <div className="add-container project-descr-container">
              <label className="label" htmlFor="project-desc">
                Project Description
              </label>
              <input
                type="text"
                className="input"
                name="project-description"
                id="project-desc"

                // onChange={}
              />
            </div>
            <div className="add-container project-name-container">
              <label className="label" htmlFor="project-name">
                Project name
              </label>
              <input
                type="text"
                className="input"
                name="name"
                id="project-name"
                value={project.name}
                onChange={onChangeNewProject}
              />
            </div>
            <div className="add-container quantity-container">
              <label className="label" htmlFor="quantity">
                Quantity
              </label>
              <input
                type="text"
                className="input"
                name="quantity"
                id="quantity"
                value={project.quantity}
                onChange={onChangeNewProject}
              />
            </div>
            <div className="add-container price-container">
              <label className="label" htmlFor="price">
                Price
              </label>
              <input
                type="text"
                className="input"
                name="price"
                id="price"
                value={project.price}
                onChange={onChangeNewProject}
              />
            </div>
            <div className="add-container total-container">
              <label className="label" htmlFor="total">
                Total
              </label>
              <input
                type="text"
                className="input"
                name="total"
                id="total"
                readOnly
                value={project.total()}
              />
            </div>
            <div className="add-item-control">
              <button className="btn btn-cancel-add">Cancel</button>
              <button className="btn btn-add-project" onClick={updateItems}>
                Add Project
              </button>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex footer footer-edit">
        <button className="btn btn-cancel" onClick={(evt) => displayModal(evt)}>
          Cancel
        </button>
        <button className="btn btn-save" onClick={(evt) => displayModal(evt)}>
          Save changes
        </button>
      </footer>
    </>
  );
}

export default EditInvoice;
