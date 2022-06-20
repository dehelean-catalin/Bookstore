import React from "react";
import { CardList } from "./CardList";
import "./CardContainer.css";
export const CardContainer = (props) => {
	return (
		<div className="card-lists">
			<div className="category-title">
				<h2 className="category-title-name">Best books of the mouth</h2>
			</div>
			<CardList booksList={props.booksList} />
			<div className="category-title">
				<h2 className="category-title-name">Recently added</h2>
			</div>
			<CardList booksList={props.booksList} />
		</div>
	);
};
