import React, { useContext } from "react";
import { Link } from "react-router-dom";

import ShoppingCartContext from "../store/shopping-cart-context";
import AuthContext from "../store/auth-context";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./AddToCartBtn.css";

export const AddToCartBtn = ({ book }) => {
	const { addToCart } = useContext(ShoppingCartContext);
	const { isLogin, userId } = useContext(AuthContext);

	return (
		<div>
			{isLogin && (
				<button className="card-button" onClick={() => addToCart(book, userId)}>
					<AiOutlineShoppingCart />
					<h3>Add to cart</h3>
				</button>
			)}
			{!isLogin && (
				<Link to="/login" className="card-button">
					<AiOutlineShoppingCart />
					<h3>Add to cart</h3>
				</Link>
			)}
		</div>
	);
};
