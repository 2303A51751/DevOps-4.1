const express = require('express');

const router = express.Router();
const orders = [];
let nextOrderId = 1;

router.get('/', (req, res) => {
  res.json(orders);
});

router.post('/', (req, res) => {
  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
    return res.status(400).json({ message: 'Order body must be a JSON object' });
  }

  const order = {
    ...req.body,
    id: nextOrderId++,
    createdAt: new Date().toISOString(),
  };

  orders.push(order);
  res.status(201).json(order);
});

module.exports = router;