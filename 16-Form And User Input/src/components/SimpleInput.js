import useInput from "../hooks/use-input";
const validateEmail = (enterValue) => {
  return enterValue.includes("@");
};

const SimpleInput = (props) => {
  const {
    value: enterName,
    isValid: isNameValid,
    hasError: nameHasError,
    onValueChangeHandler: onNameChangeHandler,
    onValueBlurHandler: onNameBlurHandler,
    reset: resetNameInput,
  } = useInput((enterValue) => enterValue.trim() !== "");

  const {
    value: enterEmail,
    isValid: isEmailValid,
    hasError: emailHasError,
    onValueChangeHandler: onEmailChangeHandler,
    onValueBlurHandler: onEmailBlurHandler,
    reset: resetEmailInput,
  } = useInput(validateEmail);

  let formValid = false;
  formValid = isNameValid && isEmailValid;

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!isNameValid) return;
    resetNameInput();
    resetEmailInput();
  };

  const nameInputClasses = nameHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={onSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enterName}
          onChange={onNameChangeHandler}
          onBlur={onNameBlurHandler}
        />
        {nameHasError && <p className="error-text">Name must not be empty</p>}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={enterEmail}
          onChange={onEmailChangeHandler}
          onBlur={onEmailBlurHandler}
        />
        {emailHasError && (
          <p className="error-text">Please input valid email</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
