const express = require("express");
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

// Временное хранилище для заказов
let orders = [];


app.get("/api/orders", (req, res) => {
  res.json(orders);
});


app.post("/api/orders", (req, res) => {
  const { phone, street, home } = req.body;
  const newOrder = {
    id: Math.random().toString(36).substring(2, 9),
    phone,
    street,
    home,
    date: new Date().toLocaleString(),
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});


app.delete("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  orders = orders.filter((order) => order.id !== id);
  res.status(204).end();
});


app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});