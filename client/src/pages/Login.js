import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useInput } from "../hooks/use-input";
import flyingBook from "../images/flyingBook.jpg";
import { AuthContext } from "../store/auth-context";
import "./Login.css";
export const Login = () => {
	let navigate = useNavigate();
	const { authenticationHandler } = useContext(AuthContext);
	const [loginEmailErrorMessage, setLoginEmailErrorMessage] = useState("");
	const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
	const {
		value: loginEmailValue,
		hasError: loginEmailError,
		isValid: loginEmailValid,
		valueChangeHandler: loginEmailHandler,
		inputBlurHandler: loginEmailBlurHandler,
	} = useInput((value) => value.trim() !== "" && value.includes("@") === true, "");
	const {
		value: passwordValue,
		hasError: passwordError,
		isValid: passwordValid,
		valueChangeHandler: passwordHandler,
		inputBlurHandler: passwordBlurHandler,
	} = useInput((value) => value.trim() !== "" && value.length >= 6, "");

	const validateEmail = () => {
		if (loginEmailError && loginEmailValue.trim() === "") {
			setLoginEmailErrorMessage("Empty");
		} else if (loginEmailError && loginEmailValue.includes("@") === false) {
			setLoginEmailErrorMessage("Not an email format");
		} else {
			setLoginEmailErrorMessage("");
		}
	};

	useEffect(() => {
		validateEmail();
	}, [loginEmailValue, loginEmailError]);

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

	const loginEmailClass = loginEmailErrorMessage ? "login-input-invalid" : "login-input-valid";
	const passwordClass = passwordErrorMessage ? "login-input-invalid" : "login-input-valid";

	const isFormValid = !loginEmailValid || !passwordValid || loginEmailErrorMessage;

	const submitHandler = (event) => {
		event.preventDefault();
		Axios.post(
			"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDR1LWLSPu9_tgEFRM1-Hy6076C6vvt6QQ",
			{
				email: loginEmailValue,
				password: passwordValue,
				returnSecureToken: true,
			}
		)
			.then((response) => {
				authenticationHandler(response.data.idToken);
				navigate("/");
			})
			.catch((err) => {
				console.log(err.response.data);
				if (err.response.data.error.message.includes("PASSWORD")) {
					setPasswordErrorMessage(err.response.data.error.message);
				} else {
					setLoginEmailErrorMessage(err.response.data.error.message);
				}
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
					className={loginEmailClass}
					placeholder="Email"
					value={loginEmailValue}
					onChange={loginEmailHandler}
					onBlur={loginEmailBlurHandler}
				/>
				<div className="error-message"> {loginEmailErrorMessage}</div>

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
