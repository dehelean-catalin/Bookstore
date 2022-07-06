import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInput } from "../hooks/use-input";
import flyingBook from "../images/flyingBook.jpg";
import "./Login.css";
export const Login = () => {
	const [registerEmailErrorMessage, setRegisterEmailErrorMessage] = useState("");
	const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
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

	const registerEmailClass = registerEmailErrorMessage ? "login-input-invalid" : "login-input-valid";
	const passwordClass = passwordErrorMessage ? "login-input-invalid" : "login-input-valid";

	const isFormValid = !registerEmailValid || !passwordValid || registerEmailErrorMessage;

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
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err.response.data.error.message);
				setRegisterEmailErrorMessage(err.response.data.error.message);
			});
	};
	return (
		<div className="login">
			<img src={flyingBook} className="login-image" alt="not found" />
			<form className="login-form" onSubmit={submitHandler}>
				<div className="login-title">Login</div>
				<div className="login-subtitle">Use a local account to log in</div>

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
				<div className="input-checkbox-container">
					<input type="checkbox" />
					<div>Remember me?</div>
				</div>
				<button type="submit" className="login-btn" disabled={isFormValid}>
					Login
				</button>
				<Link to="/">Forgot your password</Link>
				<Link to="/register">Register as new user</Link>
			</form>
		</div>
	);
};
