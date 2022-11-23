const sequelize = require('../config/connection');
const { User, Quiz, Statistics } = require('../models');

const userData = require('./userData.json');
const quizData = require('./quiz.json');
const statisticData = require('./statistics.json')

const seedUserDatabase = async () => {
  await sequelize.sync({ alter: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Quiz.bulkCreate(quizData, {
    individualHooks: true,
    returning: true,
  });

  await Statistics.bulkCreate(statisticData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedUserDatabase();