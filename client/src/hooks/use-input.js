import { useState } from "react";

export const useInput = (validateValue) => {
	const [enteredValue, setEnteredValue] = useState("");
	const [isTouched, setIsTouched] = useState(false);

	const valueIsValid = validateValue(enteredValue);
	const hasError = !valueIsValid && isTouched;

	const valueChangeHandler = (event) => {
		setEnteredValue(event.target.value);
	};
	const inputBlurHandler = () => {
		setIsTouched(true);
	};

	return {
		value: enteredValue,
		hasError,
		isValid: valueIsValid,
		valueChangeHandler,
		inputBlurHandler,
	};
};
