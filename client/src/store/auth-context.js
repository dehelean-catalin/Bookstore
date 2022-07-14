import React, { useEffect, useState } from "react";

let logoutTimer;

const AuthContext = React.createContext({
	token: "",
	userId: "",
	isLogin: false,
	login: (token, expirationTime) => {},
	logout: () => {},
	userIdHandler: (id) => {},
});
const calculateRemainigTime = (expirationValue) => {
	const currentTime = new Date().getTime();
	const expirationTime = new Date(expirationValue).getTime();

	const remainingDuration = expirationTime - currentTime;
	return remainingDuration;
};
const retriveStoredToken = () => {
	const storedToken = localStorage.getItem("token");
	const storedExpirationTime = localStorage.getItem("expirationTime");

	const remainingTime = calculateRemainigTime(storedExpirationTime);
	if (remainingTime <= 6000) {
		localStorage.clear();
		return null;
	}

	return {
		token: storedToken,
		duration: remainingTime,
	};
};
export const AuthContextProvider = (props) => {
	const tokenData = retriveStoredToken();
	let initialTokenValue;
	if (tokenData) {
		initialTokenValue = tokenData.token;
	}
	const initialUserIdValue = localStorage.getItem("userId");

	const [token, setToken] = useState(initialTokenValue);
	const [userId, setUserId] = useState(initialUserIdValue);

	const isUserLoggedIn = !!token;

	const logoutHandler = () => {
		setToken(null);
		localStorage.clear();

		if (logoutTimer) {
			clearTimeout(logoutTimer);
		}
	};
	const loginHandler = (token, expirationValue) => {
		setToken(token);
		localStorage.setItem("token", token);
		localStorage.setItem("expirationTime", expirationValue);

		const remainingTime = calculateRemainigTime(expirationValue);
		logoutTimer = setTimeout(logoutHandler, remainingTime);
	};
	const userIdHandler = (id) => {
		setUserId(id);
		localStorage.setItem("userId", id);
	};

	useEffect(() => {
		if (tokenData) {
			logoutTimer = setTimeout(logoutHandler, tokenData.duration);
		}
	}, [tokenData]);

	const contexValue = {
		token: token,
		userId: userId,
		isLogin: isUserLoggedIn,
		login: loginHandler,
		logout: logoutHandler,
		userIdHandler: userIdHandler,
	};
	return <AuthContext.Provider value={contexValue}>{props.children}</AuthContext.Provider>;
};
export default AuthContext;
