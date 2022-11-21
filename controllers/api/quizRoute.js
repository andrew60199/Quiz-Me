const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Quiz } = require('../../models/Quiz');

// api/quiz/

// Request a random quiz from the database
router.get('/', async (req, res) => {
    // Check which ones they have answered 

    // Query the quiz model to see how many rows/quizzes are in there
    // Then use that in the random number generator
    const totalQuizzes = await Quiz.findAll({
        attributes: [
            sequelize.fn('COUNT', sequelize.col('id')), 'n_quizzes'
        ]
    })

    res.json(totalQuizzes)
})

// Upload a new quiz 
router.get('/upload', (req, res) => {

})

module.exports = router;
