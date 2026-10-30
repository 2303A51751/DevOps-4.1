const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let products = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 60000 },
  { id: 2, name: 'Headphones', category: 'Electronics', price: 2000 },
  { id: 3, name: 'Backpack', category: 'Accessories', price: 1500 },
];
let nextId = 4;

function validateProduct(body) {
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const category = typeof body.category === 'string' ? body.category.trim() : '';
  const price = Number(body.price);

  if (!name || !category || !Number.isFinite(price) || price < 0) {
    return { error: 'Name, category, and a non-negative price are required.' };
  }

  return { product: { name, category, price } };
}

app.get('/api/products', (_request, response) => {
  response.json(products);
});

app.get('/api/products/:id', (request, response) => {
  const product = products.find((item) => item.id === Number(request.params.id));
  if (!product) return response.status(404).json({ message: 'Product not found.' });
  return response.json(product);
});

app.post('/api/products', (request, response) => {
  const result = validateProduct(request.body);
  if (result.error) return response.status(400).json({ message: result.error });

  const product = { id: nextId++, ...result.product };
  products.push(product);
  return response.status(201).json(product);
});

app.put('/api/products/:id', (request, response) => {
  const index = products.findIndex((item) => item.id === Number(request.params.id));
  if (index === -1) return response.status(404).json({ message: 'Product not found.' });

  const result = validateProduct(request.body);
  if (result.error) return response.status(400).json({ message: result.error });

  products[index] = { id: products[index].id, ...result.product };
  return response.json(products[index]);
});

app.delete('/api/products/:id', (request, response) => {
  const index = products.findIndex((item) => item.id === Number(request.params.id));
  if (index === -1) return response.status(404).json({ message: 'Product not found.' });

  const [removed] = products.splice(index, 1);
  return response.json(removed);
});

app.use((error, _request, response, _next) => {
  if (error instanceof SyntaxError && 'body' in error) {
    return response.status(400).json({ message: 'Request body must be valid JSON.' });
  }
  return response.status(500).json({ message: 'An unexpected server error occurred.' });
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Shopping API listening on http://localhost:${PORT}`));
}

module.exports = app;