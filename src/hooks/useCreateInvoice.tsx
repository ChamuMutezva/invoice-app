import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINT_PATH } from "../config";
import { useAuthContext } from "./useAuthContext";

export default function createInvoice(
	setCreateInvoiceError: (arg0: any) => void
) {
	const queryClient = useQueryClient();
	const { state } = useAuthContext();
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
		},
		onError: ({ message }: any) => {
			setCreateInvoiceError(message);
		},
	});
	return mutation;
}
