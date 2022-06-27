import React from "react";
import { AddToCartBtn } from "./AddToCartBtn";
import "./Details.css";
export const Details = (props) => {
	const book = props.book;
	return (
		<div className="details">
			<img className="details-image" src={book.image} alt="book image" />
			<div className="details-container">
				<div className="details-container-info">
					<h3 className="details-title"> {book.title}</h3>
					<h3 className="details-price">{book.price}</h3>
				</div>
				<div className="details-author-container">
					<h3 className="details-author-by">by</h3>
					<div className="details-author">{book.authors}</div>
				</div>
				<h3 className="details-description"> {book.desc}</h3>

				<AddToCartBtn book={book} />
			</div>
		</div>
	);
};
