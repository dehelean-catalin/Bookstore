import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import { ShoppingCartContextProvider } from "./store/shopping-cart-context";
import { OrdersContextProvider } from "./store/orders-context";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<AuthContextProvider>
		<ShoppingCartContextProvider>
			<OrdersContextProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</OrdersContextProvider>
		</ShoppingCartContextProvider>
	</AuthContextProvider>
);
