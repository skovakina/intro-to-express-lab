const express = require("express");
const app = express();

const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/greetings/:person", (req, res) => {
  res.send(`Hello there, ${req.params.person}`);
});

app.get("/roll/:number", (req, res) => {
  if (isNaN(req.params.number)) {
    res.send("You must specify a number.");
  } else {
    res.send(`You rolled a ${req.params.number}.`);
  }
});

app.get("/collectibles/:thing", (req, res) => {
  const item = collectibles[req.params.thing];
  if (item) {
    res.send(
      `So, you want the ${item.name}? For ${item.price}, it can be yours!`
    );
  }
  res.send("This item is not yet in stock. Check back soon!");
});

app.get("/shoes", (req, res) => {
  let filteredShoes = [...shoes];

  if (req.query.type) {
    filteredShoes = filteredShoes.filter(
      (shoe) => shoe.type === req.query.type
    );
  }

  if (req.query["min-price"]) {
    const minPrice = Number(req.query["min-price"]);
    filteredShoes = filteredShoes.filter((shoe) => shoe.price >= minPrice);
  }

  if (req.query["max-price"]) {
    const maxPrice = Number(req.query["max-price"]);
    filteredShoes = filteredShoes.filter((shoe) => shoe.price <= maxPrice);
  }

  res.send(filteredShoes);
});

app.listen(3000);
