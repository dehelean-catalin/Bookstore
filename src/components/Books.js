import React from "react";
import { BookList } from "./BookList";
import "./Books.css";
export const Books = (props) => {
	return (
		<div className="card-lists">
			<div className="category-title">
				<h2 className="category-title-name">Best books of the mouth</h2>
			</div>
			<BookList booksList={props.booksList} />
			<div className="category-title">
				<h2 className="category-title-name">Recently added</h2>
			</div>
			<BookList booksList={props.booksList} />
		</div>
	);
};
