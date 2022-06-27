import React, { useContext } from "react";
import "./AddToCartBtn.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ShoppingCartContext } from "../store/shopping-cart-context";

export const AddToCartBtn = (props) => {
	const book = props.book;
	const newValues = {
		id: book.isbn13,
		image: book.image,
		title: book.title,
		price: book.price,
	};

	const addBook = useContext(ShoppingCartContext);

	const addToCart = () => {
		addBook.handleShoppingCart([...addBook.products, newValues]);
	};

	return (
		<button className="card-button" onClick={addToCart}>
			<AiOutlineShoppingCart />
			<h3>Add to cart</h3>
		</button>
	);
};
