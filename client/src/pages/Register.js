import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInput } from "../hooks/use-input";
import flyingBook from "../images/flyingBook.jpg";
import AuthContext from "../store/auth-context";
import "./Register.css";
export const Register = () => {
	let navigate = useNavigate();
	const { login, userIdHandler } = useContext(AuthContext);
	const [registerEmailErrorMessage, setRegisterEmailErrorMessage] = useState("");
	const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
	const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");
	const {
		value: registerEmailValue,
		hasError: registerEmailError,
		isValid: registerEmailValid,
		valueChangeHandler: registerEmailHandler,
		inputBlurHandler: registerEmailBlurHandler,
	} = useInput((value) => value.trim() !== "" && value.includes("@") === true, "");
	const {
		value: passwordValue,
		hasError: passwordError,
		isValid: passwordValid,
		valueChangeHandler: passwordHandler,
		inputBlurHandler: passwordBlurHandler,
	} = useInput((value) => value.trim() !== "" && value.length >= 6, "");
	const {
		value: confirmPasswordValue,
		hasError: confirmPasswordError,
		isValid: confirmPasswordValid,
		valueChangeHandler: confirmPasswordHandler,
		inputBlurHandler: confirmPasswordBlurHandler,
	} = useInput((value) => value.trim() !== "" && value === passwordValue, "");

	const validateEmail = () => {
		if (registerEmailError && registerEmailValue.trim() === "") {
			setRegisterEmailErrorMessage("Empty");
		} else if (registerEmailError && registerEmailValue.includes("@") === false) {
			setRegisterEmailErrorMessage("Not an email format");
		} else {
			setRegisterEmailErrorMessage("");
		}
	};

	useEffect(() => {
		validateEmail();
	}, [registerEmailValue, registerEmailError]);

	const validatePassword = () => {
		if (passwordError && passwordValue.trim() === "") {
			setPasswordErrorMessage("Empty");
		} else if (passwordError && passwordValue.length < 6) {
			setPasswordErrorMessage("Not strong enough");
		} else {
			setPasswordErrorMessage("");
		}
	};

	useEffect(() => {
		validatePassword();
	}, [passwordValue, passwordError]);

	const validateConfirmPassword = () => {
		if (confirmPasswordError && confirmPasswordValue !== passwordValue) {
			setConfirmPasswordErrorMessage("doesn't match");
		} else {
			setConfirmPasswordErrorMessage("");
		}
	};

	useEffect(() => {
		validateConfirmPassword();
	}, [confirmPasswordValue, confirmPasswordError]);

	const registerEmailClass = registerEmailErrorMessage ? "register-email-invalid" : "register-email-valid";
	const passwordClass = passwordErrorMessage ? "register-email-invalid" : "register-email-valid";
	const confirmPasswordClass = confirmPasswordErrorMessage ? "register-email-invalid" : "register-email-valid";

	const isFormValid = !registerEmailValid || !passwordValid || !confirmPasswordValid || registerEmailErrorMessage;

	const submitHandler = (event) => {
		event.preventDefault();
		Axios.post(
			"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDR1LWLSPu9_tgEFRM1-Hy6076C6vvt6QQ",
			{
				email: registerEmailValue,
				password: passwordValue,
				returnSecureToken: true,
			}
		)
			.then((response) => {
				login(response.data.idToken);
				userIdHandler(response.data.localId);
				localStorage.setItem("token", response.data.idToken);
				localStorage.setItem("userId", response.data.localId);
				navigate("/", { replace: true });
			})
			.catch((err) => {
				console.log(err.response.data.error.message);
				setRegisterEmailErrorMessage(err.response.data.error.message);
			});
	};
	return (
		<div className="register">
			<img src={flyingBook} className="register-image" alt="not found" />
			<form className="register-form" onSubmit={submitHandler}>
				<div className="register-title">Register</div>
				<div className="register-subtitle">Create new account</div>

				<label className="label-form">Email</label>
				<input
					type="text"
					className={registerEmailClass}
					placeholder="Email"
					value={registerEmailValue}
					onChange={registerEmailHandler}
					onBlur={registerEmailBlurHandler}
				/>
				<div className="error-message"> {registerEmailErrorMessage}</div>

				<label className="label-form">Password</label>
				<input
					type="password"
					className={passwordClass}
					placeholder="Password"
					value={passwordValue}
					onChange={passwordHandler}
					onBlur={passwordBlurHandler}
				/>
				<div className="error-message"> {passwordErrorMessage}</div>

				<label className="label-form">Confirm Password</label>
				<input
					type="password"
					className={confirmPasswordClass}
					placeholder="Confirm Password"
					value={confirmPasswordValue}
					onChange={confirmPasswordHandler}
					onBlur={confirmPasswordBlurHandler}
					disabled={!passwordValid}
				/>
				<div className="error-message"> {confirmPasswordErrorMessage}</div>

				<button type="submit" className="register-btn" disabled={isFormValid}>
					Register
				</button>
			</form>
		</div>
	);
};
