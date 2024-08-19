const EmailInputField = ({ register, errors }) => {
  return (
    <>
      <div className="form-control">
        <label htmlFor="email" className="label">
          <span className={`label-text ${errors?.email ? "text-error" : ""}`}>
            Email
          </span>
        </label>
        <input
          {...register("email", {
            required: "Your email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address",
            },
          })}
          type="email"
          id="email"
          name="email"
          placeholder="example@email.com"
          className={`input input-bordered ${
            errors?.email ? "input-error" : ""
          }`}
        />
        {errors?.email && (
          <div className="label">
            <span className="label-text-alt text-error">
              {errors.email.message}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default EmailInputField;
