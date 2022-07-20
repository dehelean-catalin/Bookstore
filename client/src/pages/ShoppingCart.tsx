import React, { FC, useContext, useEffect } from "react";
import { ShoppingCartList } from "../components/ShoppingCartList";
import { Link } from "react-router-dom";
import "./ShoppingCart.css";
import { HiOutlineEmojiSad } from "react-icons/hi";
import OrdersContext from "../store/orders-context";
import Axios from "axios";
import { useHttp } from "../hooks/use-http";
import AuthContext from "../store/auth-context";
import ShoppingCartContext from "../store/shopping-cart-context";
import { IShoppingCartBook } from "../models/models";
export const ShoppingCart = () => {
	const { orderHandler } = useContext(OrdersContext);
	const { shoppingCart, getShoppingCart } = useContext(ShoppingCartContext);
	const { userId } = useContext(AuthContext);
	// const shoppingCardData = (items:IShoppingCartBook[]) => {
	// 	let loadedData:IShoppingCartBook[] = [];
	// 	for (const key in items) {
	// 		loadedData.push({
	// 			id: key,
	// 			userId: items[key].userId,
	// 			title: items[key].title,
	// 			price: items[key].price,
	// 			icon: items[key].icon,
	// 			author: items[key].author,
	// 			description: items[key].description,
	// 		});
	// 	}
	// 	shoppingCartHandler(loadedData.filter((item) => item.userId === userId));
	// };
	// const { sendRequest, httpError, isLoading } = useHttp(
	// 	{
	// 		url: "https://itperspectives-dda22-default-rtdb.europe-west1.firebasedatabase.app/shopping-cart.json",
	// 		httpMethod: Axios.get,
	// 	},
	// 	shoppingCardData
	// );
	// useEffect(() => {
	// 	sendRequest();
	// }, []);
	useEffect(() => {
		getShoppingCart(userId);
	}, []);
	const priceValues: number[] = shoppingCart.map((item: IShoppingCartBook) => item.price);
	const totalPrice: number = +priceValues.reduce((a, b) => a + b, 0).toFixed(2);
	const orderId: number = Math.floor(Math.random() * 90000) + 10000;
	let shoppingCartIsEmpty: boolean = false;

	if (shoppingCart.length === 0) {
		shoppingCartIsEmpty = true;
	}

	const handlePlaceOrder = () => {
		orderHandler({
			userId: userId,
			id: orderId,
			items: shoppingCart.length,
			deliveryStatus: "In progress",
			price: totalPrice,
		});
	};
	// if (httpError) {
	// 	return (
	// 		<div className="shopping-cart">
	// 			<div className="home-page-error">{httpError}</div>
	// 		</div>
	// 	);
	// }
	// if (isLoading) {
	// 	return (
	// 		<div className="shopping-cart">
	// 			<div className="home-page-loading">Loading ...</div>
	// 		</div>
	// 	);
	// }
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
