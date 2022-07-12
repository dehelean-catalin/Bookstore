import Axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useInput } from "../hooks/use-input";
import flyingBook from "../images/flyingBook.jpg";
import AuthContext from "../store/auth-context";
import "./Login.css";
export const Login = () => {
	const navigate = useNavigate();
	const { login, userIdHandler } = useContext(AuthContext);
	const [credentialsError, setCredetialsError] = useState("");

	const {
		value: loginEmailValue,
		hasError: loginEmailError,
		isValid: loginEmailValid,
		valueChangeHandler: loginEmailHandler,
		inputBlurHandler: loginEmailBlurHandler,
	} = useInput((value) => value.trim() !== "", "");
	const {
		value: passwordValue,
		hasError: passwordError,
		isValid: passwordValid,
		valueChangeHandler: passwordHandler,
		inputBlurHandler: passwordBlurHandler,
	} = useInput((value) => value.trim() !== "", "");

	const loginEmailClass = loginEmailError ? "login-input-invalid" : "login-input-valid";
	const passwordClass = passwordError ? "login-input-invalid" : "login-input-valid";

	const isFormValid = !loginEmailValid || !passwordValid;

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
				login(response.data.idToken);
				userIdHandler(response.data.localId);
				navigate("/", { replace: true });
			})
			.catch(() => {
				setCredetialsError("Login Failed: Invalid username or password");
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
				<div className="error-message">{loginEmailError ? "Email field is required" : ""}</div>
				<label className="label-form">Password</label>
				<input
					type="password"
					className={passwordClass}
					placeholder="Password"
					value={passwordValue}
					onChange={passwordHandler}
					onBlur={passwordBlurHandler}
				/>
				<div className="error-message"> {passwordError ? "Password field is required" : ""}</div>
				<div className="input-checkbox-container">
					<input type="checkbox" />
					<div>Remember me?</div>
				</div>
				<div className="error-message"> {credentialsError}</div>
				<button type="submit" className="login-btn" disabled={isFormValid}>
					Login
				</button>
				<Link to="/">Forgot your password</Link>
				<Link to="/register">Register as new user</Link>
			</form>
		</div>
	);
};
