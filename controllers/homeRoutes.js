const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage')
});

router.get('/profile', (req, res) => {
    // Check if they are logged in
    // If so then show their profile page

    // Otherwise send them to the login page
    res.render('login')
});

router.get('/signup', (req, res) => {
    res.render('signup')
});

router.get('/quiz', (req, res) => {
    res.render('answerquiz')
});


module.exports = router;