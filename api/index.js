const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

// Временное хранилище
let orders = [];
let allStreets = [];
let mapSettings = {
  size: { N: 2, M: 3 },
};

const createBlock = () => {};

const createStreet = ({ orientation, number, length }) => {};

const initMap = ({ N, M }) => {
  for (let n = 1; n < N + 2; n++) {
    allStreets.push(`H${n}`);
  }

  for (let m = 1; m < M + 2; m++) {
    allStreets.push(`V${m}`);

    // let houses = []
    // for (let i = 1; i < M*4+1; i++) {

    // }
  }

  const map = {
    size: { N, M },
    allStreets,
  };

  return map;
};
let map = initMap(mapSettings.size);

app.get("/api/map", (req, res) => {
  res.json(map);
});

app.get("/api/orders", (req, res) => {
  res.json(orders);
});

app.post("/api/order/create", (req, res) => {
  const { phone, street, home } = req.body;

  if (!allStreets.includes(street)) {
    return res.status(200).json({
      success: false,
      error: {
        text: "Такой улицы не существует",
        type: "warning",
      },
    });
  }
  const newOrder = {
    id: Math.random().toString(36).substring(2, 9),
    phone,
    street,
    home,
    date: new Date().toLocaleString(),
  };
  orders.push(newOrder);
  res.status(201).json({ order: newOrder, success: true });
});

app.delete("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  orders = orders.filter((order) => order.id !== id);
  res.status(204).end();
});

app.listen(PORT, () => {
  initMap({...mapSettings.size});
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
