import { useEffect, useState } from "react";

export const useInput = (validateValue, initialValues) => {
	const [enteredValue, setEnteredValue] = useState(initialValues);
	const [isTouched, setIsTouched] = useState(false);

	const valueIsValid = validateValue(enteredValue);
	const hasError = !valueIsValid && isTouched;

	useEffect(() => {
		setEnteredValue(initialValues);
	}, [initialValues]);

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
