import React, { useState, useRef } from "react";
import { Link, Form } from "react-router-dom";
import format from "date-fns/format";
import { currencyFormatter } from "../hooks/useFormatter";
import AddInvoiceImg from "../assets/icon-plus.svg";
import EmptyInvoiceImg from "../assets/illustration-empty.svg";
import getInvoices from "../hooks/useGetInvoices";
import OverLay from "./OverLay";
import NewInvoice from "./NewInvoice";

function HomePage() {
	const [selectedValue, setSelectedValue] = useState("all");
	const [isNewInvoiceOverlayOpen, setIsNewInvoiceOverlayOpen] =
		useState(false);
	let { isLoading, isError, invoices } = getInvoices(selectedValue);
	const childInputRef = useRef<HTMLInputElement>(null);

	if (isLoading) {
		return (
			<div className="flex loading">
				<h2 className="pre-loading">Loading...</h2>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex loading">
				<h2 className="pre-loading">Error: </h2>
			</div>
		);
	}

	function toggleOverlay() {
		console.log(isNewInvoiceOverlayOpen);
		setIsNewInvoiceOverlayOpen(!isNewInvoiceOverlayOpen);
    if (isNewInvoiceOverlayOpen) {
			childInputRef.current && childInputRef.current.focus();
		}
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
							<Form className="select-options">
								<label
									className="filter-label"
									htmlFor="filter-options"
								>
									Filter
								</label>
								<select
									name="choice"
									className="filter"
									id="filter-options"
									value={selectedValue}
									onChange={(evt) => onChange(evt)}
								>
									<option value="all">All</option>
									<option value="paid">Paid</option>
									<option value="pending">Pending</option>
									<option value="draft">Draft</option>
								</select>
							</Form>

							<div>
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
			{isNewInvoiceOverlayOpen && (
				<OverLay
					isOverlayOpen={isNewInvoiceOverlayOpen}
					toggleOverlay={toggleOverlay}
				>
					<NewInvoice
						toggleOverlay={toggleOverlay}
						childInputRef={childInputRef}
					/>
				</OverLay>
			)}
		</>
	);
}

export default HomePage;
