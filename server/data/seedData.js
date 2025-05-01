const Vehicle = require("../models/Vehicle.js");
const logger = require("../logger.js");

// Seed data with random vehicle combinations
const generateSeedData = () => {
  const seedData = [];
  const marques = ["Toyota", "Mercedes", "Audi", "Ford", "Nissan"];
  const models = ["Camry", "Benz", "E-tron", "F-150", "Altima"];
  const annees = [2022, 2023, 2024, 2025, 2026];

  for (let i = 0; i < 10; i++) {
    const randomMarque = marques[Math.floor(Math.random() * marques.length)];
    const randomModel = models[Math.floor(Math.random() * models.length)];
    const randomAnnees = annees[Math.floor(Math.random() * annees.length)];
    const randomPrixLocation = Math.floor(Math.random() * 351) + 1500;
    
    seedData.push({
      marque: randomMarque,
      model: randomModel,
      immatriculation: `ABC-${i}`,
      annees: randomAnnees,
      prixLocation: randomPrixLocation
    });
  }
  
  return seedData;
};

// Function to seed the database
 const seedVehicles = async () => {
  try {
    // Check if database already has vehicles
    const count = await Vehicle.count();
    
    if (count === 0) {
      // Database is empty, proceed with seeding
      const seedData = generateSeedData();
      logger.info('Seeding database with initial vehicle data...');
      
      // Use bulkCreate for better performance
      await Vehicle.bulkCreate(seedData);
      
      logger.info(`Database seeded with ${seedData.length} vehicles`);
    } else {
      logger.info('Database already contains vehicles, skipping seed');
    }
  } catch (error) {
    logger.error('Error seeding database:', error.message);
  }
};

module.exports = seedVehicles;