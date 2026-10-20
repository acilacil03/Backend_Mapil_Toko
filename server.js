import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware CORS - Mengizinkan akses dari Frontend (Next.js di port 3000 atau port lain)
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Middleware Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware Request Logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Root Route / Healthcheck
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Backend REST API Toko Baju Cloth Store Berjalan!',
    endpoints: {
      auth: {
        login: 'POST /api/login',
        register: 'POST /api/register',
      },
      products: {
        getAll: 'GET /api/product (opsional: ?search= &category=)',
        getOne: 'GET /api/product/:id',
        create: 'POST /api/product',
        update: 'PUT /api/product (atau /api/product/:id)',
        delete: 'DELETE /api/product?id=:id (atau /api/product/:id)',
      },
    },
  });
});

app.get('/api', (req, res) => {
  res.json({
    status: 'online',
    message: 'Cloth Store API Ready',
  });
});

// Register API Routes
// Auth routes: /api/login & /api/register
app.use('/api', authRoutes);

// Product routes: /api/product & /api/products
app.use('/api/product', productRoutes);
app.use('/api/products', productRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.method} ${req.originalUrl} tidak ditemukan`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Terjadi kesalahan internal pada server',
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 Backend Server berjalan di http://localhost:${PORT}`);
  console.log(`📡 Siap menerima request dari frontend Next.js`);
  console.log(`===============================================`);
});
