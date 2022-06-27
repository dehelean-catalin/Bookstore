import React from "react";
import Image1 from "../images/flyingBook.jpg";
import "./OrdersImage.css";
export const OrdersImage = () => {
	return (
		<div className="orders-image-container">
			<img className="orders-image" src={Image1} alt="image not found" />
		</div>
	);
};
