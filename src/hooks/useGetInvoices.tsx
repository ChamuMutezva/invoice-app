import { useQuery } from "react-query";
import axios from "axios";
import { API_ENDPOINT_PATH } from "../config";
import { useAuthContext } from "./useAuthContext";

export default function getInvoices(filters: string) {
	const { state } = useAuthContext();

	// if (state.user) {
	const { isLoading, data, isError, error, isSuccess } = useQuery({
		queryKey: ["invoices", filters],
		queryFn: (filters) => {		
			return axios.get(`${API_ENDPOINT_PATH}`, {
				headers: {
					Authorization: `Bearer ${state.user?.token}`,
				},
			});
		},
	});
	// console.log(filters);
	// if filters is equal to 'all' then all invoices should be displayed
	// else apply filter using the status (function for homepage)
	const invoices =
		filters === "all"
			? data?.data
			: data?.data.filter(
					(invoice: { status: string }) => invoice.status === filters
			  );
	return { isLoading, invoices, isError, error, isSuccess };
	//	}
}
