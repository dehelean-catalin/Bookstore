import React from "react";
import { Book } from "./Book";
import "./BookList.css";
export const BookList = (props) => {
	const bookList = props.booksList.map((item) => <Book key={item.isbn13} book={item} setProduct={props.setProduct} />);
	return <div className="card-list">{bookList}</div>;
};
