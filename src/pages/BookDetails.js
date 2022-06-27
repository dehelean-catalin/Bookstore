import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Details } from "../components/Details";

export const BookDetails = (props) => {
	const { id: bookId } = useParams(); // destrucutrare id(ce am in obiect) bookId numele pe care il dau
	const [bookDetails, setBookDetails] = useState();

	useEffect(() => {
		Axios.get(`https://api.itbook.store/1.0/books/${bookId}`)
			.then((response) => {
				setBookDetails(response.data);
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	}, []);
	return <div className="bookDetails">{bookDetails && <Details book={bookDetails} />}</div>;
};
