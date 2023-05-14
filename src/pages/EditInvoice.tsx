import { MouseEvent, useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import add from "date-fns/add";
import format from "date-fns/format";
import PreviousPage from "../components/PreviousPage";
import DeleteBtn from "../assets/icon-delete.svg";
import AddItemImg from "../assets/icon-plus.svg";
import { useMutation, useQueryClient } from "react-query";
import { updateInvoice } from "../hooks/useUpdateInvoice";
import DeleteProject from "../components/DeleteProject";
import { reducer } from "../hooks/useReducer";
import SaveEditedPageDialog from "../components/SaveEditedPageDialog";
import { ICosting, InvoiceTypesID } from "../Types/DataTypes";
import { useGetSingleInvoice } from "../hooks/useFetchInvoice";
import CustomInput from "../components/CustomInput";
import CustomSelect from "../components/CustomSelect";

function EditInvoice() {
  const projectInit: ICosting = {
    name: "Project Name",
    quantity: 1,
    price: 100.0,
    total: 100.0,
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [showConfirmSave, setShowConfirmSave] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [project, setProject] = useState(projectInit);
  const params = useParams();

  // Fetch an invoice
  const { data } = useGetSingleInvoice(params.id);
  const invoice = data;

  // load initial form data on first visit to site
  // format(new Date(invoice.createdAt), "yyyy-MM-dd"),
  const initialState: InvoiceTypesID = {
    _id: invoice._id,
    id: invoice.id,
    createdAt: format(new Date(invoice.createdAt), "yyyy-MM-dd"),
    paymentDue: invoice.paymentDue,
    description: invoice.description,
    paymentTerms: invoice.paymentTerms,
    clientEmail: invoice.clientEmail,
    clientName: invoice.clientName,
    status: invoice.status === "draft" ? "pending" : invoice.status,
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

  const updateInvoiceMutation = useMutation(updateInvoice, {
    onSuccess: () => {
      queryClient.invalidateQueries("invoices");
    },
  });

  // load form with initialstate
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm({ defaultValues: initialState });

  // watch for changes , changes for items to be used to calculate the grandtotal
  const watchTotal = watch(["items", "total"]);
  console.log(watchTotal);
  const payment = watch("paymentTerms"); 
  console.log(payment);
  // When a new project has been added or a project has been deleted
  // the grandtotal should be recalculated
  function calculateTotal(): number {
    const totalArray = watchTotal[0].map((item: { total: any }) => item.total);
    const total = totalArray.length > 0 ? totalArray.reduce(reducer) : 0;
    setValue("total", total);
    return total.toFixed(2);
  }

  const addProject = () => {
    setProject({
      ...project,
      name: `Project name${invoice.items.length}`,
    });
    updateInvoiceMutation.mutate({
      ...invoice,
      items: invoice.items.concat(project),
      total: calculateTotal(),
    });
  };

  // Opens the Delete Project dialog with 2 options
  // 1. Option 1 - Cancel delete and return to previous page
  // 2. Option 2 - Delete project and return to previous page
  const deleteProjectDialog = (
    evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    name: string
  ) => {
    console.log(name);
    evt.preventDefault();
    setShowDialog(!showDialog);
    setProjectName(name);
  };

  // Deletes a project from the invoice
  const deleteProjectConfirmation = (
    evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    evt.preventDefault();
    console.log(projectName);
    updateInvoiceMutation.mutate({
      ...data,
      items: invoice.items.filter(
        (item: { name: string }) => item.name !== projectName
      ),
      total: calculateTotal(),
    });
    setProjectName("");
    setShowDialog(!showDialog);
  };

  const exitWithoutDeletingProject = () => {
    setShowDialog(!showDialog);
  };

  // Updates the array of projects ITEM by displaying . The obj has the following
  // Name of project, quantity, price and total.
  const addAnotherProject = (
    evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    evt.preventDefault();
    addProject();
  };

  useEffect(() => {
    // update the days when payment terms have been selected
    switch (payment) {
      case "1":
        setValue(
          "paymentDue",
          format(add(Date.now(), { days: 1 }), "yyyy-MM-dd")
        );
        break;
      case "6":
        setValue(
          "paymentDue",
          format(add(Date.now(), { days: 6 }), "yyyy-MM-dd")
        );
        break;
      case "7":
        setValue(
          "paymentDue",
          format(add(Date.now(), { days: 7 }), "yyyy-MM-dd")
        );
        break;
      case "14":
        setValue(
          "paymentDue",
          format(add(Date.now(), { days: 14 }), "yyyy-MM-dd")
        );
        break;
      default:
        setValue(
          "paymentDue",
          format(add(Date.now(), { days: 30 }), "yyyy-MM-dd")
        );
    }
    // console.log(payment);
    // console.log(invoice.paymentDue);
  }, [payment]);

  const handleSubmitForm = (data: InvoiceTypesID) => {
    const invoice = {
      ...data,
    };
    console.log(invoice);
    updateInvoiceMutation.mutate(invoice);
    setShowConfirmSave(true);
  };

  return (
    <>
      <main className="main edit-page">
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
            <CustomInput
              type="text"
              name="senderAddress.street"
              labelText="Sender street"
              control={control}
              rules={{
                required: "Street is required",
                minLength: {
                  value: 3,
                  message: "Street must be greater than 3",
                },
                maxLength: {
                  value: 40,
                  message: "Street must be less than 40",
                },
              }}
            />

            {/* SENDER CITY DETAILS */}
            <div className="grid postal-city">
              <CustomInput
                type="text"
                name="senderAddress.city"
                labelText="Sender city"
                control={control}
                rules={{
                  required: "City is required",
                  minLength: {
                    value: 3,
                    message: "City must be greater than 3",
                  },
                  maxLength: {
                    value: 40,
                    message: "City must be less than 40",
                  },
                }}
              />

              {/* SENDER POSTAL CODE DETAILS */}
              <CustomInput
                type="text"
                name="senderAddress.postCode"
                labelText="Sender postcode"
                control={control}
                rules={{
                  required: "postal code is required",
                  minLength: {
                    value: 4,
                    message: "Postal code must be greater than 4",
                  },
                  maxLength: {
                    value: 8,
                    message: "Postal code  must be less than 8",
                  },
                }}
              />

              {/* SENDER COUNTRY DETAILS */}
              <CustomInput
                type="text"
                name="senderAddress.country"
                labelText="Sender country"
                control={control}
                rules={{
                  required: "country is required",
                  minLength: { value: 4, message: "must be greater than 4" },
                  maxLength: {
                    value: 40,
                    message: "Postal code  must be less than 40",
                  },
                }}
              />
            </div>
          </fieldset>

          {/* CLIENT DETAILS */}
          <fieldset className="edit-invoice-details">
            <legend className="edit-field-title">Bill to</legend>

            {/* CLIENT NAME DETAILS */}
            <CustomInput
              type="text"
              name="clientName"
              labelText="Client name"
              control={control}
              rules={{
                required: "Client name is required",
                minLength: {
                  value: 3,
                  message: "Client name must be greater than 3",
                },
                maxLength: {
                  value: 40,
                  message: "Client name must be less than 40",
                },
              }}
            />

            {/* CLIENT EMAIL DETAILS */}
            <CustomInput
              type="email"
              name="clientEmail"
              labelText="Client email"
              control={control}
              rules={{
                required: "Email is required",
                minLength: {
                  value: 3,
                  message: "Client email must be greater than 3",
                },
                maxLength: {
                  value: 40,
                  message: "Client email must be less than 40",
                },
              }}
            />

            {/* CLIENT STREET DETAILS */}
            <CustomInput
              type="text"
              name="clientAddress.street"
              labelText="Client street"
              control={control}
              rules={{
                required: "Street is required",
                minLength: {
                  value: 3,
                  message: "Street must be greater than 3",
                },
                maxLength: {
                  value: 40,
                  message: "Street must be less than 40",
                },
              }}
            />

            <div className="grid postal-city">
              {/* CLIENT CITY DETAILS */}
              <CustomInput
                type="text"
                name="clientAddress.city"
                labelText="client city"
                control={control}
                rules={{
                  required: "City is required",
                  minLength: {
                    value: 3,
                    message: "City must be greater than 3",
                  },
                  maxLength: {
                    value: 40,
                    message: "City must be less than 40",
                  },
                }}
              />
              {/* CLIENT POSTAL DETAILS */}
              <CustomInput
                type="text"
                name="clientAddress.postCode"
                labelText="Client postal"
                control={control}
                rules={{
                  required: "postal code is required",
                  minLength: {
                    value: 4,
                    message: "Postal code must be greater than 4",
                  },
                  maxLength: {
                    value: 8,
                    message: "Postal code  must be less than 8",
                  },
                }}
              />

              {/* CLIENT COUNTRY DETAILS */}
              <CustomInput
                type="text"
                name="clientAddress.country"
                labelText="Client country"
                control={control}
                rules={{
                  required: "country is required",
                  minLength: { value: 4, message: "must be greater than 4" },
                  maxLength: {
                    value: 40,
                    message: "Postal code  must be less than 40",
                  },
                }}
              />
            </div>
          </fieldset>

          {/* INVOICE DETAILS  */}
          <fieldset className="edit-invoice-details">
            <div className="grid">
              <CustomInput
                type="date"
                name="createdAt"
                labelText="Invoice Date"
                control={control}
                rules={{
                  required: "Date is required",
                }}
              />

              {/* PAYMENT DETAILS */}
              <CustomSelect
                name="paymentTerms"
                control={control}
                rules={{ required: "Payment terms are required" }}
                options={[
                  { value: 1, label: "Net 1 Day" },
                  { value: 6, label: "Net 6 days" },
                  { value: 7, label: "Net 7 days" },
                  { value: 14, label: "Net 14 days" },
                  { value: 30, label: "Net 30 days" },
                ]}
              />
            </div>

            {/* PAYMENT DUE DETAILS */}
            <CustomInput
              type="date"
              name="paymentDue"
              labelText="Due Date"
              control={control}
              rules={{
                required: "Date is required",
              }}
            />

            {/* PROJECT NAME DETAILS */}
            <CustomInput
              type="text"
              name="description"
              labelText="Project description"
              control={control}
              rules={{
                required: "Project description is required",
                minLength: { value: 4, message: "must be greater than 4" },
                maxLength: {
                  value: 40,
                  message: "Project description  must be less than 40",
                },
              }}
            />
          </fieldset>

          <fieldset className="edit-invoice-details">
            <legend className="edit-field-title">Item list</legend>
            {invoice.items.map((item: ICosting, index: number) => (
              <div className="item-line" key={item.name}>
                {/* PROJECT NAME DETAILS */}
                <div className={`form-input-wrapper`}>
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
                  {`${errors}.items?.index.name` && (
                    <p
                      role="alert"
                      id="description-lbl"
                      className="form-errors"
                    >
                      {errors.items?.message?.toString()}
                    </p>
                  )}
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
                            evt.target.value * getValues(`items.${index}.price`)
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
                          setValue("total", calculateTotal());
                        },
                        onBlur: () => {
                          setValue("total", calculateTotal());
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
                      <img
                        src={DeleteBtn}
                        alt=""
                        aria-hidden={true}
                        width={"13px"}
                        height={"16px"}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              className="btn btn-add-item"
              disabled={!isDirty || !isValid}
              onClick={addAnotherProject}
            >
              <img
                src={AddItemImg}
                alt=""
                aria-hidden={true}
                width={"11px"}
                height={"11px"}
              />
              Add new Item
            </button>
          </fieldset>

          <div className="footer flex">
            <div className="flex footer-edit">
              <button className="btn btn-cancel" onClick={() => navigate(-1)}>
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
        showDialog={showDialog}
        exitWithoutDeletingProject={exitWithoutDeletingProject}
        deleteProjectConfirmation={deleteProjectConfirmation}
        name={projectName}
      />
      <SaveEditedPageDialog showConfirmSave={showConfirmSave} />
    </>
  );
}

export default EditInvoice;
