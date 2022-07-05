import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./OrdersForm.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useInput } from "../hooks/use-input";
import { OrdersContext } from "../store/orders-context";
import { OrderDetails } from "../pages/OrderDetails";

const DEFAULT_INITIAL_VALUES = {
	firstName: "",
	lastName: "",
	billingCountry: "",
	billingAddress: "",
	billingPhone: "",
	deliveryCountry: "",
	deliveryAddress: "",
	deliveryPhone: "",
	deliveryDate: "",
	payMethod: "",
	observation: "",
	recomandation: "",
};
export const OrdersForm = () => {
	const { order } = useContext(OrdersContext);
	const { id: orderId } = useParams();
	const [initialValues, setIntialValues] = useState(DEFAULT_INITIAL_VALUES);
	useEffect(() => {
		Axios.get("https://itperspectives-dda22-default-rtdb.europe-west1.firebasedatabase.app/orders.json")
			.then((response) => {
				let loadedShoppingCart = [];
				for (const key in response.data) {
					loadedShoppingCart.push({
						id: response.data[key].id,
						price: response.data[key].price,
						items: response.data[key].items,
						costumerDetails: response.data[key].costumerDetails,
						delveryStatus: response.data[key].deliveryStatus,
					});
				}
				console.log(loadedShoppingCart);
				if (loadedShoppingCart.find((order) => order.id === +orderId)) {
					setIntialValues({
						firstName: "asas",
						lastName: "aaaaa",
						billingCountry: "Romania",
						billingAddress: "aaa",
						billingPhone: "aaaa",
						deliveryCountry: "Romania",
						deliveryAddress: "Str Principala",
						deliveryPhone: "0763720901",
						deliveryDate: "",
						payMethod: "payMethodValue",
						observation: "observationsValue",
						recomandation: "recomandation",
					});
				}
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	}, []);

	let navigate = useNavigate();

	const {
		value: firstNameValue,
		hasError: firstNameError,
		isValid: firstNameValid,
		valueChangeHandler: firstNameChangeHandler,
		inputBlurHandler: firstNameBlurHandler,
	} = useInput((value) => value.trim() !== "", initialValues.firstName);
	const {
		value: lastNameValue,
		hasError: lastNameError,
		isValid: lastNameValid,
		valueChangeHandler: lastNameChangehandler,
		inputBlurHandler: lastNameBlurHandler,
	} = useInput((value) => value.trim() !== "", initialValues.lastName);
	const {
		value: billingCountryValue,
		isValid: billingCountryValid,
		hasError: billingCountryError,
		valueChangeHandler: billingCountryChangehandler,
		inputBlurHandler: billingCountryBlurHandler,
	} = useInput((value) => value.trim() !== "", initialValues.billingCountry);
	const {
		value: billingAddressValue,
		isValid: billingAddressValid,
		hasError: billingAddressError,
		valueChangeHandler: billingAddressChangehandler,
		inputBlurHandler: billingAddressBlurHandler,
	} = useInput((value) => value.trim() !== "", initialValues.billingCountry);
	const {
		value: billingPhoneValue,
		isValid: billingPhoneValid,
		hasError: billingPhoneError,
		valueChangeHandler: billingPhoneChangehandler,
		inputBlurHandler: billingPhoneBlurHandler,
	} = useInput((value) => value.trim() !== "", initialValues.billingPhone);
	const {
		value: deliveryCountryValue,
		isValid: deliveryCountryValid,
		hasError: deliveryCountryError,
		valueChangeHandler: deliveryCountryChangehandler,
		inputBlurHandler: deliveryCountryBlurHandler,
	} = useInput((value) => value.trim() !== "", initialValues.deliveryCountry);
	const {
		value: deliveryAddressValue,
		isValid: deliveryAddressValid,
		hasError: deliveryAddressError,
		valueChangeHandler: deliveryAddressChangehandler,
		inputBlurHandler: deliveryAddressBlurHandler,
	} = useInput((value) => value.trim() !== "", initialValues.deliveryAddress);
	const {
		value: deliveryDateValue,
		isValid: deliveryDateValid,
		hasError: deliveryDateError,
		valueChangeHandler: deliveryDateChangehandler,
		inputBlurHandler: deliveryDateBlurHandler,
	} = useInput((value) => value.trim() !== "", initialValues.deliveryDate);
	const {
		value: deliveryPhoneValue,
		isValid: deliveryPhoneValid,
		hasError: deliveryPhoneError,
		valueChangeHandler: deliveryPhoneChangehandler,
		inputBlurHandler: deliveryPhoneBlurHandler,
	} = useInput((value) => value.trim() !== "", initialValues.deliveryPhone);

	const { value: payMethodValue, isValid: payMethodValid, valueChangeHandler: payMethodChangehandler } = useInput(
		(value) => value.trim() !== "",
		initialValues.payMethod
	);
	const { value: observationsValue, valueChangeHandler: observationsChangehandler } = useInput(
		(value) => value.trim() !== "",
		initialValues.observation
	);

	const [recomandation, setRecomandation] = useState(false);
	const [isAddressDeliveryBtnActive, setIsAddressDeliveryBtnActive] = useState(false);

	const inputFirstName = !firstNameError ? "cd-input-valid" : "cd-input-invalid";
	const inputLastName = !lastNameError ? "cd-input-valid" : "cd-input-invalid";

	const inputBillingCountry = !billingCountryError ? "form-select-valid" : "form-select-invalid";
	const inputBillingAddress = !billingAddressError ? "address-input-valid" : "address-input-invalid";
	const inputBillingPhone = !billingPhoneError ? "address-input-valid" : "address-input-invalid";
	const deliveryAddresHandler = (e) => {
		setIsAddressDeliveryBtnActive(!isAddressDeliveryBtnActive);
	};

	const inputDeliveryCountry =
		!deliveryCountryError || isAddressDeliveryBtnActive ? "form-select-valid" : "form-select-invalid";
	const inputDeliveryAddress =
		!deliveryAddressError || isAddressDeliveryBtnActive ? "address-input-valid" : "address-input-invalid";
	const inputDeliveryPhone =
		!deliveryPhoneError || isAddressDeliveryBtnActive ? "address-input-valid" : "address-input-invalid";
	const inputDeliveryDate = !deliveryDateError ? "address-input-valid" : "address-input-invalid";

	const isFormValid =
		!firstNameValid ||
		!lastNameValid ||
		!billingCountryValid ||
		!billingAddressValid ||
		!billingPhoneValid ||
		(!isAddressDeliveryBtnActive && (!deliveryCountryValid || !deliveryAddressValid || !deliveryPhoneValid)) ||
		!deliveryDateValid ||
		!payMethodValid;

	const submitHandler = (e) => {
		e.preventDefault();
		const costumerDetails = {
			firstName: firstNameValue,
			lastName: lastNameValue,
			billingCountry: billingCountryValue,
			billingAddress: billingAddressValue,
			billingPhone: billingPhoneValue,
			isAddressDeliveryBtnActive: isAddressDeliveryBtnActive,
			deliveryCountry: isAddressDeliveryBtnActive ? billingCountryValue : deliveryCountryValue,
			deliveryAddress: isAddressDeliveryBtnActive ? billingAddressValue : deliveryAddressValue,
			deliveryPhone: isAddressDeliveryBtnActive ? billingPhoneValue : deliveryPhoneValue,
			payMethod: payMethodValue,
			observation: observationsValue,
			recomandation: recomandation,
		};
		Axios.post("https://itperspectives-dda22-default-rtdb.europe-west1.firebasedatabase.app/orders.json", {
			...order,
			costumerDetails,
		})
			.then(() => {
				navigate("/orders");
				Axios.delete(
					"https://itperspectives-dda22-default-rtdb.europe-west1.firebasedatabase.app/shopping-cart.json"
				).catch((err) => {
					console.log(err.response.data);
				});
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	};

	return (
		<form className="form" onSubmit={submitHandler}>
			<div className="form-title">Order Details</div>
			<label className="contact-details">Contact details</label>
			<div className="contact-details-container">
				<input
					id={inputFirstName}
					value={firstNameValue}
					placeholder="First Name"
					onChange={firstNameChangeHandler}
					onBlur={firstNameBlurHandler}
				/>
				<input
					id={inputLastName}
					value={lastNameValue}
					placeholder="Last Name"
					onChange={lastNameChangehandler}
					onBlur={lastNameBlurHandler}
				/>
			</div>
			<div className="orders-section">
				<label className="billing-address">Billing Address</label>
				<select
					id={inputBillingCountry}
					value={billingCountryValue}
					onChange={billingCountryChangehandler}
					onBlur={billingCountryBlurHandler}
					disabled={isAddressDeliveryBtnActive}
				>
					<option value="" defaultValue hidden>
						Country Selection
					</option>
					<option value="Romania">Romania</option>
					<option value="Hungary">Hungary</option>
					<option value="Bulgaria">Bulgaria</option>
				</select>
				<input
					id={inputBillingAddress}
					value={billingAddressValue}
					placeholder="Address"
					onChange={billingAddressChangehandler}
					onBlur={billingAddressBlurHandler}
					disabled={isAddressDeliveryBtnActive}
				/>
				<input
					id={inputBillingPhone}
					value={billingPhoneValue}
					placeholder="Phone Number"
					onChange={billingPhoneChangehandler}
					onBlur={billingPhoneBlurHandler}
					disabled={isAddressDeliveryBtnActive}
				/>
			</div>
			<div className="devilery-chackbox">
				<input
					className="checkbox"
					type="checkbox"
					onClick={deliveryAddresHandler}
					disabled={!billingAddressValue || !billingCountryValue || !billingPhoneValue}
				/>
				<label>Use address for delivery </label>
			</div>
			<div className="orders-section">
				<label className="billing-address">Delivery Address</label>
				<select
					id={inputDeliveryCountry}
					value={isAddressDeliveryBtnActive ? billingCountryValue : deliveryCountryValue}
					onChange={deliveryCountryChangehandler}
					onBlur={deliveryCountryBlurHandler}
					disabled={isAddressDeliveryBtnActive}
				>
					<option value="" defaultValue hidden>
						Country Selection
					</option>
					<option value="Romania">Romania</option>
					<option value="Hungary">Hungary</option>
					<option value="Bulgaria">Bulgaria</option>
				</select>
				<input
					id={inputDeliveryAddress}
					value={isAddressDeliveryBtnActive ? billingAddressValue : deliveryAddressValue}
					placeholder="Address"
					onChange={deliveryAddressChangehandler}
					onBlur={deliveryAddressBlurHandler}
					disabled={isAddressDeliveryBtnActive}
				/>
				<input
					id={inputDeliveryPhone}
					value={isAddressDeliveryBtnActive ? billingPhoneValue : deliveryPhoneValue}
					placeholder="Phone Number"
					onChange={deliveryPhoneChangehandler}
					onBlur={deliveryPhoneBlurHandler}
					disabled={isAddressDeliveryBtnActive}
				/>
			</div>
			<label className="billing-address">Payment Type</label>
			<div className="radio-btn-container" onChange={payMethodChangehandler}>
				<input type="radio" id="online" name="pay-method" value="Online" />
				<label>Online</label>

				<input type="radio" id="cash" name="pay-method" value="Cash" />
				<label>Cash</label>
			</div>
			<label className="billing-address">Delivery Date</label>
			<input
				type="date"
				id={inputDeliveryDate}
				value={deliveryDateValue}
				placeholder="Delivery Date"
				onChange={deliveryDateChangehandler}
				onBlur={deliveryDateBlurHandler}
			/>
			<label className="billing-address">Observations</label>
			<textarea placeholder="Obeservations" value={observationsValue} onChange={observationsChangehandler} />
			<label className="billing-address">Would You Recommend Us?</label>
			<div className="recommend-checkbox">
				<input
					className="checkbox"
					type="checkbox"
					value={recomandation}
					onClick={() => {
						setRecomandation(true);
					}}
				/>
				<label>Would You Recommend Us?</label>
			</div>
			<div className="order-btns">
				<Link to="/cart" className="cancel-btn">
					Cancel Order
				</Link>

				<button type="submit" className="plc-order-btn" disabled={isFormValid}>
					Place Order
				</button>
			</div>
		</form>
	);
};
