import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ShoppingCart } from "./pages/ShoppingCart";
import { Login } from "./pages/Login";
import { Orders } from "./pages/Orders";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { BookDetails } from "./pages/BookDetails";
import { OrderDetails } from "./pages/OrderDetails";
import { ShoppingCartContext } from "./store/shopping-cart-context";
import { OrdersContext } from "./store/orders-context";

function App() {
	const [products, setProduct] = useState([]);
	const [order, setOrder] = useState();
	return (
		<ShoppingCartContext.Provider value={{ handleShoppingCart: setProduct, products: products }}>
			<OrdersContext.Provider value={{ orderHandler: setOrder, order: order }}>
				<div className="App">
					<BrowserRouter>
						<Header />
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/cart" element={<ShoppingCart />} />
							<Route path="/orders" element={<Orders />} />
							<Route path="/login" element={<Login />} />
							<Route path="/view-book/:id" element={<BookDetails />} />
							<Route path="/order-details/:id" element={<OrderDetails />} />
						</Routes>
						<Footer />
					</BrowserRouter>
				</div>
			</OrdersContext.Provider>
		</ShoppingCartContext.Provider>
	);
}

export default App;
