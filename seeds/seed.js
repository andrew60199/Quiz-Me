const sequelize = require('../config/connection');
const { User, Quiz } = require('../models');

const userData = require('./userData.json');
const quizData = require('./quiz.json');

const seedUserDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Quiz.bulkCreate(quizData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedUserDatabase();