import React from "react";
import { OrdersForm } from "../components/OrdersForm";
import flyingBook from "../images/flyingBook.jpg";

import "./OrderDetails.css";
export const OrderDetails = () => {
	return (
		<div className="order-details">
			<div className="order-details-container">
				<div className="orders-image-container">
					<img className="orders-image" src={flyingBook} alt=" not found" />
				</div>
				<OrdersForm />
			</div>
		</div>
	);
};
