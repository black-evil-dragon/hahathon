const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

// Временное хранилище
let orders = [];
let allStreets = [];
let MapSettings = {
  size: { N: 2, M: 3 },
};

let Map = {}

const createStreet = ({ orientation, number, length }) => {};

const initMap = ({ N, M }) => {
  const MapData = {
    name: "Инноватинск",
    grid: {
      rows: 2, // N
      cols: 3, // M
      intersectionDistance: 100, // Расстояние между перекрестками
    },
    streets: {
      horizontal: [],
      vertical: [],
    },
    blocks: [],
    startPoint: null,
    clients: [],
    allStreets: [],
  };

  // Генерация названий улиц
  for (let i = 1; i <= MapData.grid.rows + 1; i++) {
    MapData.streets.horizontal.push({ name: `H${i}` });
    MapData.allStreets.push(`H${i}`);
  }
  for (let j = 1; j <= MapData.grid.cols + 1; j++) {
    MapData.streets.vertical.push({ name: `V${j}` });
    MapData.allStreets.push(`V${j}`);
  }

  // Генерация кварталов и зданий с адресами
  for (let i = 0; i < MapData.grid.rows; i++) {
    MapData.blocks[i] = [];
    for (let j = 0; j < MapData.grid.cols; j++) {
      MapData.blocks[i][j] = {
        id: `B${i}-${j}`,
        buildings: [],
      };

      // Генерация зданий с адресами внутри квартала
      for (let k = 1; k <= 8; k++) {
        let address = { blockId: `B${i}-${j}` };

        // Логика нумерации домов
        switch (k) {
          case 1:
          case 8:
            address.street = MapData.streets.horizontal[i].name;
            address.houseNumber = 2 * j + 1;
            break;
          case 2:
          case 3:
            address.street = MapData.streets.vertical[j + 1].name;
            address.houseNumber = 2 * i + 2;
            break;
          case 4:
          case 5:
            address.street = MapData.streets.horizontal[i + 1].name;
            address.houseNumber = 2 * j + 1;
            break;
          case 6:
          case 7:
            address.street = MapData.streets.vertical[j].name;
            address.houseNumber = 2 * i + 1;
            break;
        }
        MapData.blocks[i][j].buildings.push({
          id: `Building${k}`,
          address: address,
        });
      }
    }
  }

  // Пример: установка стартовой точки
  MapData.startPoint = MapData.blocks[0][0].buildings[0].address; // Здание 1 в квартале B0-0

  // Пример добавления клиента
  MapData.clients.push({
    address: MapData.blocks[0][1].buildings[3].address, // Здание 4 в квартале B0-1
  });

  allStreets = MapData.allStreets

  return {
    ...MapData,
  };
};

app.get("/api/map", (req, res) => {
  res.json(Map);
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
  Map = initMap({ ...MapSettings.size });
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
