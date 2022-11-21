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
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    question_one: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question_two: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    question_three: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    question_four: {
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