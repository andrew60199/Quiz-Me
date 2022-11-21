const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Quiz } = require('../../models/Quiz');

// api/quiz/

// Request a random quiz from the database
router.get('/', async (req, res) => {
    // Check which ones they have answered 
    // Get their user_id


    // Then query the database for their total_played column..
    

    // Query the quiz model to see how many rows/quizzes are in there
    // Then use that in the random number generator
    const totalQuizzes = await Quiz.findAll({
        attributes: [
            sequelize.fn('COUNT', sequelize.col('id')), 'n_quizzes'
        ]
    })

    res.json({ checking: totalQuizzes })
})

// Upload a new quiz 
router.post('/upload', async (req, res) => {
    try {
        const quizData = await User.create({ 
            question: req.body.question, 
            answer_one: req.body.answer_one,
            answer_two: req.body.answer_two,
            answer_three: req.body.answer_three,
            answer_four: req.body.answer_four,
            correct_answer: req.body.correct_answer,
            user_id: req.body.user_id
        });

        // Then do something

    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;
