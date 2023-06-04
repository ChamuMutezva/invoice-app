import React, { MouseEventHandler, useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import add from "date-fns/add";
import format from "date-fns/format";
import BackImg from "../assets/icon-arrow-left.svg";
import { randomId } from "../hooks/useRandomID";
import createInvoice from "../hooks/useCreateInvoice";
import DeleteBtn from "../assets/icon-delete.svg";
import AddItemImg from "../assets/icon-plus.svg";
import { reducer } from "../hooks/useReducer";
import CreateInvoiceDialog from "../components/CreateInvoiceDialog";
import { ICosting, InvoiceTypes } from "../Types/DataTypes";
import CustomInput from "../components/CustomInput";
import CustomSelect from "../components/CustomSelect";
import dueDays from "../utilities/selectPaymentDue";

const NewInvoice = (props: {
	toggleOverlay: MouseEventHandler<HTMLButtonElement>;
	childInputRef: any;
}) => {
	const projectInit: ICosting = {
		name: "Project Name",
		quantity: 1,
		price: 100.0,
		total: 100.0,
	};

	const navigate = useNavigate();
	const [createInvoiceError, setCreateInvoiceError] = useState(null);
	const { mutate } = createInvoice(setCreateInvoiceError);	
	const [project, setProject] = useState(projectInit);
	const [showCreateInvoiceDialog, setShowCreateInvoiceDialog] =
		useState(false);

	// load initial form data on first visit to site
	// format(new Date(invoice.createdAt), "yyyy-MM-dd"), new Date().toJSON().slice(0, 10),
	const initialState: InvoiceTypes = {
		id: randomId(),
		createdAt: format(new Date(), "yyyy-MM-dd"),
		paymentDue: format(add(Date.now(), { days: 1 }), "yyyy-MM-dd"),
		description: "",
		paymentTerms: 1,
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

	function closeDialog() {
		return navigate(0);
	}

	// Updates The obj which has the following
	// Name of project, quantity, price and total.
	const updateProjects = (
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
	//console.log(errors);
	const { fields, append, remove } = useFieldArray({
		control,
		name: "items",
	});

	const handleSubmitForm = (data: any) => {
		setData({
			...data,
			total: calculateTotal(),
		});

		console.log(data);
		mutate(data);
		props.toggleOverlay;
		setShowCreateInvoiceDialog(true);
	};

	function calculateTotal(): number {
		const totalArray = watchTotal[0].map(
			(item: { total: number }) => item.total
		);

		const total: number =
			totalArray.length > 0 ? totalArray.reduce(reducer) : 0;
		setValue("total", totalArray.length > 0 ? total : 0);
		console.log(totalArray);

		return total;
	}

	const watchTotal = watch(["items", "total"]);
	const payment = watch("paymentTerms");
	//console.log(watchTotal);

	// Focus trap implementation inspired by Tediko from his solution - see link below
	// https://www.frontendmentor.io/solutions/invoice-app-reactjs-styledcomponents-framer-motion-webpack-WVGeS4ShF
	const focusTrap = (event: {
		key: string;
		shiftKey: any;
		preventDefault: () => void;
	}) => {
		if (event.key === "Escape") closeDialog();
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
		calculateTotal();
		setValue("total", calculateTotal());
	}, [watchTotal[0]]);

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
		// update the days when payment terms have been selected
		dueDays(payment, setValue);
		// console.log(payment);
	}, [payment]);

	useEffect(() => {
		console.log(
			`Is the create invoice dialog open: ${showCreateInvoiceDialog}`
		);
		if (showCreateInvoiceDialog) {
			document.body.classList.add("body-size");
		}
		return () => {
			document.body.classList.remove("body-size");
		};
	}, [showCreateInvoiceDialog]);

	if (createInvoiceError) {
		return <h2>Error encountered: invoice could not be created</h2>;
	}

	return (
		<>
			<main className="main">
				{/* <PreviousPage title={`Create new invoice`}  /> */}
				<div className="tablet-hidden">
					<button
						className="btn flex btn-return"
						onClick={props.toggleOverlay}
					>
						<img
							src={BackImg}
							alt=""
							aria-hidden={true}
							width={"7"}
							height={"10"}
						/>
						Go back
					</button>
				</div>
				<Form
					tabIndex={-1}
					method="post"
					className="edit-form"
					ref={props.childInputRef}
					onSubmit={handleSubmit(handleSubmitForm)}
				>
					<h2 className="edit-title">New invoice</h2>
					{/* SENDER DETAILS */}
					<fieldset className="edit-invoice-details">
						<legend className="edit-field-title">Bill From</legend>
						{/* SENDER STREET DETAILS */}
						<CustomInput
							type="text"
							name="senderAddress.street"
							labelText="Street address"
							control={control}
							className=""
							disabled={false}
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
								labelText="City"
								control={control}
								className=""
								disabled={false}
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
								labelText="Post code"
								control={control}
								className=""
								disabled={false}
								rules={{
									required: "postal code is required",
									minLength: {
										value: 4,
										message:
											"Postal code must be greater than 4",
									},
									maxLength: {
										value: 8,
										message:
											"Postal code  must be less than 8",
									},
								}}
							/>

							{/* SENDER COUNTRY DETAILS */}
							<CustomInput
								type="text"
								name="senderAddress.country"
								labelText="Country"
								control={control}
								className=""
								disabled={false}
								rules={{
									required: "country is required",
									minLength: {
										value: 4,
										message:
											"Country must be greater than 4",
									},
									maxLength: {
										value: 40,
										message: "Country must be less than 40",
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
							className=""
							disabled={false}
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
							className=""
							disabled={false}
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
							className=""
							disabled={false}
							rules={{
								required: "Client Street is required",
								minLength: {
									value: 3,
									message:
										"Client Street must be greater than 3",
								},
								maxLength: {
									value: 40,
									message:
										"Client Street must be less than 40",
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
								className=""
								disabled={false}
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
								className=""
								disabled={false}
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
								className=""
								disabled={false}
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
								className=""
								disabled={false}
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
						<div className="sr-only">
							<CustomInput
								type="date"
								name="paymentDue"
								labelText="Due Date"
								control={control}
								className=""
								disabled={true}
								rules={{
									required: "Date is required",
								}}
							/>
						</div>
						{/* PROJECT NAME DETAILS */}
						<CustomInput
							type="text"
							name="description"
							labelText="Project description"
							control={control}
							className=""
							disabled={false}
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
						{data.items.length <= 0 ? (
							<p>They is no projects yet to display</p>
						) : (
							fields.map((field, index) => (
								<div
									className="item-line"
									key={field.id}
								>
									{/* PROJECT NAME DETAILS */}
									<CustomInput
										name={`items.${index}.name`}
										control={control}
										labelText={"Project Name"}
										type={"text"}
										className=""
										disabled={false}
										rules={{
											required:
												"Project name is required",
											minLength: {
												value: 4,
												message:
													"Project name must be greater than 4",
											},
											maxLength: {
												value: 40,
												message:
													"Project name  must be less than 40",
											},
										}}
									/>

									{/* QUANTITY DETAILS */}
									<div className={`costing-line`}>
										<div className="quantity-line calculate-line-container">
											<CustomInput
												name={`items.${index}.quantity`}
												control={control}
												labelText={"Qty"}
												type={"number"}
												className={`qty input calculate-line`}
												disabled={false}
												rules={{
													required:
														"Quantity is required",
													step: 1,
													min: {
														value: 1,
														message:
															"Quantity must be greater than 0",
													},
													max: {
														value: 1000,
														message:
															"Quantity must be less than 1000",
													},
													onChange: (evt: {
														target: {
															value: number;
														};
													}) => {
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
												}}
											/>
										</div>

										{/* PRICE DETAILS */}
										<div
											className={`price-line calculate-line-container`}
										>
											<CustomInput
												name={`items.${index}.price`}
												control={control}
												labelText={"Price"}
												type={"number"}
												className={
													"price calculate-line"
												}
												disabled={false}
												rules={{
													required:
														"Price is required",
													step: 1,
													min: {
														value: 1,
														message:
															"Price must be greater than 0",
													},
													max: {
														value: 1000000,
														message:
															"Price must be less than 1000000",
													},
													onChange: (evt: {
														target: {
															value: number;
														};
													}) => {
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
												}}
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
							))
						)}

						{/* PROJECT TOTAL DETAILS */}
						<div
							className={`sr-only item-total-line calculate-line-container`}
						>
							<label
								className="label"
								htmlFor={`grand-total`}
							>
								Grand Total
							</label>

							<input
								type="text"
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
							type="button"
							className="btn btn-add-item"
							disabled={!isDirty || !isValid}
							onClick={() => [
								append(projectInit),
								calculateTotal(),
								updateProjects,
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
								Discard
								<span className="sr-only">
									and return to homepage
								</span>
							</button>
							<button
								className="btn btn-save"
								type="submit"
							>
								Save as draft
							</button>
							<button
								className="btn btn-save"
								type="submit"
							>
								Save & send
							</button>
						</div>
					</div>
				</Form>
			</main>
			<CreateInvoiceDialog
				showCreateInvoiceDialog={showCreateInvoiceDialog}
				closeDialog={closeDialog}
			/>
		</>
	);
};

export default NewInvoice;
