import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import componentRoutes from './routes/componentRoutes.js';

dotenv.config();

const app = express();

// ✅ ENABLE CORS FIRST (Before other middleware)
app.use(cors({
    origin: true, //Allow all origins
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// ===== ROUTES =====

// Root route
app.get('/', (req, res) => {
    res.json({
        message: '🚀 PC Builder API Server',
        status: 'running',
        version: '1.0.0'
    });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        message: 'Server is running! 🚀',
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/api/v1/components', componentRoutes);

// ===== ERROR HANDLERS =====

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found',
        path: req.path,
        method: req.method
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);
    res.status(err.status || 500).json({
        success: false,
        error: err.message || 'Internal Server Error'
    });
});

// ===== START SERVER =====

const PORT = process.env.PORT || 5500;
const HOST = '0.0.0.0';

app.listen(PORT, () => {
    console.log('\n================================');
    console.log('🚀 PC Builder API Server');
    console.log('================================');
    console.log(`✅ Server running on: http://localhost:${PORT}`);
    console.log(`✅ CORS enabled for: http://localhost:3000`);
    console.log(`✅ API Base: http://localhost:${PORT}/api/v1`);
    console.log(`📍 Test: http://localhost:${PORT}/api/health`);
    console.log('================================\n');
});
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
}));
