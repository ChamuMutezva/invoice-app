import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINT_PATH } from "../config";
import { useNavigate } from "react-router-dom";

export const useDeleteInvoice = (setDeletionError: (arg0: any) => void) => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	return useMutation(
		(invoiceId) => {
			return axios.delete(`${API_ENDPOINT_PATH}/${invoiceId}`);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["invoices"]);
				navigate("/");
			},
			onError: ({ message }) => {
				setDeletionError(message);
			},
		}
	);
};
