import React from "react";
import { OrdersForm } from "../components/OrdersForm";
import { OrdersImage } from "../components/OrdersImage";
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
