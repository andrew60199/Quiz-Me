const router = require('express').Router();
const withAuth = require('../utils/auth')

router.get('/', (req, res) => {
    res.render('homepage')
});

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/profile', withAuth, async (req, res) => {
    // Check if they are logged in with the helper function
    // If they are logged in they will be presented their profile/stats
    res.render('stats', {
        username: req.session.username
    })
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

router.get('/editmenu', withAuth, (req, res) => {
    res.render('editmenu')
});

router.get('/usernameedit', withAuth, (req, res) => {
    res.render('usernameedit')
});

router.get('/emailedit', withAuth, (req, res) => {
    res.render('emailedit')
});

router.get('/passwordedit', withAuth, (req, res) => {
    res.render('passwordedit')
});



module.exports = router;