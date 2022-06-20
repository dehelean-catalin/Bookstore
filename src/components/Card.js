import React from "react";
import "./Card.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
export const Card = (props) => {
	return (
		<div className="card">
			<img className="card-image" src={props.image} alt="not found" />
			<section>
				<div className="card-details">
					<div className="card-title">{props.title}</div>
					<div className="card-price">{props.price}</div>
				</div>
				<div className="card-author">Autor</div>
			</section>

			<button>
				<AiOutlineShoppingCart />
				<h3>Add to cart</h3>
			</button>
		</div>
	);
};
