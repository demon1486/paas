
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const os = require('os');


const app = express();
const PORT = 3000;
// const DATA_FILE = path.join(__dirname, 'products.json');
const DATA_FILE = [
  {
    "id": 2,
    "name": "New",
    "price": 34,
    "description": "product"
  }
]

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'frontend-dist')));



// Initialize products file if it doesn't exist
// if (!fs.existsSync(DATA_FILE)) {
  // fs.writeFileSync(DATA_FILE, JSON.stringify([]));
// }

// Helper functions to read and write the data file
const readProducts = () => {
  // const data = fs.readFileSync(DATA_FILE);
  // data = DATA_FILE;
  // return JSON.parse(data);
  return DATA_FILE;
};

const writeProducts = (products) => {
  // fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
  // DATA_FILE = JSON.stringify(products, null, 2);
};



// CRUD Routes

// GET all products
app.get('/api/products', (req, res) => {
  try {
    const products = readProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read products' });
  }
});

// GET a single product
app.get('/api/products/:id', (req, res) => {
  try {
    const products = readProducts();
    const product = products.find(p => p.id === parseInt(req.params.id));
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve product' });
  }
});

// CREATE a new product
app.post('/api/products', (req, res) => {
  try {
    const products = readProducts();
    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description
    };

    products.push(newProduct);
    writeProducts(products);  
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// UPDATE a product
app.put('/api/products/:id', (req, res) => {
  try {
    const products = readProducts();
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const updatedProduct = {
      id: productId,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description
    };
    
    products[productIndex] = updatedProduct;
    writeProducts(products);
    
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE a product
app.delete('/api/products/:id', (req, res) => {
  try {
    let products = readProducts();
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    products = products.filter(p => p.id !== productId);
    writeProducts(products);
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

app.use(express.static(path.join(__dirname, 'frontend-dist')));

// For any other request, send the index.html file
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'frontend-dist/index.html'));
});

function getIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return 'localhost'; // Fallback to localhost if no external IP is found
}

const ipAddress = getIPAddress();

app.listen(PORT, () => {
  console.log(`Server running on http://${ipAddress}:${PORT}`);
  console.log(`Also accessible via http://localhost:${PORT}`);
});

