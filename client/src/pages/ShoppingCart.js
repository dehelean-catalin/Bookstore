import React, { useContext, useEffect } from "react";
import { ShoppingCartList } from "../components/ShoppingCartList";
import { Link } from "react-router-dom";
import "./ShoppingCart.css";
import { HiOutlineEmojiSad } from "react-icons/hi";
import OrdersContext from "../store/orders-context";
import Axios from "axios";
import { useHttp } from "../hooks/use-http";
import AuthContext from "../store/auth-context";
import ShoppingCartContext from "../store/shopping-cart-context";
export const ShoppingCart = () => {
	const { orderHandler } = useContext(OrdersContext);
	const { shoppingCart, shoppingCartHandler } = useContext(ShoppingCartContext);
	const { userId } = useContext(AuthContext);
	const shoppingCardData = (items) => {
		let loadedData = [];
		for (const key in items) {
			loadedData.push({
				id: key,
				userId: items[key].userId,
				title: items[key].title,
				price: items[key].price,
				icon: items[key].icon,
				author: items[key].author,
				description: items[key].description,
			});
		}
		console.log(userId);
		shoppingCartHandler(loadedData.filter((item) => item.userId === userId));
	};
	const { sendRequest, httpError, isLoading } = useHttp(
		{
			url: "https://itperspectives-dda22-default-rtdb.europe-west1.firebasedatabase.app/shopping-cart.json",
			httpMethod: Axios.get,
		},
		shoppingCardData
	);
	useEffect(() => {
		sendRequest();
	}, []);

	const priceValues = shoppingCart.map((item) => item.price);
	const totalPrice = priceValues.reduce((a, b) => a + b, 0).toFixed(2);
	const orderId = Math.floor(Math.random() * 90000) + 10000;
	const shoppingCartIsEmpty = shoppingCart.length === 0;

	const handlePlaceOrder = () => {
		orderHandler({
			userId: userId,
			id: orderId,
			items: shoppingCart.length,
			deliveryStatus: "In progress",
			price: totalPrice,
		});
	};
	if (httpError) {
		return (
			<div className="shopping-cart">
				<div className="home-page-error">{httpError}</div>
			</div>
		);
	}
	if (isLoading) {
		return (
			<div className="shopping-cart">
				<div className="home-page-loading">Loading ...</div>
			</div>
		);
	}
	return (
		<div className="shopping-cart">
			<div className="shopping-cart-container">
				<div className="shopping-cart-title">Your Products</div>

				{!shoppingCartIsEmpty && <ShoppingCartList bookList={shoppingCart} />}
				{shoppingCartIsEmpty && (
					<div className="shopping-cart-empty">
						<HiOutlineEmojiSad className="empty-icon" /> Shopping cart is empty
					</div>
				)}
				<div className="shopping-cart-total">
					Total:<div className="price">${totalPrice}</div>
				</div>
				<div className="shopping-cart-buttons">
					<Link to="/" className="contiune-shopping-btn">
						Continue Shopping
					</Link>
					{shoppingCartIsEmpty && <></>}
					{!shoppingCartIsEmpty && (
						<Link to={`/order-details/${orderId}`} className="place-order-btn" onClick={handlePlaceOrder}>
							Place Order
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};
