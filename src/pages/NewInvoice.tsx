import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { useForm } from "react-hook-form";
import add from "date-fns/add";
import format from "date-fns/format";
// import PreviousPage from "../components/PreviousPage";
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

const NewInvoice = (props: {
	toggleOverlay: React.MouseEventHandler<HTMLButtonElement>;
	childInputRef: any;
}) => {
	const projectInit: ICosting = {
		name: "Project Name",
		quantity: 1,
		price: 100.0,
		total: 100.0,
	};

	// const navigate = useNavigate(); // () => navigate(-1)
	const [createInvoiceError, setCreateInvoiceError] = useState(null);
	const { mutate, isError, isSuccess } = createInvoice(setCreateInvoiceError);
	const [deleteProjectModal, setDeleteProjectModal] = useState(false);
	const [project, setProject] = useState(projectInit);
	const [showDialog, setShowDialog] = useState(false);

	// load initial form data on first visit to site
	// format(new Date(invoice.createdAt), "yyyy-MM-dd"), new Date().toJSON().slice(0, 10),
	const initialState: InvoiceTypes = {
		id: randomId(),
		createdAt: format(new Date(), "yyyy-MM-dd"),
		paymentDue: format(add(Date.now(), { days: 1 }), "yyyy-MM-dd"),
		description: "",
		paymentTerms: "Net 1 days",
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

	const closeDialog = () => [
		(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
			props.toggleOverlay(e),
		setShowDialog(false),
	];

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

	const handleSubmitForm = (data: any) => {
		setData({
			...data,
			total: calculateTotal(),
		});
		setShowDialog(() => true);		
		console.log(data);
		 mutate(data);
	};

	function calculateTotal(): number {
		const totalArray = watchTotal[0].map(
			(item: { total: any }) => item.total
		);
		setValue(
			"total",
			totalArray.length > 0 ? totalArray.reduce(reducer) : 0
		);
		// console.log(watchTotal[0]);
		const total = totalArray.length > 0 ? totalArray.reduce(reducer) : 0;
		return total.toFixed(2);
	}

	const watchTotal = watch(["items", "total"]);
	const payment = watch("paymentTerms");
	//console.log(watchTotal);

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
		console.log(payment);
	}, [payment]);

	useEffect(() => {
		if (showDialog) {
			document.body.classList.add("body-size");
		}
		return () => {
			document.body.classList.remove("body-size");
		};
	});

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
						{data.items.length <= 0 ? (
							<p>They is no projects yet to display</p>
						) : (
							data.items.map((item, index) => (
								<div
									className="item-line"
									key={item.name}
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
											{...register(
												`items.${index}.name`,
												{
													required: true,
													minLength: {
														value: 4,
														message:
															"Must be longer than 4",
													},
													onChange(evt) {
														setProject({
															...project,
															name: evt.target
																.value,
														});
													},
												}
											)}
										/>
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
											{watchTotal && (
												<input
													type="number"
													id={`qty`}
													className={`qty input calculate-line`}
													placeholder={"1"}
													{...register(
														`items.${index}.quantity`,
														{
															required: true,
															onChange: (evt) => {
																setValue(
																	`items.${index}.total`,
																	evt.target
																		.value *
																		getValues(
																			`items.${index}.price`
																		)
																);
																setProject({
																	...project,
																	quantity:
																		evt
																			.target
																			.value,
																	total:
																		evt
																			.target
																			.value *
																		getValues(
																			`items.${index}.price`
																		),
																});
																setValue(
																	"total",
																	calculateTotal()
																);
															},
															onBlur: () => {
																setValue(
																	"total",
																	calculateTotal()
																);
															},
														}
													)}
												/>
											)}
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
											{watchTotal && (
												<input
													type="number"
													step={0.01}
													id={`price`}
													className={`price input calculate-line`}
													placeholder={"200.00"}
													{...register(
														`items.${index}.price`,
														{
															required: true,
															onChange: (evt) => {
																setValue(
																	`items.${index}.total`,
																	evt.target
																		.value *
																		getValues(
																			`items.${index}.quantity`
																		)
																);
																setProject({
																	...project,
																	price: evt
																		.target
																		.value,
																	total:
																		evt
																			.target
																			.value *
																		getValues(
																			`items.${index}.quantity`
																		),
																});
																setValue(
																	"total",
																	calculateTotal()
																);
															},
															onBlur: () => {
																setValue(
																	"total",
																	calculateTotal()
																);
															},
														}
													)}
												/>
											)}
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
												onClick={(evt) =>
													deleteProjectDialog(
														evt,
														data.items[index].name
													)
												}
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
				showDialog={showDialog}
				closeDialog={closeDialog}
			/>
		</>
	);
};

export default NewInvoice;
