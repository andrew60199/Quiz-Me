const User = require('./User')
const Quiz = require('./Quiz')
const Statistics = require('./Statistics')

// Associations
User.hasMany(Quiz, {
    foreignKey: 'user_id'
});
Quiz.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasOne(Statistics, {
    foreignKey: 'user_id'
});
Statistics.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Quiz, Statistics }