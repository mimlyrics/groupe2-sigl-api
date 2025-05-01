const express = require('express');
const sequelize = require('./config/db');
const User = require('./models/User');
const cors = require('cors');
//const initializeDatabase = require('./utils/initializeDatabase');
const seedData = require('./data/seedData')
//initializeDatabase();
const {notFound, errorHandler} = require('./middlewares/ErrorMiddleware');
require('dotenv').config();
console.log({
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  });
  
const app = express();
if (process.env.DB_DIALECT) {
    console.log('Missing DB_DIALECT in .env file');
}  
// corsOption
let corsOption = {
    credentials: true,
    origin: 'http://localhost:3000',
    method: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
}

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/public', express.static('/public'));

const authRoutes = require('./routes/authRoutes');
const rentRoutes = require('./routes/rentRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
app.use('/api/v1', authRoutes);

app.use('/api/v1', rentRoutes);
app.use('/api/v1',  vehicleRoutes);
// error middlewares
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 8000
sequelize.sync({force: false}).then(async () => {
    console.log('Database synced');
    await seedData();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})

