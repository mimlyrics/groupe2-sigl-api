// utils/initializeDatabase.js
const logger=require('../logger.js');
const { connectDB } = require('../config/db.js');
const { seedVehicles } = require ('../data/seedData.js');


const initializeDatabase = async () => {
  try {
    // Connect to database first
    await connectDB();
    
    // Then seed the database with initial data
    await seedVehicles();
    
    logger.info('Database initialized and seeded successfully');
    return true;
  } catch (error) {
    logger.error('Failed to initialize database:', error);
    process.exit(1);
  }
};

module.exports = initializeDatabase;