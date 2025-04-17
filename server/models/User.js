const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/db');
const Token = require('./Token');
class User extends Model {}

const bcrypt = require('bcrypt');
User.init( {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }, 
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true
    }
}

, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    hooks: {
        beforeCreate: async (user) => {
            if(user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
        beforeUpdate: async (user) => {
            if(user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    }
})

User.prototype.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

User.hasMany(Token, {foreignKey: 'userId',as: 'tokens'});
Token.belongsTo(User, {foreignKey: 'userId'});

module.exports = User;