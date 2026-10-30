const express = require('express');

const router = express.Router();

const restaurants = [
  { id: 1, name: 'Spice Kitchen' },
  { id: 2, name: 'Pizza Palace' },
];

router.get('/', (req, res) => {
  res.json(restaurants);
});

router.get('/:id', (req, res) => {
  const restaurant = restaurants.find((item) => item.id === Number(req.params.id));

  if (!restaurant) {
    return res.status(404).json({ message: 'Restaurant not found' });
  }

  res.json(restaurant);
});

module.exports = router;