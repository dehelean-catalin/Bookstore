import React, { useContext } from "react";
import { OrdersContext } from "../store/orders-context";
import { Link } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import "./OrdersList.css";
export const OrdersList = () => {
	const orders = useContext(OrdersContext);
	console.log(orders.order);

	const orderItems = orders.order.map((book) => (
		<div className="order-item" key={book.id}>
			<div className="order-item-icon">
				<div className="order-item-icon-container">{book.icon}</div>
			</div>
			<div className="order-item-details">
				<div className="order-item-details-container">
					<div className="order-item-id">Order #{book.id}</div>
					<div className="order-item-price">${book.price}</div>
				</div>
				<div className="order-item-details-container">
					<div className="order-item-amount">
						Items: <span className="order-item-amount-number">{book.items}</span>
					</div>
					<Link to={`/order-details/${book.id}`} className="order-edit-btn">
						<FiEdit2 /> Edit Order Details
					</Link>
				</div>
				<div className="order-item-details-container-2">
					<div className="order-item-delivery">
						Delivery Status: <span className="order-item-status">{book.deliveryStatus}</span>
					</div>
				</div>
			</div>
		</div>
	));

	return <div className="orders-list">{orderItems}</div>;
};
