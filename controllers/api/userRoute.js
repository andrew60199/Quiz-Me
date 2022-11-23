const router = require('express').Router();
const User = require('../../models/User');

router.post('/api/signup', async (req, res) => {
    try {
        const userData = await User.create({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.user_id = userData.id
            req.session.loggedIn = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

router.post('/api/login', async (req, res) => {
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
            .json({ message: 'The login entered does not match a user in our database. Please try again or sign up to create a new account!' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id
            req.session.loggedIn = true;

            res.status(200).json({ message: 'Welcome to QuizMe!'});
        });
    } catch (err) {
        res.status(500).json(err);
    };

});

router.post('/api/logout', async (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    };
});

module.exports = router;