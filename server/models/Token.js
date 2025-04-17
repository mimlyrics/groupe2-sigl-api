const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/db');
class Token extends Model {}

Token.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false  
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'tokens',
    modelName: 'Token',
    timestamps: true
    
});

module.exports = Token;

