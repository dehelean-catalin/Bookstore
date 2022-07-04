import React, { useContext } from "react";
import { OrdersForm } from "../components/OrdersForm";
import { OrdersImage } from "../components/OrdersImage";
import { OrdersContext } from "../store/orders-context";
import "./OrderDetails.css";
export const OrderDetails = () => {
	const { order } = useContext(OrdersContext);
	return (
		<div className="order-details">
			<div className="order-details-container">
				<OrdersImage />
				{order && <OrdersForm />} {!order && <div>lalalal</div>}
			</div>
		</div>
	);
};
