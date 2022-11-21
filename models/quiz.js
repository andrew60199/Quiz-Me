const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/connection')

class Quiz extends Model {}

Quiz.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false
    },
    answer_one: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer_two: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    answer_three: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    answer_four: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correct_answer: {
        type: DataTypes.STRING,
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
    freezeTableName: true,
    underscored: true,
    modelName: 'quiz',
  }
);

module.exports = Quiz