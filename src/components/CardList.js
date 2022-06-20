import React from "react";
import { Card } from "./Card";
import "./CardList.css";
export const CardList = (props) => {
	console.log(props.booksList);
	return (
		<div className="card-list">
			{props.booksList.map((item) => (
				<Card key={item.isbn13} image={item.image} title={item.title} price={item.price} />
			))}
		</div>
	);
};
