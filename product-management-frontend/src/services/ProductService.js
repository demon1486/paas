// frontend/src/services/ProductService.js
import axios from 'axios'

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  getProducts() {
    return apiClient.get('/products')
  },

  getProduct(id) {
    return apiClient.get(`/products/${id}`)
  },

  createProduct(product) {
    return apiClient.post('/products', product)
  },

  updateProduct(product) {
    return apiClient.put(`/products/${product.id}`, product)
  },

  deleteProduct(id) {
    return apiClient.delete(`/products/${id}`)
  }
}