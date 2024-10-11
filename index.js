const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

app.use(express.static('static'));

// Add an Item to the Cart

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

const addProducts = (productId, name, price, quantity) => {
  return {
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  };
};

app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  cart.push(addProducts(productId, name, price, quantity));
  res.json({ cart });
});

// Edit Quantity of an Item in the Cart

const editProducts = (item, productId, quantity) => {
  if (item.productId === productId) {
    item.quantity = quantity;
  }
  return item;
};

app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  cart.map((item) => editProducts(item, productId, quantity));
  res.json({ cart });
});

// Delete an Item from the Cart

const deleteProducts = (item, productId) => {
  return item.productId !== productId;
};

app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let cartItems = cart.filter((item) => deleteProducts(item, productId));
  res.json({ cartItems });
});

// Read Items in the Cart

const products = (cart) => {
  return cart;
};

app.get('/cart', (req, res) => {
  let cartItems = products(cart);
  res.json({ cartItems });
});

// Calculate Total Quantity of Items in the Cart

const calculateQuantity = (cart) => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};

app.get('/cart/total-quantity', (req, res) => {
  let totalQuantity = calculateQuantity(cart);
  res.json({ totalQuantity });
});

// Calculate Total Price of Items in the Cart

const calculatePrice = (cart) => {
  let totalPrice = 0;
  cart.forEach((item) => (totalPrice += item.price * item.quantity));

  return totalPrice;
};

app.get('/cart/total-price', (req, res) => {
  let totalPrice = calculatePrice(cart);
  res.json({ totalPrice });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
