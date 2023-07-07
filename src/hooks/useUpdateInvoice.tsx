import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINT_PATH } from "../config";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useUpdateInvoice = (setUpdateError: (arg0: any) => void) => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { state } = useAuthContext();
	return useMutation(
		(invoice: any) => {
			return axios.patch(`${API_ENDPOINT_PATH}/${invoice._id}`, invoice, {
				headers: {
					Authorization: `Bearer ${state.user?.token}`,
				},
			}).then(res => res.data);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["invoices"]);
			//	navigate("/viewInvoice");
			},
			onError: ({ message }: any) => {
				setUpdateError(message);
			},
		}
	);
};


/*
export const updateInvoice = (updatedInvoice: { _id: any }) =>
	axios
		.patch(`${API_ENDPOINT_PATH}/${updatedInvoice._id}`, updatedInvoice)
		.then((res) => res.data);
*/
