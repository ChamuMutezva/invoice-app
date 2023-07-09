import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINT_PATH } from "../config";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export default function createInvoice(
	setCreateInvoiceError: (arg0: any) => void
) {
	const queryClient = useQueryClient();
	const { state } = useAuthContext();
	const navigate = useNavigate();
	const mutation = useMutation({
		mutationFn: (newInvoice: any) => {
			return axios.post(`${API_ENDPOINT_PATH}`, newInvoice, {
				headers: {
					Authorization: `Bearer ${state.user?.token}`,
				},
			});
		},

		onSuccess: () => {
			queryClient.invalidateQueries(["invoices"]);	
			navigate("/invoicespage");		
		},
		onError: ({ message }: any) => {
			setCreateInvoiceError(message);
		},
	});
	return mutation;
}
