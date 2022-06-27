import React from "react";
import { ShoppingCartItem } from "./ShoppingCartItem";
import "./ShoppingCartList.css";
export const ShoppingCartList = (props) => {
	const productsList = props.bookList.map((item, key) => (
		<ShoppingCartItem key={key} book={item} bookList={props.bookList} setBookList={props.setBookList} />
	));
	return <div className="shopping-cart-list">{productsList}</div>;
};
