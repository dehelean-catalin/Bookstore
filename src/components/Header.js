import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";
import { IoCartOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";

export const Header = () => {
	return (
		<header>
			<nav>
				<h1> ITP Library </h1>
				<ul>
					<li>
						<Link to="/" className="header-link">
							<GrHomeRounded className="home-icon" />
							<h2>HOME</h2>
						</Link>
					</li>
					<li>
						<Link to="/cart" className="header-link">
							<IoCartOutline className="cart-icon" />
							<h2> SHOPPING CART</h2>
						</Link>
					</li>
					<li>
						<Link to="/orders" className="header-link">
							<TbTruckDelivery className="orders-icon" />
							<h2>ORDERS</h2>
						</Link>
					</li>
					<li>
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
