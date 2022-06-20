import React, { useEffect, useState } from "react";

import "./HomePage.css";
import Axios from "axios";
import { Carousel } from "../components/Carousel";
import { CardContainer } from "../components/CardContainer";
import { SliderData } from "../components/SliderData";
export const HomePage = () => {
	const [books, setBooks] = useState();
	useEffect(() => {
		Axios.get("https://api.itbook.store/1.0/search/mongodb")
			.then((response) => {
				console.log(response.data);
				setBooks(response.data.books.slice(0, 6));
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	}, []);

	return (
		<div>
			<main>
				<Carousel slides={SliderData} />
				{books && <CardContainer booksList={books} />}
			</main>
		</div>
	);
};
