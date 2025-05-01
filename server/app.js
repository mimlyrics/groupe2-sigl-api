/*import express from 'express';
import bodyParser from 'body-parser';
import pinoHttp from 'pino-http';
import logger from './logger.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import { connectDB } from './config/db.js';
import { seedVehicles } from './data/seedData.js';


const app = express();

// Connect to Database
const initializeApp = async () => {
  try {
    // Connect to database first
    await connectDB();
    
    // Then seed the database with initial data
    await seedVehicles();
    
    logger.info('Database initialized and seeded successfully');
  } catch (error) {
    logger.error('Failed to initialize database:', error);
    process.exit(1);
  }
};

initializeApp();



// Middlewares
app.use(pinoHttp({ logger }));
app.use(bodyParser.json());

// Routes
app.use('/vehicule', vehicleRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send("Vehicle API Service");
});

export { app };*/