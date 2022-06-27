import React from "react";
import "./OrdersFormSection.css";
export const OrdersFormSection = (props) => {
	return (
		<div className="orders-section">
			<label className="billing-address">{props.title}</label>
			<select className="form-select">
				<option value="" defaultValue hidden>
					Country Selection
				</option>
				<option value="1">Romania</option>
				<option value="2">Hungary</option>
				<option value="3">Bulgaria</option>
			</select>
			<input className="input" placeholder="Address" />
			<input className="input" placeholder="Phone Number" />
		</div>
	);
};
