import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINT_PATH } from "../config";
import { useNavigate } from "react-router-dom";

export default function createInvoice(
	setCreateInvoiceError: (arg0: any) => void
) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const mutation = useMutation({
		mutationFn: (newInvoice) => {
			return axios.post(`${API_ENDPOINT_PATH}`, newInvoice);
		},

		onSuccess: () => {
			queryClient.invalidateQueries(["invoices"]);			
		},
		onError: ({ message }) => {
			setCreateInvoiceError(message);
		},
	});
	return mutation;
}
