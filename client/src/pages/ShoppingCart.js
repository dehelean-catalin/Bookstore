import React, { useState, useContext, useEffect } from "react";
import { ShoppingCartList } from "../components/ShoppingCartList";
import { Link } from "react-router-dom";
import "./ShoppingCart.css";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { OrdersContext } from "../store/orders-context";
import Axios from "axios";
import { ShoppingCartContext } from "../store/shopping-cart-context";
import { RemoveContext } from "../store/remove-context";
export const ShoppingCart = () => {
	const { orderHandler } = useContext(OrdersContext);
	const { handleShoppingCart, products } = useContext(ShoppingCartContext);
	const [remove, setRemove] = useState(1);
	useEffect(() => {
		Axios.get("https://itperspectives-dda22-default-rtdb.europe-west1.firebasedatabase.app/shopping-cart.json")
			.then((response) => {
				let loadedShoppingCart = [];
				for (const key in response.data) {
					loadedShoppingCart.push({
						id: key,
						title: response.data[key].title,
						price: response.data[key].price,
						icon: response.data[key].icon,
						author: response.data[key].author,
					});
				}
				handleShoppingCart(loadedShoppingCart);
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	}, [remove]);

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
	return (
		<RemoveContext.Provider value={{ removeHandler: setRemove, remove: remove }}>
			<div className="shopping-cart">
				<div className="shopping-cart-container">
					<div className="shopping-cart-title">Your Products</div>

					{!shoppingCartIsEmpty && (
						<ShoppingCartList
							bookList={products}
							setRemove={(remove) => {
								setRemove(remove);
							}}
						/>
					)}
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
		</RemoveContext.Provider>
	);
};