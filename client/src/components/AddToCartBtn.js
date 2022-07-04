import React from "react";
import "./AddToCartBtn.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Axios from "axios";

export const AddToCartBtn = ({ book }) => {
	const { id, icon, title, price, author } = book;
	const addToCart = () => {
		Axios.post("https://itperspectives-dda22-default-rtdb.europe-west1.firebasedatabase.app/shopping-cart.json", {
			id: id,
			icon: icon,
			title: title,
			price: price,
			author: author,
		}).catch((err) => {
			console.log(err.response.data);
		});
	};

	return (
		<button className="card-button" onClick={addToCart}>
			<AiOutlineShoppingCart />
			<h3>Add to cart</h3>
		</button>
	);
};
