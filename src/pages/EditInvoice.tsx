import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import getInvoice from "../hooks/getInvoice";

function EditInvoice() {
  const navigate = useNavigate();
  let params = useParams(); 
  const invoice = getInvoice(params.id);
  console.log(invoice);
  return <div>EditInvoice</div>;
}

export default EditInvoice;
