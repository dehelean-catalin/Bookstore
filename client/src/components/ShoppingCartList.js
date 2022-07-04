import React from "react";
import { ShoppingCartItem } from "./ShoppingCartItem";
import "./ShoppingCartList.css";
export const ShoppingCartList = ({ bookList }) => {
	console.log(bookList);
	return (
		<div className="shopping-cart-list">
			{bookList.map((book, key) => (
				<ShoppingCartItem key={key} book={book} />
			))}
		</div>
	);
};
