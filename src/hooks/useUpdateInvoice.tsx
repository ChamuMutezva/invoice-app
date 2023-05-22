import axios from "axios";
import { API_ENDPOINT_PATH } from "../config";

export const updateInvoice = (updatedInvoice: { _id: any }) =>
	axios
		.patch(`${API_ENDPOINT_PATH}/${updatedInvoice._id}`, updatedInvoice)
		.then((res) => res.data);
