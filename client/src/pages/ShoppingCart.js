import React, { useContext, useEffect } from "react";
import { ShoppingCartList } from "../components/ShoppingCartList";
import { Link } from "react-router-dom";
import "./ShoppingCart.css";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { OrdersContext } from "../store/orders-context";
import Axios from "axios";
import { ShoppingCartContext } from "../store/shopping-cart-context";
import { useHttp } from "../hooks/use-http";
export const ShoppingCart = () => {
	const { orderHandler } = useContext(OrdersContext);
	const { handleShoppingCart, products } = useContext(ShoppingCartContext);
	const shoppingCardData = (items) => {
		let loadedData = [];
		for (const key in items) {
			loadedData.push({
				id: key,
				title: items[key].title,
				price: items[key].price,
				icon: items[key].icon,
				author: items[key].author,
				description: items[key].description,
			});
		}
		handleShoppingCart(loadedData);
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

	const priceValues = products.map((item) => item.price);
	const totalPrice = priceValues.reduce((a, b) => a + b, 0).toFixed(2);
	const orderId = Math.floor(Math.random() * 90000) + 10000;
	const shoppingCartIsEmpty = products.length === 0;

	const handlePlaceOrder = () => {
		orderHandler({
			id: orderId,
			items: products.length,
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

				{!shoppingCartIsEmpty && <ShoppingCartList bookList={products} />}
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
