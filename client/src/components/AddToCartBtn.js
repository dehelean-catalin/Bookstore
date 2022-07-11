import React, { useContext } from "react";
import "./AddToCartBtn.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Axios from "axios";
import { ShoppingCartContext } from "../store/shopping-cart-context";

export const AddToCartBtn = ({ book }) => {
	const { counter, setCounter } = useContext(ShoppingCartContext);
	const addToCart = () => {
		Axios.post("https://itperspectives-dda22-default-rtdb.europe-west1.firebasedatabase.app/shopping-cart.json", book)
			.then(() => {
				setCounter(counter + 1);
			})
			.catch((err) => {
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
