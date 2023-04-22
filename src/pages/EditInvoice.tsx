import { MouseEvent, useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import PreviousPage from "../components/PreviousPage";
import fetchInvoice from "../hooks/fetchInvoice";
import getInvoice from "../hooks/getInvoice";
import DeleteBtn from "../assets/icon-delete.svg";
import AddItemImg from "../assets/icon-plus.svg";
import AddNewProject from "../components/AddNewProject";
import { useMutation, useQueryClient } from "react-query";
import { updateInvoice } from "../hooks/updateInvoice";
import DeleteProject from "../components/DeleteProject";

// import SaveInvoice from "../components/SaveInvoice";
// import Inputs from "../components/Inputs";

function EditInvoice() {
  const newProject = {
    name: "Project Name",
    quantity: 1,
    price: 100.0,
    total: 100.0,
  };
  interface ICosting {
    name: string;
    quantity: number;
    price: number;
    total: number;
  }

  const queryClient = useQueryClient();

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [deleteProjectModal, setDeleteProjectModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [project, setProject] = useState(newProject);
  const params = useParams();

  // Create our number formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // Fetch an invoice
  console.log(params.id);
  const invoice = getInvoice(params.id);

  // load initial form data on first visit to site
  const initialState = {
    _id: invoice._id,
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

  const updateInvoiceMutation = useMutation(updateInvoice, {
    onSuccess: () => {
      queryClient.invalidateQueries("invoices");
    },
  });

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

  useEffect(() => {
    setProject({ ...project, total: project.price * project.quantity });
  }, [project.price, project.quantity]);

  const addProject = () => {
    setProject({
      ...project,
      name: `Project name${invoice.items.length}`,
    });
    updateInvoiceMutation.mutate({
      ...invoice,
      items: invoice.items.concat(project),
    });
  };

  // Opens the Delete Project dialog with 2 options
  // 1. Option 1 - Cancel delete and return to previous page
  // 2. Option 2 - Delete project and return to previous page
  const deleteProjectDialog = (
    evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    name: string
  ) => {
    evt.preventDefault();
    setDeleteProjectModal(!deleteProjectModal);
    setProjectName(name);
  };

  // Deletes a project from the invoice
  const deleteProjectConfirmation = (
    evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    evt.preventDefault();
    updateInvoiceMutation.mutate({
      ...invoice,
      items: invoice.items.filter(
        (item: { name: string }) => item.name !== projectName
      ),
    });
    setProjectName("");
    setDeleteProjectModal(!deleteProjectModal);
  };

  // Project not deleted
  const exitWithoutDeletingProject = () => {
    setDeleteProjectModal(!deleteProjectModal);
  };

  // add another project by displaying the modal. This will add an edit component
  // to add Name of project, quantity, price and total
  const toggleDisplayModal = (
    evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    evt.preventDefault();
    setShowProjectModal(!showProjectModal);
  };

  // Updates the array of projects ITEM by diaplaying the modal with
  // the object to be added to the array. The obj has the following
  // Name of project, quantity, price and total.
  const updateItems = (
    evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    // console.log(project);
    evt.preventDefault();
    // toggleDisplayModal(evt);
    addProject();
  };

  // Add project component to add another project to the items array
  const onChangeNewProject = (evt: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = evt.target;
    setProject({ ...project, [name]: value });
  };

  const handleSubmitForm = (data: {
    _id: any;
    id: string;
    createdAt: Date;
    paymentDue: string;
    description: string;
    paymentTerms: any;
    clientEmail: string;
    clientName: string;
    status: string;
    total: number;
    senderAddress: {
      street: string;
      city: string;
      postCode: string;
      country: string;
    };
    clientAddress: {
      street: string;
      city: string;
      postCode: string;
      country: string;
    };
    items: ICosting[];
  }) => {
    const invoice = {
      ...data,
    };

    updateInvoiceMutation.mutate(invoice);
    alert("Invoice has been saved");
  };

  return (
    <>
      <main className="main">
        <PreviousPage title={`Edit the invoice of ${invoice.clientName}`} />
        <Form
          method="post"
          className="edit-form"
          onSubmit={handleSubmit(handleSubmitForm)}
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
                  aria-invalid={
                    errors.senderAddress?.postCode ? "true" : "false"
                  }
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
                  aria-invalid={
                    errors.senderAddress?.country ? "true" : "false"
                  }
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
                  aria-invalid={
                    errors.clientAddress?.postCode ? "true" : "false"
                  }
                  {...register("clientAddress.postCode", {
                    required: "Postal code is required",
                    minLength: 4,
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
                  aria-invalid={
                    errors.clientAddress?.country ? "true" : "false"
                  }
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
                          deleteProjectDialog(evt, invoice.items[index].name)
                        }
                      >
                        <img src={DeleteBtn} alt="" aria-hidden={true} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
            <button
              className="btn btn-add-item"
              disabled={!isDirty || !isValid}
              onClick={updateItems}
            >
              <img src={AddItemImg} alt="" aria-hidden={true} />
              Add new Item
            </button>
          </fieldset>
          {/* 
         <AddNewProject showProjectModal={showProjectModal} click={(evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => updateItems(evt)} />
                      */}
          {/*  Add project layout */}
          {/* 
          <div
            className={`modal ${showProjectModal ? "showProjectModal" : ""}`}
          >
            <div className="grid project-container">
             
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
                  value={project.total}
                />
              </div>
              <div className="flex add-item-control">
                <button
                  className="btn btn-cancel btn-cancel-add"
                  onClick={(evt) => toggleDisplayModal(evt)}
                >
                  Cancel
                </button>
                <button className="btn btn-add-project" onClick={updateItems}>
                  Add Project
                </button>
              </div>
            </div>
          </div>
        */}
          <div className="footer flex">
            <div className="flex footer-edit">
              <button
                className="btn btn-cancel"
                onClick={(evt) => evt.preventDefault()}
              >
                Cancel
              </button>
              <button className="btn btn-save" type="submit">
                Save changes
              </button>
            </div>
          </div>
        </Form>
      </main>

      <DeleteProject
        deleteModal={deleteProjectModal}
        exitWithoutDeletingProject={exitWithoutDeletingProject}
        deleteProjectConfirmation={deleteProjectConfirmation}
        name={projectName}
      />
    </>
  );
}

export default EditInvoice;
