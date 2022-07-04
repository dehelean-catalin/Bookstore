import React from "react";
import flyingBook from "../images/flyingBook.jpg";
import "./OrdersImage.css";
export const OrdersImage = () => {
	return (
		<div className="orders-image-container">
			<img className="orders-image" src={flyingBook} alt=" not found" />
		</div>
	);
};
