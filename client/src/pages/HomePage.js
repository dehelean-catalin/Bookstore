import React, { useEffect, useState } from "react";
import { Carousel } from "../components/Carousel";
import { SliderData } from "../components/SliderData";
import { BookList } from "../components/BookList";
import "./HomePage.css";
import Axios from "axios";
export const HomePage = () => {
	const [books, setBooks] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState(null);
	useEffect(() => {
		Axios.get("https://itperspectives-dda22-default-rtdb.europe-west1.firebasedatabase.app/books.json")
			.then((response) => {
				let loadedBooks = [];
				for (const key in response.data) {
					loadedBooks.push({
						id: key,
						title: response.data[key].title,
						price: response.data[key].price,
						icon: response.data[key].icon,
						author: response.data[key].author,
						description: response.data[key].description,
					});
				}
				setBooks(loadedBooks);
				setIsLoading(false);
			})
			.catch((err) => {
				setHttpError(err.response.data);
			});
	}, []);
	if (httpError) {
		return (
			<div className="home-page">
				<div className="home-page-error">{httpError}</div>
			</div>
		);
	}
	if (isLoading) {
		return (
			<div className="home-page">
				<div className="home-page-loading">Loading ...</div>
			</div>
		);
	}
	return (
		<div className="home-page">
			<Carousel slides={SliderData} />
			<div className="home-page-category">
				<div className="category-title">Best books of the mouth</div>
				{books && <BookList booksList={books} />}

				<div className="category-title">Recently added</div>
				{books && <BookList booksList={books} />}
			</div>
		</div>
	);
};
