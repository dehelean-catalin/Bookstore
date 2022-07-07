import React from "react";
import { BiBook } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import "./OrdersItem.css";
export const OrdersItem = ({ order }) => {
	const { id, price, items, deliveryStatus } = order;
	return (
		<div className="order-item">
			<div className="order-item-icon">
				<div className="order-item-icon-container">
					<BiBook />
				</div>
			</div>
			<div className="order-item-details">
				<div className="order-item-details-container">
					<div className="order-item-id">Order #{id}</div>
					<div className="order-item-price">${price}</div>
				</div>
				<div className="order-item-details-container">
					<div className="order-item-amount">
						Items: <span className="order-item-amount-number">{items}</span>
					</div>
					{deliveryStatus !== "Completed" && (
						<Link to={`/order-details/${id}`} className="order-edit-btn">
							<FiEdit2 /> Edit Order Details
						</Link>
					)}
				</div>
				<div className="order-item-details-container-2">
					<div className="order-item-delivery">
						Delivery Status: <span className="order-item-status">{deliveryStatus}</span>
					</div>
				</div>
			</div>
		</div>
	);
};
