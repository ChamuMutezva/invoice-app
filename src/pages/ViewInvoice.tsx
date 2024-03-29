import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState, useContext } from "react";
import format from "date-fns/format";
import { currencyFormatter } from "../hooks/useFormatter";
import PreviousPage from "../components/PreviousPage";
import { reducer } from "../hooks/useReducer";
import { useUpdateInvoice } from "../hooks/useUpdateInvoice";
import { useDeleteInvoice } from "../hooks/useDeleteInvoice";
import { useGetSingleInvoice } from "../hooks/useFetchInvoice";
import DeleteInvoiceDialog from "../components/DeleteInvoiceDialog";
import { OverLayContext } from "../context/OverlayContext";
import OverLay from "./OverLay";
import EditInvoice from "./EditInvoice";
import { Oval, Comment } from "react-loader-spinner";
import axios from "axios";

function ViewInvoice() {
	let params = useParams();
	const [deletionError, setDeletionError] = useState(null);
	const [updateError, setUpdateError] = useState(null);
	const [showDeleteInvoiceDialog, setShowDeleteInvoiceDialog] =
		useState(false);
	const { mutate } = useDeleteInvoice(setDeletionError);
	const { mutate: mutateUpdate } = useUpdateInvoice(setUpdateError);
	const { data, isError, error, isLoading } = useGetSingleInvoice(params.id);
	const childInputRef = useRef<HTMLInputElement>(null);
	const { overlayControl, onChangeOverlay } = useContext(OverLayContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (overlayControl) {
			childInputRef.current && childInputRef.current.focus();
		}
	}, [overlayControl]);

	function toggleOverlay() {
		onChangeOverlay(overlayControl);
	}

	const handleDeleteInvoice = () => {
		setShowDeleteInvoiceDialog(true);
	};

	const cancelDelete = () => {
		setShowDeleteInvoiceDialog(false);
	};

	const confirmDelete = () => {
		mutate(data._id);
		setShowDeleteInvoiceDialog(false);
		navigate("/invoicespage");
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

	if (deletionError) {
		return <h2>Error encountered, invoice cannot be deleted</h2>;
	}

	if (updateError) {
		return <h2>Error: The update has failed</h2>;
	}

	const totalArray = data.items.map((item: { total: number }) => item.total);
	const grandTotal = totalArray.length > 0 ? totalArray.reduce(reducer) : 0;

	function handleChangeStatus() {
		if (data.status !== "paid") {
			mutateUpdate({
				...data,
				status: "paid",
			});
		}
		navigate("/invoicespage");
	}

	return (
		<>
			<div className="wrapper">
				<main
					className="main"
					aria-live="polite"
				>
					<PreviousPage
						title={`Complete invoice details of ${data.clientName}`}
						page={`invoices list page`}
					/>

					<div className="main-container">
						<nav className="flex nav-view">
							{/* STATUS PANEL */}
							<div className="flex status-container">
								<p className="status-label">Status </p>
								<p
									className={`flex status ${getStatus(
										data.status
									)} `}
								>
									<span
										aria-hidden={true}
										className={`status-span ${data.status}-span`}
									></span>
									{data.status}
								</p>
							</div>

							{/* BUTTON CONTROLS */}
							<div className="mobile-hidden nav-view-btns ">
								{data.status !== "paid" && (
									<button
										className="btn btn-edit"
										onClick={toggleOverlay}
									>
										Edit
									</button>
								)}

								<button
									className="btn btn-delete-view"
									onClick={handleDeleteInvoice}
								>
									Delete
								</button>

								{data.status !== "paid" && (
									<button
										className="btn btn-mark"
										onClick={handleChangeStatus}
									>
										Mark as paid
									</button>
								)}
							</div>
						</nav>
						<section className="container container-invoice">
							<div className="invoice-details">
								<h2 className="sr-only">
									Invoice client details
								</h2>

								{/* Invoice intro */}
								<div className="intro">
									<p className="invoice-num">
										<span className="sr-only">
											Invoice number
										</span>{" "}
										<span className="invoice-num">
											{data.id}
										</span>
									</p>
									<p className="invoice-descr">
										<span className="sr-only">item</span>
										{data.description}
									</p>
								</div>

								{/* sender details */}
								<div className="address-sender">
									<h3 className="sr-only">Bill from</h3>
									<div className="address-sender-details">
										<p className="street">
											<span className="sr-only">
												Name of street
											</span>
											{data.senderAddress.street}
										</p>
										<p className="city">
											<span className="sr-only">
												City name
											</span>
											{data.senderAddress.city}
										</p>
										<p className="postCode">
											<span className="sr-only">
												Postal code
											</span>
											{data.senderAddress.postCode}
										</p>
										<p className="country">
											<span className="sr-only">
												Country of origin
											</span>
											{data.senderAddress.country}
										</p>
									</div>
								</div>

								{/* Dates */}
								<div className="invoice-dates">
									<div className="dated">
										<h3 className="invoice-date-title">
											Invoice date
										</h3>
										<p className="invoice-date">
											{format(
												new Date(data.createdAt),
												"dd MMM yyyy"
											)}
										</p>
									</div>
									<div className="due-date">
										<h3 className="invoice-date-title">
											Payment due
										</h3>
										<p className="payment-date-view">
											{format(
												new Date(data.paymentDue),
												"dd MMM yyyy"
											)}
										</p>
									</div>
								</div>

								{/* Reciever */}
								<div className="bill-to">
									<h3 className="bill-to-title">Bill to</h3>
									<p className="billed-name">
										{data.clientName}
									</p>
									<div className="address-reciever-details">
										<p className="street">
											<span className="sr-only">
												Street name
											</span>
											{data.clientAddress.street}
										</p>
										<p className="city">
											<span className="sr-only">
												City name
											</span>
											{data.clientAddress.city}
										</p>
										<p className="postCode">
											<span className="sr-only">
												Postal code
											</span>
											{data.clientAddress.postCode}
										</p>
										<p className="country">
											<span className="sr-only">
												Country
											</span>
											{data.clientAddress.country}
										</p>
									</div>
								</div>

								{/* Email */}
								<div className="email-address">
									<h3 className="email-title">Sent to</h3>
									<p className="email-to">
										<span className="sr-only">
											email address
										</span>
										{data.clientEmail}
									</p>
								</div>
							</div>

							{/* PROJECT AND SUMMARY OF ITEMS */}
							<div className="item-summary">
								<table className="items">
									<caption className="sr-only">
										Project Details and costs
									</caption>
									<thead>
										<tr className="project-item-heading mobile-hidden">
											<th className="mobile-hidden item-title">
												Item name
											</th>
											<th className="mobile-hidden quantity-title">
												Qty.
											</th>
											<th className="price-heading">
												Price
											</th>
											<th className="mobile-hidden total-heading">
												Total
											</th>
										</tr>
									</thead>
									<tbody>
										{data.items.map(
											(item: {
												name: string;
												quantity: number;
												price: number;
												total: number;
											}) => (
												<tr
													className="item-details"
													key={item.name}
												>
													<td className="item-descr">
														{item.name}
													</td>

													<td className="item-qty">
														{item.quantity}{" "}
														<span className="tablet-hidden">
															x{" "}
															{currencyFormatter.format(
																item.price
															)}{" "}
														</span>
													</td>

													<td className="mobile-hidden unit-price">
														{currencyFormatter.format(
															item.price
														)}
													</td>

													<td className="total gross-total">
														{currencyFormatter.format(
															item.total
														)}
													</td>
												</tr>
											)
										)}
									</tbody>
									<tfoot>
										<tr className="grand-total-container">
											<td className="grand-total-title">
												Grand Total
											</td>
											<td className="grand-total">
												{currencyFormatter.format(
													grandTotal
												)}
											</td>
										</tr>
									</tfoot>
								</table>
							</div>
						</section>
					</div>
					<DeleteInvoiceDialog
						showDeleteInvoiceDialog={showDeleteInvoiceDialog}
						cancelDelete={cancelDelete}
						invoiceID={data.id}
						confirmDelete={confirmDelete}
					/>
				</main>
				<footer className="footer-view tablet-hidden">
					<div className="nav-view-btns ">
						{data.status !== "paid" && (
							<button
								className="btn btn-edit"
								onClick={toggleOverlay}
							>
								Edit
							</button>
						)}
						<button
							className="btn-delete-view"
							onClick={handleDeleteInvoice}
						>
							Delete
						</button>
						{data.status !== "paid" && (
							<button
								className="btn btn-mark"
								onClick={handleChangeStatus}
							>
								Mark as paid
							</button>
						)}
					</div>
				</footer>
			</div>

			{overlayControl === true && (
				<OverLay
					toggleOverlay={toggleOverlay}
					overlay={overlayControl}
				>
					<EditInvoice
						toggleOverlay={toggleOverlay}
						childInputRef={childInputRef}
					/>
				</OverLay>
			)}
		</>
	);
}

export default ViewInvoice;
