const User = require('./user')
const Quiz = require('./quiz')
const Statistics = require('./Statistics')

// Associations
User.hasMany(Quiz);
Quiz.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasOne(Statistics);
Statistics.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Quiz, Statistics }