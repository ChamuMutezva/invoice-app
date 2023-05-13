import add from "date-fns/add";
import format from "date-fns/format";

export const selectOption = (
  setValue: (arg0: string, arg1: any) => void,
  paymentOption: string
) => {
  // update the days when payment terms have been selected
  switch (paymentOption) {
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
