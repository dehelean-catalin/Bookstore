import React from "react";
import "./Book.css";
import { Link } from "react-router-dom";
import { AddToCartBtn } from "./AddToCartBtn";
export const Book = (props) => {
	const book = props.book;
	return (
		<div className="card">
			<Link to={`/view-book/${book.isbn13}`} style={{ textDecoration: "none" }}>
				<img className="card-image" src={book.image} alt="not found" />
				<div className="book-container">
					<div className="card-details">
						<div className="card-title">{book.title}</div>
						<div className="card-price">{book.price}</div>
					</div>
					<div className="card-author">Autor</div>
				</div>
			</Link>
			<AddToCartBtn book={book} setProduct={props.setProduct} />
		</div>
	);
};
