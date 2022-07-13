import "./App.css";
import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ShoppingCart } from "./pages/ShoppingCart";
import { Login } from "./pages/Login";
import { Orders } from "./pages/Orders";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { BookDetails } from "./pages/BookDetails";
import { OrderDetails } from "./pages/OrderDetails";
import { Register } from "./pages/Register";
import { ProtectedRoute, ProtectedLogin } from "./components/ProtectedRoute";
import AuthContext from "./store/auth-context";
import ShoppingCartContext from "./store/shopping-cart-context";

function App() {
	const { isLogin, userId } = useContext(AuthContext);
	const { initialCounterValue } = useContext(ShoppingCartContext);

	useEffect(() => {
		initialCounterValue(userId);
	}, [isLogin]);

	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/view-book/:id" element={<BookDetails />} />
				<Route element={<ProtectedRoute isLoggedin={isLogin} />}>
					<Route path="/cart" element={<ShoppingCart />} />
					<Route path="/orders" element={<Orders />} />
					<Route path="/order-details/:id" element={<OrderDetails />} />
				</Route>
				<Route element={<ProtectedLogin isLoggedin={isLogin} />}>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Route>
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
