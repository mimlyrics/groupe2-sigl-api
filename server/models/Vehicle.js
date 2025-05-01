const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/db');
class Vehicle extends Model {};

Vehicle.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  marque: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  immatriculation: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  annees: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  prixLocation: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'vehicles',
  modelName: 'Vehicle',
  timestamps: true,
});

module.exports = Vehicle;