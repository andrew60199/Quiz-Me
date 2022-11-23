const router = require('express').Router();
const withAuth = require('../utils/auth')

router.get('/', (req, res) => {
    res.render('homepage')
});

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/profile', withAuth, (req, res) => {
    // Check if they are logged in with the helper function
    // If they are logged in they will be presented their profile/stats
    res.render('stats')
});

router.get('/signup', (req, res) => {
    res.render('signup')
});

router.get('/quiz', withAuth, (req, res) => {
    res.render('answerquiz')
});

router.get('/create', withAuth, (req, res) => {
    res.render('createQuiz')
});


module.exports = router;