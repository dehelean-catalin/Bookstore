import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Details } from "../components/Details";
import "./BookDetails.css";

export const BookDetails = () => {
	const params = useParams();
	const [bookDetails, setBookDetails] = useState<undefined>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [httpError, setHttpError] = useState<string | undefined>();
	useEffect(() => {
		Axios.get(`https://itperspectives-dda22-default-rtdb.europe-west1.firebasedatabase.app/books/${params.id}.json`)
			.then((response) => {
				setBookDetails(response.data);
			})
			.catch((err) => {
				setHttpError(err.response.data);
			})
			.finally(() => {
				setIsLoading(false);
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
	return <div className="book-details">{bookDetails && <Details book={bookDetails} />}</div>;
};
