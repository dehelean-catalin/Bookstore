import React from "react";
import { Book } from "./Book";
import "./BookList.css";
export const BookList = ({ booksList }) => {
	return (
		<div className="card-list">
			{booksList.map((book) => (
				<Book key={book.id} book={book} />
			))}
		</div>
	);
};
