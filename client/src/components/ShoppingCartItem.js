import React, { useContext } from "react";
import "./ShoppingCartItem.css";
import { IoTrashOutline } from "react-icons/io5";

import ShoppingCartContext from "../store/shopping-cart-context";
import AuthContext from "../store/auth-context";
export const ShoppingCartItem = ({ book }) => {
	const { id, icon, title, author, price } = book;
	const { deleteItemFromShoppingCart } = useContext(ShoppingCartContext);
	const { userId } = useContext(AuthContext);
	console.log(userId);
	return (
		<div className="shopping-cart-item">
			<div className="shopping-cart-item-container">
				<img className="book-image" src={icon} alt="not found" />
				<div className="shopping-cart-item-info">
					<div className="book-title">{title}</div>
					<div className="book-author">
						<span>by</span>
						{author}
					</div>
				</div>
			</div>
			<div className="shopping-cart-item-price">
				<div className="book-price">${price}</div>
				<button className="remove-btn" onClick={() => deleteItemFromShoppingCart(id, userId)}>
					<IoTrashOutline className="trash-icon" />
					Remove
				</button>
			</div>
		</div>
	);
};
