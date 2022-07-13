import React, { useState } from "react";

const OrdersContext = React.createContext({
	order: "",
	orderHandler: (order) => {},
});
export const OrdersContextProvider = (props) => {
	const [order, setOrder] = useState();

	const orderHandler = (order) => {
		setOrder(order);
	};

	const contexValue = {
		order: order,
		orderHandler: orderHandler,
	};
	return <OrdersContext.Provider value={contexValue}>{props.children}</OrdersContext.Provider>;
};
export default OrdersContext;
