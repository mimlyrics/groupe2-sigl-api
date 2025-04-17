const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Vehicle = require('./Vehicle');
class Rent extends Model {}

Rent.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: User,
        allowNull: false
    },
    vehicleId: {
        type: DataTypes.INTEGER,
        references: Vehicle,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Rent',
    tableName: 'rents',
    timestamps: true
})

module.exports = Rent;