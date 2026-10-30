const assert = require('node:assert/strict');
const { after, before, test } = require('node:test');
const app = require('./server');

let server;
let baseUrl;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}/api/products`;
});

after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
});

test('lists the sample products and retrieves one by ID', async () => {
  const response = await fetch(baseUrl);
  const products = await response.json();
  assert.equal(response.status, 200);
  assert.equal(products.length, 3);
  assert.deepEqual(await (await fetch(`${baseUrl}/1`)).json(), products[0]);
});

test('creates, updates, and deletes a product', async () => {
  const createdResponse = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Desk lamp', category: 'Home', price: 2500 }),
  });
  const created = await createdResponse.json();
  assert.equal(createdResponse.status, 201);

  const updatedResponse = await fetch(`${baseUrl}/${created.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Reading lamp', category: 'Home', price: 3000 }),
  });
  assert.equal((await updatedResponse.json()).name, 'Reading lamp');

  const deletedResponse = await fetch(`${baseUrl}/${created.id}`, { method: 'DELETE' });
  assert.equal(deletedResponse.status, 200);
  assert.equal((await fetch(`${baseUrl}/${created.id}`)).status, 404);
});

test('rejects invalid products and reports missing records', async () => {
  const invalidResponse = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: '', category: 'Home', price: -1 }),
  });
  assert.equal(invalidResponse.status, 400);
  assert.equal((await fetch(`${baseUrl}/999999`)).status, 404);
});