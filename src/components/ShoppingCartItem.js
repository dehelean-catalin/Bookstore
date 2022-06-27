import React, { useContext } from "react";
import "./ShoppingCartItem.css";
import { IoTrashOutline } from "react-icons/io5";
import { ShoppingCartContext } from "../store/shopping-cart-context";
import { BiBook } from "react-icons/bi";
export const ShoppingCartItem = (props) => {
	const book = props.book;
	const booksList = [...props.bookList];
	const index = props.bookList.indexOf(book);
	const newBooks = useContext(ShoppingCartContext);

	const handleRemove = () => {
		booksList.splice(index, 1);

		newBooks.handleShoppingCart(booksList);
	};

	return (
		<div className="shopping-cart-item">
			<div className="shopping-cart-item-container">
				<img className="book-image" src={book.image} alt="image not found" />
				<div className="shopping-cart-item-info">
					<div className="book-title">{book.title}</div>
					<div className="book-author">
						<span>by</span>Author
					</div>
				</div>
			</div>
			<div className="shopping-cart-item-price">
				<div className="book-price">{book.price}</div>
				<button className="remove-btn" onClick={handleRemove}>
					<IoTrashOutline className="trash-icon" />
					Remove
				</button>
			</div>
		</div>
	);
};
