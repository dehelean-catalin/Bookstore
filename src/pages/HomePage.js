import React, { useEffect, useState } from "react";

import "./HomePage.css";
import Axios from "axios";
import { Carousel } from "../components/Carousel";
import { SliderData } from "../components/SliderData";
import { Books } from "../components/Books";
export const HomePage = (props) => {
	const [books, setBooks] = useState();

	useEffect(() => {
		Axios.get("https://api.itbook.store/1.0/search/mongodb")
			.then((response) => {
				setBooks(response.data.books.slice(0, 6));
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	}, []);

	return (
		<main>
			<Carousel slides={SliderData} />
			{books && <Books booksList={books} />}
		</main>
	);
};
