import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 8000,
});

export const productService = {
  async getAll() {
    const { data } = await api.get('/products');
    return data;
  },
  async getById(id) {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },
  async create(product) {
    const { data } = await api.post('/products', product);
    return data;
  },
  async update(id, product) {
    const { data } = await api.put(`/products/${id}`, product);
    return data;
  },
  async remove(id) {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  },
};