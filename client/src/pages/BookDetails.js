import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Details } from "../components/Details";

export const BookDetails = () => {
	const { id } = useParams();
	const [bookDetails, setBookDetails] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState();
	useEffect(() => {
		Axios.get(`https://itperspectives-dda22-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`)
			.then((response) => {
				setBookDetails(response.data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err.response.data);
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
	return <div className="bookDetails">{bookDetails && <Details book={bookDetails} />}</div>;
};
