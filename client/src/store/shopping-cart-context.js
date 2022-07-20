import React, { useState } from "react";
import Axios from "axios";
const ShoppingCartContext = React.createContext({
	shoppingCart: [],
	shoppingCartHandler: (data) => {},
	addToCart: (book, userId) => {},
	deleteItemFromShoppingCart: (id, userId) => {},
	getShoppingCart: (userId) => {},
});

export const ShoppingCartContextProvider = (props) => {
	const [shoppingCart, setShoppingCart] = useState([]);

	const shoppingCartHandler = (items) => {
		setShoppingCart(items);
	};

	const getShoppingCart = (userId) => {
		Axios.get("https://itperspectives-dda22-default-rtdb.europe-west1.firebasedatabase.app/shopping-cart.json").then(
			(response) => {
				const loadedData = [];
				for (const key in response.data) {
					loadedData.push({
						id: key,
						userId: response.data[key].userId,
						title: response.data[key].title,
						price: response.data[key].price,
						icon: response.data[key].icon,
						author: response.data[key].author,
						description: response.data[key].description,
					});
				}
				setShoppingCart(loadedData.filter((item) => item.userId === userId));
			}
		);
	};

	const addToCart = (book, userId) => {
		Axios.post("https://itperspectives-dda22-default-rtdb.europe-west1.firebasedatabase.app/shopping-cart.json", {
			...book,
			userId: userId,
		})
			.then(() => {
				getShoppingCart(userId);
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	};
	const deleteItemFromShoppingCart = (id, userId) => {
		Axios.delete(`https://itperspectives-dda22-default-rtdb.europe-west1.firebasedatabase.app/shopping-cart/${id}.json`)
			.then(() => {
				Axios.get("https://itperspectives-dda22-default-rtdb.europe-west1.firebasedatabase.app/shopping-cart.json")
					.then(() => {
						getShoppingCart(userId);
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
		addToCart,
		deleteItemFromShoppingCart,
		getShoppingCart,
	};
	return <ShoppingCartContext.Provider value={contextValue}>{props.children}</ShoppingCartContext.Provider>;
};
export default ShoppingCartContext;
