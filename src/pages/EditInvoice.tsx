import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import add from "date-fns/add";
import format from "date-fns/format";
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

function EditInvoice(props: {
	childInputRef: any; // Ref<HTMLFormElement> | undefined;
	toggleOverlay: MouseEventHandler<HTMLButtonElement>;
}) {
	const projectInit: ICosting = {
		name: "",
		quantity: 0,
		price: 0.0,
		total: 0.0,
	};

	const queryClient = useQueryClient();
	const [showConfirmSave, setShowConfirmSave] = useState(false);
	const [project, setProject] = useState(projectInit);
	const params = useParams();

	// Fetch an invoice
	const { data } = useGetSingleInvoice(params.id);
	const invoice = data;

	// load initial form data on first visit to site
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
	const { fields, append, remove } = useFieldArray({
		control,
		name: "items",
	});

	// watch for changes , changes for items to be used to calculate the grandtotal
	const watchTotal = watch(["items", "total"]);
	const payment = watch("paymentTerms");
	console.log(watchTotal);
	// When a new project has been added or a project has been deleted
	// the grandtotal should be recalculated
	function calculateTotal(): number {
		const totalArray = watchTotal[0].map(
			(item: { total: any }) => item.total
		);
		console.log(totalArray);
		const total: number =
			totalArray.length > 0 ? totalArray.reduce(reducer) : 0;
		setValue("total", total);
		// console.log(total);
		return total;
	}

	const addProject = () => {
		updateInvoiceMutation.mutate({
			...invoice,
			items: invoice.items.concat(project),
			total: calculateTotal(),
		});
	};

	// Updates the array of projects ITEM by displaying . The obj has the following
	// Name of project, quantity, price and total.
	const addAnotherProject = () => addProject();

	// Focus trap implementation inspired by Tediko from his solution - see link below
	// https://www.frontendmentor.io/solutions/invoice-app-reactjs-styledcomponents-framer-motion-webpack-WVGeS4ShF
	const focusTrap = (event: {
		key: string;
		shiftKey: any;
		preventDefault: () => void;
	}) => {
		if (event.key === "Escape") return props.toggleOverlay;
		if (event.key !== "Tab") return;

		const formElements =
			props.childInputRef.current.querySelectorAll("button, a, input");
		const firstElement = formElements[0];
		const lastElement = formElements[formElements.length - 1];

		// if going forward by pressing tab and lastElement is active shift focus to first focusable element
		if (!event.shiftKey && document.activeElement === lastElement) {
			event.preventDefault();
			firstElement.focus();
		}

		// if going backward by pressing tab and firstElement is active shift focus to last focusable element
		if (event.shiftKey && document.activeElement === firstElement) {
			event.preventDefault();
			lastElement.focus();
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", focusTrap);
		document.addEventListener("click", () => props.toggleOverlay);
		props.childInputRef.current.focus();
		// Removing the event listener in the return function in order to avoid memory leaks.
		return () => {
			document.removeEventListener("keydown", focusTrap);
			document.removeEventListener("click", () => props.toggleOverlay);
		};
	}, []);

	useEffect(() => {
		calculateTotal();
		setValue("total", calculateTotal());
	}, [watchTotal[0]]);

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
	}, [payment]);

	const handleSubmitForm = (data: InvoiceTypesID) => {
		const invoice = {
			...data,
		};
		calculateTotal();
		console.log(invoice);
		updateInvoiceMutation.mutate(invoice);
		setShowConfirmSave(true);
		return props.toggleOverlay;
	};

	return (
		<>
			<main
				id="edit-page"
				className="main edit-page"
				role="dialog"
				aria-modal="true"
			>
				<Form
					tabIndex={-1}
					method="post"
					className="edit-form"
					ref={props.childInputRef}
					onSubmit={handleSubmit(handleSubmitForm)}
				>
					<h2 className="edit-title">
						Edit
						<span className="invoice-num invoice-num-edit">
							{invoice.id}
						</span>
					</h2>

					{/* SENDER DETAILS */}
					<fieldset className="edit-invoice-details">
						<legend className="edit-field-title">Bill From</legend>

						{/* SENDER STREET DETAILS */}
						<CustomInput
							type="text"
							name="senderAddress.street"
							labelText="Street"
							control={control}
							rules={{
								required: "Sender street is required",
								minLength: {
									value: 3,
									message:
										"Sender street must be greater than 3",
								},
								maxLength: {
									value: 40,
									message:
										"Sender street must be less than 40",
								},
							}}
						/>

						{/* SENDER CITY DETAILS */}
						<div className="grid postal-city">
							<CustomInput
								type="text"
								name="senderAddress.city"
								labelText="City"
								control={control}
								rules={{
									required: "Sender city is required",
									minLength: {
										value: 3,
										message:
											"Sender city must be greater than 3",
									},
									maxLength: {
										value: 40,
										message:
											"Sender city must be less than 40",
									},
								}}
							/>

							{/* SENDER POSTAL CODE DETAILS */}
							<CustomInput
								type="text"
								name="senderAddress.postCode"
								labelText="Post Code"
								control={control}
								rules={{
									required: "Sender post code is required",
									minLength: {
										value: 4,
										message:
											"Sender post code must be greater than 4",
									},
									maxLength: {
										value: 8,
										message:
											"Sender post code  must be less than 8",
									},
								}}
							/>

							{/* SENDER COUNTRY DETAILS */}
							<CustomInput
								type="text"
								name="senderAddress.country"
								labelText="Country"
								control={control}
								rules={{
									required: "Sender country is required",
									minLength: {
										value: 4,
										message:
											"Sender country must be greater than 4",
									},
									maxLength: {
										value: 40,
										message:
											"Sender country must be less than 40",
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
							labelText="Client's name"
							control={control}
							rules={{
								required: "Client name is required",
								minLength: {
									value: 3,
									message:
										"Client name must be greater than 3",
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
							labelText="Client's email"
							control={control}
							rules={{
								required: "Email is required",
								minLength: {
									value: 3,
									message:
										"Client email must be greater than 3",
								},
								maxLength: {
									value: 40,
									message:
										"Client email must be less than 40",
								},
							}}
						/>

						{/* CLIENT STREET DETAILS */}
						<CustomInput
							type="text"
							name="clientAddress.street"
							labelText="Street"
							control={control}
							rules={{
								required: "Client street is required",
								minLength: {
									value: 3,
									message:
										"Client street must be greater than 3",
								},
								maxLength: {
									value: 40,
									message:
										"Client street must be less than 40",
								},
							}}
						/>

						<div className="grid postal-city">
							{/* CLIENT CITY DETAILS */}
							<CustomInput
								type="text"
								name="clientAddress.city"
								labelText="City"
								control={control}
								rules={{
									required: "Client city is required",
									minLength: {
										value: 3,
										message:
											"Client city must be greater than 3",
									},
									maxLength: {
										value: 40,
										message:
											"Client city must be less than 40",
									},
								}}
							/>

							{/* CLIENT POSTAL DETAILS */}
							<CustomInput
								type="text"
								name="clientAddress.postCode"
								labelText="Post code"
								control={control}
								rules={{
									required: "Client postal code is required",
									minLength: {
										value: 4,
										message:
											"Client postal code must be greater than 4",
									},
									maxLength: {
										value: 8,
										message:
											"Client postal code  must be less than 8",
									},
								}}
							/>

							{/* CLIENT COUNTRY DETAILS */}
							<CustomInput
								type="text"
								name="clientAddress.country"
								labelText="Country"
								control={control}
								rules={{
									required: "Client country is required",
									minLength: {
										value: 4,
										message:
											"Client country must be greater than 4",
									},
									maxLength: {
										value: 40,
										message:
											"Client country must be less than 40",
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
								rules={{
									required: "Payment terms are required",
								}}
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
								minLength: {
									value: 4,
									message: "must be greater than 4",
								},
								maxLength: {
									value: 40,
									message:
										"Project description  must be less than 40",
								},
							}}
						/>
					</fieldset>

					<fieldset className="edit-invoice-details">
						<legend className="edit-field-title">Item list</legend>

						{fields.map((field, index: number) => (
							<div
								className="item-line"
								key={field.id}
							>
								{/* PROJECT NAME DETAILS */}
								<div className={`form-input-wrapper`}>
									<label
										className="label"
										htmlFor={`project-name`}
									>
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
									{`errors.${field.name}` && (
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
										<label
											className="label"
											htmlFor={`qty-line`}
										>
											Qty
										</label>
										<input
											type="number"
											id={`qty`}
											step={1}
											className={`qty input calculate-line`}
											placeholder={"1"}
											{...register(
												`items.${index}.quantity`,
												{
													required: true,
													min: 1,
													onChange: (evt) => {
														setValue(
															`items.${index}.total`,
															evt.target.value *
																getValues(
																	`items.${index}.price`
																)
														);
														setProject({
															...project,
															quantity:
																evt.target
																	.value,
															total:
																evt.target
																	.value *
																getValues(
																	`items.${index}.price`
																),
														});
														calculateTotal();
													},
												}
											)}
										/>
									</div>

									{/* PRICE DETAILS */}
									<div
										className={`price-line calculate-line-container`}
									>
										<label
											className="label"
											htmlFor={`price`}
										>
											Price
										</label>
										<input
											type="number"
											step={1.00}
											id={`price`}
											className={`price input calculate-line`}
											placeholder={"200.00"}
											{...register(
												`items.${index}.price`, 
												{
													valueAsNumber: true,
													required: true,
													min: 1,													
													onChange: (evt) => {
														setValue(
															`items.${index}.total`,
															evt.target.value *
																getValues(
																	`items.${index}.quantity`
																)
														);
														setProject({
															...project,
															price: evt.target
																.value,
															total:
																evt.target
																	.value *
																getValues(
																	`items.${index}.quantity`
																),
														});
														calculateTotal();
													},
												}
											)}
										/>
									</div>

									{/* PROJECT TOTAL DETAILS */}
									<div
										className={`item-total-line calculate-line-container`}
									>
										<label
											className="label"
											htmlFor={`item-total`}
										>
											Total
										</label>
										<input
											type="number"
											id={`item-total`}
											className={`item-total input calculate-line`}
											placeholder={"200.00"}
											readOnly={true}
											{...register(
												`items.${index}.total`,
												{
													required: true,
												}
											)}
										/>
									</div>

									{/* DELETE PROJECT */}
									<div className="container-delete calculate-line-container">
										<button
											className="btn btn-delete calculate-line"
											aria-label="delete product"
											type="button"
											onClick={() => [
												calculateTotal(),
												remove(index),
											]}
										>
											<img
												src={DeleteBtn}
												alt=""
												aria-hidden={true}
												width={"13"}
												height={"16"}
											/>
										</button>
									</div>
								</div>
							</div>
						))}

						<div className="sr-only grand-total-wrapper">
							<label
								htmlFor="grand-total"
								className="label"
							>
								The grand total is
								<input
									type="number"
									{...register("total")}
								/>
							</label>
						</div>

						<button
							type="button"
							className="btn btn-add-item"
							disabled={!isDirty || !isValid}
							onClick={() => [
								append(projectInit),
								calculateTotal(),
								addAnotherProject,
							]}
						>
							<img
								src={AddItemImg}
								alt=""
								aria-hidden={true}
								width={"11"}
								height={"11"}
							/>
							Add new Item
						</button>
					</fieldset>

					<div className="footer flex">
						<div className="flex footer-edit">
							<button
								className="btn btn-cancel"
								onClick={props.toggleOverlay}
							>
								Cancel
							</button>
							<button
								className="btn btn-save"
								type="submit"
							>
								Save changes
							</button>
						</div>
					</div>
				</Form>
			</main>

			<SaveEditedPageDialog showConfirmSave={showConfirmSave} />
		</>
	);
}

export default EditInvoice;
