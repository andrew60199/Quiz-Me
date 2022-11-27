const router = require('express').Router();
const sequelize = require('../../config/connection');
const Quiz = require('../../models/quiz');
const Statistics = require('../../models/Statistics')

// api/quiz/

// Request a random quiz from the database
router.get('/', async (req, res) => {
    try {
        // Check which ones they have answered 
        // Get their user_id
        // Need to check that this works!! Via logging in and trying this route
        const userId = req.session.user_id

        // Then query the database for their total_played column..
        const userTotalData = await Quiz.findOne({
            where: {
                user_id: userId
            }, 
            
        })

        // Not sure which one to use - so run this (comment out everything below) and then uncomment one of the two variables below...
        // console.log(userTotalData)
        // This showed it was an object so we will use the first line below
        const userTotalPlain = userTotalData.get({ plain: true });
        
        
        // const userTotalPlain2 = userTotalData.map((project) => project.get({ plain: true }))

        // Then break it down so that we have an array of the quiz id's they have already played
        const userTotalArray = userTotalPlain.total_played.split(" ")

        // Query the quiz model to see how many rows/quizzes are in there
        const totalData = await Quiz.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('id')), 'total']
            ]
        })

        // Grab the value...
        // get the plain javascript object
        // since what we are getting back is an array we need to map it to get the item inside...
        // const totalQuizzes = await totalData.get({ plain: true });
        const totalQuizzesPlain = totalData.map((project) => project.get({ plain: true }))

        const totalQuizzes = totalQuizzesPlain[0]  
        
        const loopingArray = []     

        const maybeLoop = async (quizzes, userPlayedArray, theUsersID) => {
            // Then call this function
            const getRandomQuizId = (max) => {
                return Math.ceil(Math.random() * max)
            }

            const randomId = getRandomQuizId(quizzes)           

            // Then findOne where the quiz equals the random number
            const getQuiz = await Quiz.findOne({
                where: {
                    id: randomId
                },
            })

            const getQuizPlain = getQuiz.get({ plain: true })
            
            // Then check if they have already answered that question
            const hasPlayed = (userArr, number) => {
                const randomNumberToString = number.toString()

                return userArr.includes(randomNumberToString)
            }

            // console.log(userPlayedArray)
            // console.log(randomId)
            const checking = hasPlayed(userPlayedArray , getQuizPlain.id)
            // console.log(checking)
            
            // console.log(theUsersID)
            // console.log(getQuizPlain.user_id)

            // If so generate a new random number... no need to get a new total
            // This was causing an infinite loop! If the user had answered all the quizzes/created them all
            if (checking || theUsersID === getQuizPlain.user_id) {

                // This stops it from infinitely looping in those cases
                // Check for double entries
                const checking2 = loopingArray.includes(getQuizPlain.id)

                if (!checking2) {
                    loopingArray.push(getQuizPlain.id)
                }              

                if (loopingArray.length === quizzes) {
                    console.log('You have answered all the quizzes in our database')
                    res.status(200).json({ message: 'You have answered all the quizzes in our database' })

                } else {
                    maybeLoop(totalQuizzes.total, userTotalArray, userId)
                }
                

            } else {
                // If they haven't answered the question then we will send it to the front end!
                res.json(getQuizPlain)
               
                
            }
        } 
        
        maybeLoop(totalQuizzes.total, userTotalArray, userId)

    
        
    } catch (error) {
        res.status(500).json(error);
    }
})

// Upload a new quiz 
router.post('/upload', async (req, res) => {
    try {
        // Can we refactor this so that we don't get Sequelize injection??
        const quizData = await Quiz.create({ 
            question: req.body.question, 
            answer_one: req.body.answer_one,
            answer_two: req.body.answer_two,
            answer_three: req.body.answer_three,
            answer_four: req.body.answer_four,
            correct_answer: req.body.correct_answer,
            user_id: req.session.user_id
        });

        // We should send back a message saying the quiz has been added uploaded for people to start using it...
        res.status(200).json(quizData); 

    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;
