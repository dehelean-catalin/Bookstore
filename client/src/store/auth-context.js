import React, { useState } from "react";

const AuthContext = React.createContext({
	token: "",
	userId: "",
	isLogin: false,
	login: (token) => {},
	logout: () => {},
	userIdHandler: () => {},
});

export const AuthContextProvider = (props) => {
	const initialTokenValue = localStorage.getItem("token");
	const initialUserIdValue = localStorage.getItem("userId");
	const [token, setToken] = useState(initialTokenValue);
	const [userId, setUserId] = useState(initialUserIdValue);

	const isUserLoggedIn = !!token;

	const loginHandler = (token) => {
		setToken(token);
		localStorage.setItem("token", token);
	};
	const logoutHandler = () => {
		setToken(null);
		localStorage.clear();
	};
	const userIdHandler = (id) => {
		setUserId(id);
		localStorage.setItem("userId", id);
	};

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
