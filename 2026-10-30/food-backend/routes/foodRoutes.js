const express = require('express');

const router = express.Router();

const foods = [
  { id: 1, name: 'Chicken Biryani', price: 220 },
  { id: 2, name: 'Veg Biryani', price: 180 },
];

router.get('/', (req, res) => {
  res.json(foods);
});

router.get('/:id', (req, res) => {
  const food = foods.find((item) => item.id === Number(req.params.id));

  if (!food) {
    return res.status(404).json({ message: 'Food item not found' });
  }

  res.json(food);
});

module.exports = router;