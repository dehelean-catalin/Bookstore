import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ isLoggedin }) => {
	if (!isLoggedin) {
		return <Navigate to="/login" replace />;
	}
	return <Outlet />;
};
export const ProtectedLogin = ({ isLoggedin }) => {
	if (isLoggedin) {
		return <Navigate to="/" replace />;
	}
	return <Outlet />;
};
