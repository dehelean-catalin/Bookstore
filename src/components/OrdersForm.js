import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import "./OrdersForm.css";
import { OrdersFormSection } from "./OrdersFormSection";
import { Link } from "react-router-dom";
import { OrdersContext } from "../store/orders-context";
export const OrdersForm = () => {
	const order = useContext(OrdersContext);
	// const status = useContext(DeliveryStatusContxt);
	const { id: deliveryOrderId } = useParams();
	const lala = order.order.indexOf((item) => item.id === deliveryOrderId);
	console.log(lala);
	const statusCompleted = () => {
		console.log(order.order);
		order.ordersHandler([
			...order.order,
			{
				id: deliveryOrderId,
				icon: "lala",
				items: 20,
				deliveryStatus: "Completed",
				price: 200,
			},
		]);
	};
	return (
		<form className="form">
			<div className="form-title">Order Details</div>
			<label className="contact-details">Contact details</label>
			<div className="contact-details-container">
				<input className="input-cd" placeholder="First Name" />
				<input className="input-cd" placeholder="Last Name" />
			</div>

			<OrdersFormSection title={"Billing Address"} />

			<div className="devilery-chackbox">
				<input className="checkbox" type="checkbox" />
				<label>Use address for delivery </label>
			</div>

			<OrdersFormSection title={"Delivery Address"} />

			<label className="billing-address">Payment Type</label>
			<div className="radio-btn-container">
				<div>
					<input className="radio-btn" type="radio" />
					<label>Online</label>
				</div>
				<div>
					<input className="radio-btn" type="radio" />
					<label>Cash</label>
				</div>
			</div>

			<label className="billing-address">Delivery Date</label>
			<input className="input" type="date" placeholder="Delivery Date" />

			<label className="billing-address">Observations</label>
			<textarea placeholder="Obeservations" />

			<label className="billing-address">Would You Recommend Us?</label>
			<div className="recommend-checkbox">
				<input className="checkbox" type="checkbox" />
				<label>Would You Recommend Us?</label>
			</div>
			<div className="order-btns">
				<Link to="/cart" className="cancel-btn">
					Cancel Order
				</Link>
				<Link to="/orders" className="plc-order-btn" onClick={statusCompleted}>
					Place Order
				</Link>
			</div>
		</form>
	);
};
