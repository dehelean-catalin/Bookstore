import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import Axios from "axios";
import { RiLogoutBoxRLine } from "react-icons/ri";
import AuthContext from "../store/auth-context";
import ShoppingCartContext from "../store/shopping-cart-context";
export const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { counter } = useContext(ShoppingCartContext);
	const { token, isLogin, logout } = useContext(AuthContext);
	const [userName, setUserName] = useState("");
	const [toggleLogOut, setToggleLogOut] = useState(false);
	const isHomeActive = location.pathname === "/" ? "active-tab" : "inactive-tab";
	const isShoppingCartActive = location.pathname === "/cart" ? "active-tab" : "inactive-tab";
	const isOrdersActive = location.pathname === "/orders" ? "active-tab" : "inactive-tab";
	const isLoginActive = location.pathname === "/login" ? "active-tab" : "inactive-tab";

	useEffect(() => {
		isLogin &&
			Axios.post(
				"https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDR1LWLSPu9_tgEFRM1-Hy6076C6vvt6QQ",
				{ idToken: token }
			)
				.then((response) => {
					setUserName(response.data.users[0].email);
				})
				.catch((err) => {
					logout();
				});
	}, [isLogin]);
	const logOutHandler = () => {
		logout();
		setToggleLogOut(false);
		navigate("/login", { replace: true });
	};

	return (
		<header>
			<nav>
				<h1> ITP Library </h1>
				<ul>
					<li className={isHomeActive}>
						<Link to="/" className="header-link">
							<BiHomeAlt className="home-icon" />
							<h2>HOME</h2>
						</Link>
					</li>
					<li className={isShoppingCartActive}>
						<Link to={isLogin ? "/cart" : "/login"} className="header-link">
							<IoCartOutline className="cart-icon" />
							<h2> SHOPPING CART</h2>
							{isLogin && counter ? <div className="counter">+{counter}</div> : ""}
						</Link>
					</li>
					<li className={isOrdersActive}>
						<Link to={isLogin ? "/orders" : "/login"} className="header-link">
							<TbTruckDelivery className="orders-icon" />
							<h2>ORDERS</h2>
						</Link>
					</li>
					{isLogin && (
						<li>
							<div className="header-link-profile" onClick={() => setToggleLogOut(!toggleLogOut)}>
								<FaRegUser className="login-icon" />
								<h2>{userName}</h2>
							</div>
							<div
								className="backdrop"
								style={toggleLogOut ? { display: "flex" } : { display: "none" }}
								onClick={() => setToggleLogOut(false)}
							>
								lala
							</div>
							{toggleLogOut && (
								<button className="sign-out-btn" onClick={logOutHandler}>
									<RiLogoutBoxRLine className="sign-out-icon" /> Sign Out
								</button>
							)}
						</li>
					)}
					{!isLogin && (
						<li className={isLoginActive}>
							<Link to="/login" className="header-link">
								<FaRegUser className="login-icon" />
								<h2>LOGIN</h2>
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};
