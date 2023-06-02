import add from "date-fns/add";
import format from "date-fns/format";
import { UseFormSetValue } from "react-hook-form";
import { InvoiceTypesID } from "../Types/DataTypes";

// Select the number of days due for payment .
// used with the select option in the NewInvoice and EditInvoice
const dueDays = (payment: string, setValue: UseFormSetValue<any>) => {
	switch (payment) {
		case "1":
			setValue(
				"paymentDue",
				format(add(Date.now(), { days: 1 }), "yyyy-MM-dd")
			);
			break;
		case "6":
			setValue(
				"paymentDue",
				format(add(Date.now(), { days: 6 }), "yyyy-MM-dd")
			);
			break;
		case "7":
			setValue(
				"paymentDue",
				format(add(Date.now(), { days: 7 }), "yyyy-MM-dd")
			);
			break;
		case "14":
			setValue(
				"paymentDue",
				format(add(Date.now(), { days: 14 }), "yyyy-MM-dd")
			);
			break;
		default:
			setValue(
				"paymentDue",
				format(add(Date.now(), { days: 30 }), "yyyy-MM-dd")
			);
	}
};

export default dueDays;
