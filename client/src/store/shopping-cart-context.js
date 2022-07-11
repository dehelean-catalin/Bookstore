import React from "react";

export const ShoppingCartContext = React.createContext({
	handleShoppingCart: () => {},
	products: [],
	deleteItemFromShoppingCart: () => {},
	setCounter: () => {},
	counter: 0,
});
