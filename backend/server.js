// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Dummy database for products
const products = [
  { id: 1, name: "Hot Wheels Car Model A", price: 9.99 },
  { id: 2, name: "Hot Wheels Car Model B", price: 12.99 }
];

// Endpoint to get products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Endpoint to simulate checkout (in real use, integrate a payment gateway)
app.post('/api/checkout', (req, res) => {
  const order = req.body;
  console.log("Order received:", order);
  res.json({ success: true, message: "Order processed", order });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
