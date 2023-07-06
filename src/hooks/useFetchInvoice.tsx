import axios from "axios";
import { useQuery } from "react-query";
import { API_ENDPOINT_PATH } from "../config";
import { useAuthContext } from "./useAuthContext";

export const useGetSingleInvoice = (_id: any) => {
	const { state } = useAuthContext();
	return useQuery(["invoices", _id], async () => {
		const { data } = await axios.get(`${API_ENDPOINT_PATH}/${_id}`, {
			headers: {
				Authorization: `Bearer ${state.user?.token}`,
			},
		});
		return data;
	});
};
