import { useState } from "react";

const useInput = (validateValueFn) => {
  const [enterValue, setEnterValue] = useState("");
  const [isTouch, setIsTouch] = useState(false);

  const isValueValid = validateValueFn(enterValue);
  const hasError = !isValueValid && isTouch;

  const onValueChangeHandler = (event) => {
    setEnterValue(event.target.value);
  };

  const onValueBlurHandler = (event) => {
    setIsTouch(true);
  };

  const reset = () => {
    setEnterValue("");
    setIsTouch(false);
  };

  return {
    value: enterValue,
    isValid: isValueValid,
    hasError,
    onValueChangeHandler,
    onValueBlurHandler,
    reset,
  };
};

export default useInput;
