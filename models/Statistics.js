const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/connection')

class Statistics extends Model {}

Statistics.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    total_played: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    wins: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'statistics',
  }
);

module.exports = Statistics