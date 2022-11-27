const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
// const { Hooks } = require('sequelize/types/hooks');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isAlphanumeric: true,
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false, 
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 28],
            }
        }
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                newUserData.email = await newUserData.email.toLowerCase();
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                updatedUserData.email = await updatedUserData.email.toLowerCase();
                return updatedUserData;
            },  
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user', 
    },
);

module.exports = User;