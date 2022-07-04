import React from "react";
import "./Book.css";
import { Link } from "react-router-dom";
import { AddToCartBtn } from "./AddToCartBtn";
export const Book = ({ book }) => {
	const { id, icon, title, price, author } = book;
	return (
		<div className="card">
			<Link to={`/view-book/${id}`} style={{ textDecoration: "none" }}>
				<img className="card-image" src={icon} alt="not found" />
				<div className="book-container">
					<div className="card-details">
						<div className="card-title">{title}</div>
						<div className="card-price">${price}</div>
					</div>
					<div className="card-author">{author}</div>
				</div>
			</Link>
			<AddToCartBtn book={book} />
		</div>
	);
};
