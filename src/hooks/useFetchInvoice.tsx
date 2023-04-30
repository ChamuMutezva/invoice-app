import axios from "axios";
import { useQuery } from "react-query";
import { API_ENDPOINT_PATH } from "../config";

export const useGetSingleInvoice = (_id: any) => {
  return useQuery(["invoices", _id], async () => {
    const { data } = await axios.get(`${API_ENDPOINT_PATH}/${_id}`);
    return data;
  });
};

