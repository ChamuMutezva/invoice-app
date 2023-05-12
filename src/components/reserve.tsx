/*
<div className={`form-input-wrapper`}>
  <label
    className={`label ${errors.senderAddress?.street ? "form-errors" : ""}`}
    htmlFor={`street`}
  >
    Street Address
  </label>
  <input
    type="text"
    id={`street`}
    aria-labelledby="sender-street"
    className={`input street`}
    placeholder={`116 Caledorn street`}
    aria-invalid={errors.senderAddress?.street ? "true" : false}
    {...register("senderAddress.street", {
      required: "Street address is required",
      minLength: {
        value: 3,
        message: "Street must have at least 3 characters",
      },
      maxLength: {
        value: 40,
        message: "Street must have at most 40 characters",
      },
    })}
  />
  {errors.senderAddress?.street && (
    <p role="alert" id="sender-street" className="form-errors">
      {errors.senderAddress.street.message?.toString()}
    </p>
  )}
</div>;
*/
