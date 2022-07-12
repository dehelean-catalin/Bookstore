import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import { ShoppingCartContextProvider } from "./store/shopping-cart-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<AuthContextProvider>
		<ShoppingCartContextProvider>
			<App />
		</ShoppingCartContextProvider>
	</AuthContextProvider>
);
