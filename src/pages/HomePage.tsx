import React, { useState, useRef, useEffect } from "react";
import { Link, Form } from "react-router-dom";
import format from "date-fns/format";
import { currencyFormatter } from "../hooks/useFormatter";
import AddInvoiceImg from "../assets/icon-plus.svg";
import EmptyInvoiceImg from "../assets/illustration-empty.svg";
import getInvoices from "../hooks/useGetInvoices";
import OverLay from "./OverLay";
import NewInvoice from "./NewInvoice";
import { Oval, Comment } from "react-loader-spinner";
import axios from "axios";

function HomePage() {
	const [selectedValue, setSelectedValue] = useState("all");
	const [isNewInvoiceOverlayOpen, setIsNewInvoiceOverlayOpen] =
		useState(false);
	let { isLoading, isError, invoices, error } = getInvoices(selectedValue);
	const childInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isNewInvoiceOverlayOpen) {
			childInputRef.current && childInputRef.current.focus();
		}
		console.log(
			`new invoice and overlay opened: ${isNewInvoiceOverlayOpen}`
		);
	}, [isNewInvoiceOverlayOpen]);

	if (isLoading) {
		return (
			<div className="flex loading">
				<h2 className="pre-loading">Loading...</h2>
				<Oval
					height={80}
					width={80}
					color="#4fa94d"
					wrapperStyle={{}}
					wrapperClass=""
					visible={true}
					ariaLabel="oval-loading"
					secondaryColor="#4fa94d"
					strokeWidth={2}
					strokeWidthSecondary={2}
				/>
			</div>
		);
	}

	if (isError) {
		let errorMessage = "";
		if (axios.isAxiosError(error)) {
			errorMessage = error.message;
		}
		return (
			<div className="flex loading">
				<h2 className="pre-loading">Error: {errorMessage} </h2>
				<Comment
					visible={true}
					height="80"
					width="80"
					ariaLabel="comment-loading"
					wrapperStyle={{}}
					wrapperClass="comment-wrapper"
					color="#fff"
					backgroundColor="#F4442E"
				/>
			</div>
		);
	}

	function toggleOverlay() {
		console.log(
			`new invoice and overlay opened: ${isNewInvoiceOverlayOpen}`
		);
		setIsNewInvoiceOverlayOpen(!isNewInvoiceOverlayOpen);
	}

	const noInvoices = () => {
		return (
			<div className="no-cards">
				<div className="container-img">
					<img
						src={EmptyInvoiceImg}
						alt="no invoices to display"
						width={"242"}
						height={"200"}
					/>
				</div>
				<h2>There is nothing here</h2>
				<p>
					Create an invoice by clicking the New button and get started
				</p>
			</div>
		);
	};

	// the onchange triggers the backend to apply filters through the dependency used in
	// the queryKey of the useGetInvoices hook. High five to React Query
	const onChange = (evt: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setSelectedValue(evt.target.value);
	};

	const getStatus = (status: string) => {
		if (status === "paid") {
			return "paid-status";
		} else if (status === "draft") {
			return "draft-status";
		} else {
			return "pending-status";
		}
	};

	const setMessageLength = (length: number) => {
		if (length === 0) {
			return "No invoices";
		} else if (length === 1) {
			return (
				<>
					{" "}
					<span className="mobile-hidden">There is</span>
					{length} invoice
				</>
			);
		} else {
			return (
				<>
					{" "}
					<span className="mobile-hidden">There are</span> {length}{" "}
					<span className="mobile-hidden"> total </span> invoices{" "}
				</>
			);
		}
	};

	return (
		<>
			<main className="main">
				<h1 className="sr-only">
					Preprince investments business transactions
				</h1>

				<div className="invoices-list">
					<div className="flex summary">
						<div className="summary-headings">
							<h2 className="summary-title">Invoices</h2>
							<p
								className="invoice-total-num"
								aria-live="polite"
							>
								{setMessageLength(invoices.length)}
							</p>
						</div>

						<div className="flex filter-new">
							<Form
								className="select-options"
								id="filter-status"
							>
								<label
									className="filter-label"
									htmlFor="filter-options"
								>
									Filter
								</label>
								<div className="select-wrapper select-wrapper-home">
									<select
										name="choice"
										className="filter filter-home"
										id="filter-options"
										value={selectedValue}
										onChange={(evt) => onChange(evt)}
									>
										<option value="all">All</option>
										<option value="paid">Paid</option>
										<option value="pending">Pending</option>
										<option value="draft">Draft</option>
									</select>
								</div>
							</Form>

							<div className="btn-new-invoice-wrapper">
								<button
									onClick={toggleOverlay}
									className="btn flex btn-new-invoice"
								>
									<span className="container-img">
										<img
											className="new-invoice-img"
											src={AddInvoiceImg}
											alt=""
											aria-hidden={true}
											width={"11"}
											height={"11"}
										/>
									</span>
									<span className="flex btn-label">
										New{" "}
										<span className="mobile-hidden">
											Invoice
										</span>
									</span>
								</button>
							</div>
						</div>
					</div>
					{/* main section */}
					{invoices.length === 0 ? (
						noInvoices()
					) : (
						<div className="cards">
							{invoices.map(
								(invoice: {
									_id: any;
									status: string;
									total: number;
									paymentDue: Date;
									id: React.Key;
									clientName: string;
								}) => {
									return (
										<div
											key={invoice.id}
											className="card"
										>
											<p className="invoice-num">
												<span className="sr-only">
													invoice number
												</span>
												{invoice.id}
											</p>

											<Link
												className={`client-name btn btn-link`}
												to={`/viewInvoice/${invoice._id}`}
											>
												<span className="sr-only">
													Invoice for
												</span>{" "}
												{invoice.clientName}
											</Link>

											<p className="payment-date">
												Due{" "}
												<span className="sr-only">
													date
												</span>{" "}
												{format(
													new Date(
														invoice.paymentDue
													),
													"yyyy/MM/dd"
												)}
											</p>

											<p className="amount-total">
												<span className="sr-only">
													total amount to be paid
												</span>
												{currencyFormatter.format(
													invoice.total
												)}
											</p>

											<p
												className={`flex status ${getStatus(
													invoice.status
												)}
                         `}
											>
												<span
													aria-hidden={true}
													className={`status-span ${invoice.status}-span`}
												></span>
												<span className="sr-only">
													invoice status
												</span>
												{invoice.status}
											</p>
										</div>
									);
								}
							)}
						</div>
					)}
				</div>
			</main>
			{isNewInvoiceOverlayOpen === true ? (
				<OverLay
					isOverlayOpen={isNewInvoiceOverlayOpen}
					toggleOverlay={toggleOverlay}
				>
					<NewInvoice
						toggleOverlay={toggleOverlay}
						childInputRef={childInputRef}
					/>
				</OverLay>
			) : null}
		</>
	);
}

export default HomePage;
