import React, { useContext, useEffect, useState } from "react";
import { OrdersList } from "../components/OrdersList";
import { HiOutlineEmojiSad } from "react-icons/hi";
import Axios from "axios";
import "./Orders.css";
import AuthContext from "../store/auth-context";
import { useHttp } from "../hooks/use-http";
export const Orders = () => {
	const [ordersList, setOrdersList] = useState([]);
	const { userId } = useContext(AuthContext);

	const ordersData = (order) => {
		let loadedData = [];
		for (const key in order) {
			loadedData.push({
				id: order[key].id,
				items: order[key].items,
				price: order[key].price,
				deliveryStatus: order[key].deliveryStatus,
				userId: order[key].userId,
			});
		}
		setOrdersList(loadedData.filter((item) => item.userId === userId));
	};
	const { sendRequest, httpError, isLoading } = useHttp(
		{
			url: "https://itperspectives-dda22-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
			httpMethod: Axios.get,
		},
		ordersData
	);
	useEffect(() => {
		sendRequest();
	}, []);

	if (httpError) {
		return (
			<div className="orders">
				<div className="home-page-error">{httpError}</div>
			</div>
		);
	}
	if (isLoading) {
		return (
			<div className="orders">
				<div className="home-page-loading">Loading ...</div>
			</div>
		);
	}
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
