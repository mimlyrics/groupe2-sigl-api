const {Pool, Client} = require('pg');
const {Sequelize} = require('sequelize');
require('dotenv').config();
//const seedVehicles = require('../data/seedData');
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging:false
    }
)

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully');
        //await seedVehicles();

    }catch(error) {
        console.error('Unable to connect to the database: ', error);
    }
}

testConnection();


module.exports = sequelize;