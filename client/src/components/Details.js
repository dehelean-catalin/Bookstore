import React from "react";
import { AddToCartBtn } from "./AddToCartBtn";
import "./Details.css";
export const Details = ({ book }) => {
	const { icon, title, price, author, description } = book;
	return (
		<div className="details">
			<img className="details-image" src={icon} alt="not found" />
			<div className="details-container">
				<div className="details-container-info">
					<h3 className="details-title"> {title}</h3>
					<h3 className="details-price">${price}</h3>
				</div>
				<div className="details-author-container">
					<h3 className="details-author-by">by</h3>
					<div className="details-author">{author}</div>
				</div>
				<h3 className="details-description"> {description}</h3>

				<AddToCartBtn book={book} />
			</div>
		</div>
	);
};
