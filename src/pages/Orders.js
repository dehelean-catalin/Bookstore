import React from "react";
import { OrdersList } from "../components/OrdersList";
import "./Orders.css";
export const Orders = () => {
	return (
		<div className="orders">
			<div className="orders-container">
				<div className="orders-titile">Your Products</div>
				<OrdersList />
			</div>
		</div>
	);
};
