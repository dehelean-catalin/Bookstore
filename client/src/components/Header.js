import React, { useContext } from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { AuthContext } from "../store/auth-context";

export const Header = () => {
	const location = useLocation();
	const { authenticationToken } = useContext(AuthContext);

	const isHomeActive = location.pathname === "/" ? "active-tab" : "inactive-tab";
	const isShoppingCartActive = location.pathname === "/cart" ? "active-tab" : "inactive-tab";
	const isOrdersActive = location.pathname === "/orders" ? "active-tab" : "inactive-tab";
	const isLoginActive = location.pathname === "/login" ? "active-tab" : "inactive-tab";

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
						<Link to={authenticationToken ? "/cart" : "/login"} className="header-link">
							<IoCartOutline className="cart-icon" />
							<h2> SHOPPING CART</h2>
						</Link>
					</li>
					<li className={isOrdersActive}>
						<Link to={authenticationToken ? "/orders" : "/login"} className="header-link">
							<TbTruckDelivery className="orders-icon" />
							<h2>ORDERS</h2>
						</Link>
					</li>
					<li className={isLoginActive}>
						<Link to="/login" className="header-link">
							<FaRegUser className="login-icon" />
							<h2>LOGIN</h2>
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};
