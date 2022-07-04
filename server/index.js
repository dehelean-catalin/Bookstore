let api = require("./src/api.js").app;
const fs = require("fs");
const booksPath = "./src/books.json";
const shoppingCartPath = "./src/shopping-cart.json";
const ordersPath = "./src/orders.json";

api.listen(3001, function () {
	console.log("Server running @ localhost:3001");
});

api.get("/books", function (request, response) {
	response.json(getBooks());
});
api.get("/books/:id", function (request, response) {
	response.json(getBookDetails(+request.params.id));
});

api.get("/shopping-cart", function (request, response) {
	response.json(getShoppingCartItems());
});
api.post("/shopping-cart", function (request, response) {
	let currentItems = getShoppingCartItems();
	try {
		fs.writeFileSync(shoppingCartPath, JSON.stringify([...currentItems, request.body]));
	} catch (err) {
		console.error(err);
	}
	response.json([...currentItems, request.body]);
});
api.delete("/shopping-cart/:id", function (request, response) {
	let currentItems = getShoppingCartItems();
	currentItems.splice(request.params.id, 1);
	try {
		fs.writeFileSync(shoppingCartPath, JSON.stringify(currentItems));
	} catch (err) {
		console.error(err);
	}
	response.json(currentItems);
});
api.delete("/shopping-cart", function (request, response) {
	let usersarray = [];
	try {
		fs.writeFileSync(shoppingCartPath, JSON.stringify(usersarray));
	} catch (err) {
		console.error(err);
	}
	response.json(usersarray);
});
api.get("/orders", function (request, response) {
	response.json(getOrders());
});

api.post("/orders", function (request, response) {
	const currentItems = getOrders();
	try {
		fs.writeFileSync(ordersPath, JSON.stringify([...currentItems, request.body]));
	} catch (err) {
		console.error(err);
	}
	response.json([...currentItems, request.body]);
});

const getBooks = () => JSON.parse(fs.readFileSync(booksPath, "utf8"));
const getBookDetails = (id) => getBooks().find((book) => book.id === id);
const getShoppingCartItems = () => JSON.parse(fs.readFileSync(shoppingCartPath, "utf8"));
const getOrders = () => JSON.parse(fs.readFileSync(ordersPath, "utf8"));

// function getShoppingCartItems() {
// 	let shoppingCartItems = [];
// 	try {
// 		shoppingCartItems = JSON.parse(fs.readFileSync(shoppingCartPath, "utf8"));
// 	} catch (err) {
// 		console.error(err);
// 		return false;
// 	}
// 	return shoppingCartItems;
// }
// function getOrders() {
// 	let orders = [];
// 	try {
// 		orders = JSON.parse(fs.readFileSync(ordersPath, "utf8"));
// 	} catch (err) {
// 		console.error(err);
// 		return false;
// 	}
// 	return orders;
// }
