import React, { useContext } from "react";
import { OrdersForm } from "../components/OrdersForm";
import { OrdersImage } from "../components/OrdersImage";
import { OrdersContext } from "../store/orders-context";
import "./OrderDetails.css";
export const OrderDetails = () => {
	return (
		<div className="order-details">
			<div className="order-details-container">
				<OrdersImage />
				<OrdersForm />
			</div>
		</div>
	);
};
