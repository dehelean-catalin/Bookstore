import React, { useEffect, useState } from "react";
import { OrdersList } from "../components/OrdersList";
import { HiOutlineEmojiSad } from "react-icons/hi";
import Axios from "axios";
import "./Orders.css";
export const Orders = () => {
	const [ordersList, setOrdersList] = useState([]);
	useEffect(() => {
		Axios.get("https://itperspectives-dda22-default-rtdb.europe-west1.firebasedatabase.app/orders.json")
			.then((response) => {
				let loadedOrders = [];
				for (const key in response.data) {
					loadedOrders.push({
						id: response.data[key].id,
						items: response.data[key].items,
						price: response.data[key].price,
						deliveryStatus: response.data[key].deliveryStatus,
					});
				}
				setOrdersList(loadedOrders);
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	}, []);
	return (
		<div className="orders">
			<div className="orders-container">
				<div className="orders-title">Your Products</div>
				{ordersList.length !== 0 && <OrdersList ordersList={ordersList} />}
				{ordersList.length === 0 && (
					<div className="orders-empty-message">
						<HiOutlineEmojiSad className="empty-icon" />
						Orders List is empty
					</div>
				)}
			</div>
		</div>
	);
};
