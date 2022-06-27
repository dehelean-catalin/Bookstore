import React, { useContext, useState } from "react";
import { ShoppingCartList } from "../components/ShoppingCartList";
import { Link } from "react-router-dom";
import "./ShoppingCart.css";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { OrdersContext } from "../store/orders-context";
import { ShoppingCartContext } from "../store/shopping-cart-context";
import { BiBook } from "react-icons/bi";
export const ShoppingCart = (props) => {
	const bookList = props.products;
	const priceValues = bookList.map((item) => +item.price.slice(1));
	const totalPrice = priceValues.reduce((a, b) => a + b, 0).toFixed(2);
	const product = useContext(ShoppingCartContext);
	const order = useContext(OrdersContext);

	const orderId = Math.floor(Math.random() * 90000) + 10000;

	const handlePlaceOrder = () => {
		order.ordersHandler([
			...order.order,
			{
				id: orderId,
				icon: <BiBook />,
				items: bookList.length,
				deliveryStatus: "In progress",
				price: totalPrice,
			},
		]);
		product.handleShoppingCart([]);
	};

	let shoppingCart = (
		<div className="shopping-cart-empty">
			<HiOutlineEmojiSad className="empty-icon" /> Shopping cart is empty
		</div>
	);
	let placeOrder = <></>;

	if (bookList.length !== 0) {
		shoppingCart = <ShoppingCartList bookList={bookList} />;
		placeOrder = (
			<Link to={`/order-details/${orderId}`} className="place-order-btn" disabled onClick={handlePlaceOrder}>
				Place Order
			</Link>
		);
	}

	return (
		<div className="shopping-cart">
			<div className="shopping-cart-container">
				<div className="shopping-cart-title">Your Products</div>
				{shoppingCart}
				{/* {copyOfBooklist && copyOfBooklist.map((book) => <>{book}</>)} */}
				<div className="shopping-cart-total">
					Total:<div className="price">${totalPrice}</div>
				</div>
				<div className="shopping-cart-buttons">
					<Link to="/" className="contiune-shopping-btn">
						Continue Shopping
					</Link>
					{placeOrder}
				</div>
			</div>
		</div>
	);
};
