import React from "react";
import { OrdersItem } from "./OrdersItem";

export const OrdersList = ({ ordersList }) => {
	return (
		<div className="orders-list">
			{ordersList.map((order, key) => (
				<OrdersItem key={order.id} order={order} />
			))}
		</div>
	);
};
