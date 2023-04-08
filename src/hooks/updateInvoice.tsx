import axios from "axios";
import { useMutation } from "react-query";
import { API_ENDPOINT_PATH } from "../config";

/*export default function updateInvoice(id: any) {
  const mutation = useMutation({
    mutationFn: (updated) => {
      return axios.patch(`${API_ENDPOINT_PATH}/${id}`, updated);
    },
  });
  return mutation;
}
*/

export const updateNote = (updatedInvoice: { id: any; })=>
  axios.put(`${API_ENDPOINT_PATH}/${updatedInvoice.id}`, updatedInvoice).then(res => res.data)