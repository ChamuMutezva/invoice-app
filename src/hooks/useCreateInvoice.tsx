import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINT_PATH } from "../config";

export default function createInvoice() {
    const mutation= useMutation({
        mutationFn: (newInvoice) => {
            return axios.post(`${API_ENDPOINT_PATH}`, newInvoice)
        }
    })
    return mutation
}
