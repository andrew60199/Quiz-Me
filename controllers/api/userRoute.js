const router = require('express').Router();
const User = require('../../models/user');

router.post('/signup', async (req, res) => {
    try {

    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    };
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!userData) {
            res
            .status(400)
            .json({ message: 'The login entered does not match a user in our database. Please try again or sign up to create a new account!' });
            return;
        }

        const userPassword = await userData.checkPassword(req.body.password);

        if (!userPassword) {
            res
            .status(400)
            .json({ message: 'The login entered does not match a user in our database. Please try again or sign up to creaate a new account!' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json({ user: userData, message: 'Welcome to QuizMe!'});
        });
    } catch (err) {
        res.status(500).json(err);
    };

});

router.post('/logout', async (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    };

});

module.exports = router;