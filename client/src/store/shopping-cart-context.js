import React, { useState, useEffect } from "react";
import Axios from "axios";
const ShoppingCartContext = React.createContext({
	shoppingCart: [],
	counter: 0,
	shoppingCartHandler: () => {},
	addToCart: (book, userId) => {},
	deleteItemFromShoppingCart: (id, userId) => {},
	initialCounterValue: (userId) => {},
});

export const ShoppingCartContextProvider = (props) => {
	const [shoppingCart, setShoppingCart] = useState([]);
	const [counter, setCounter] = useState(0);

	const shoppingCartHandler = (items) => {
		setShoppingCart(items);
	};

	const incrementCounter = () => {
		setCounter(counter + 1);
	};
	const decrementCounter = () => {
		setCounter(counter - 1);
	};
	const initialCounterValue = (userId) => {
		Axios.get("https://itperspectives-dda22-default-rtdb.europe-west1.firebasedatabase.app/shopping-cart.json").then(
			(response) => {
				let loadedData = [];
				for (const key in response.data) {
					loadedData.push({
						userId: response.data[key].userId,
					});
				}
				const newData = loadedData.filter((book) => book.userId == userId);
				response.data && setCounter(newData.length);
			}
		);
	};

	const addToCart = (book, userId) => {
		Axios.post("https://itperspectives-dda22-default-rtdb.europe-west1.firebasedatabase.app/shopping-cart.json", {
			...book,
			userId: userId,
		})
			.then(() => {
				incrementCounter();
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	};
	const deleteItemFromShoppingCart = (id, userId) => {
		Axios.delete(`https://itperspectives-dda22-default-rtdb.europe-west1.firebasedatabase.app/shopping-cart/${id}.json`)
			.then(() => {
				Axios.get("https://itperspectives-dda22-default-rtdb.europe-west1.firebasedatabase.app/shopping-cart.json")
					.then((response) => {
						console.log(userId);
						console.log(response.data);
						let loadedShoppingCart = [];
						for (const key in response.data) {
							loadedShoppingCart.push({
								id: key,
								userId: response.data[key].userId,
								title: response.data[key].title,
								price: response.data[key].price,
								icon: response.data[key].icon,
								author: response.data[key].author,
							});
						}
						setShoppingCart(loadedShoppingCart.filter((item) => item.userId == userId));
						decrementCounter();
					})
					.catch((err) => {
						console.log(err.response.data);
					});
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	};

	const contextValue = {
		shoppingCart,
		shoppingCartHandler,
		counter,
		addToCart,
		deleteItemFromShoppingCart,
		initialCounterValue,
	};
	return <ShoppingCartContext.Provider value={contextValue}>{props.children}</ShoppingCartContext.Provider>;
};
export default ShoppingCartContext;
