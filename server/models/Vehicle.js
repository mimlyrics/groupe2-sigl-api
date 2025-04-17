const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/db');
class Vehicle extends Model {};
Vehicle.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    registrationNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    make: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    model: 
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    rentalPrice: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true
    }

}, {
    sequelize,
    modelName: 'Vehicle',
    tableName: 'vehicles',
    timestamps: true
})


module.exports = Vehicle;