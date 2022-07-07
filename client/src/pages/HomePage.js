import React, { useEffect, useState } from "react";
import { Carousel } from "../components/Carousel";
import { SliderData } from "../components/SliderData";
import { BookList } from "../components/BookList";
import "./HomePage.css";
import { useHttp } from "../hooks/use-http";
import Axios from "axios";
export const HomePage = () => {
	const [books, setBooks] = useState([]);

	const transfromData = (books) => {
		let loadedData = [];
		for (const key in books) {
			loadedData.push({
				id: key,
				title: books[key].title,
				price: books[key].price,
				icon: books[key].icon,
				author: books[key].author,
				description: books[key].description,
			});
		}
		setBooks(loadedData);
	};
	const { sendRequest, httpError, isLoading } = useHttp(
		{
			url: "https://itperspectives-dda22-default-rtdb.europe-west1.firebasedatabase.app/books.json",
			httpMethod: Axios.get,
		},
		transfromData
	);
	useEffect(() => {
		sendRequest();
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
