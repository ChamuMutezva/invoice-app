import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINT_PATH } from "../config";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useDeleteInvoice = (setDeletionError: (arg0: any) => void) => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { state } = useAuthContext();
	return useMutation(
		(invoiceId: any) => {
			return axios.delete(`${API_ENDPOINT_PATH}/${invoiceId}`, {
				headers: {
					Authorization: `Bearer ${state.user?.token}`,
				},
			});
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["invoices"]);
				navigate("/");
			},
			onError: ({ message }: any) => {
				setDeletionError(message);
			},
		}
	);
};
