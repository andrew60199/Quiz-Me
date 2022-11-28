const router = require('express').Router();
const User = require('../../models/User');



router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.user_id = userData.id
            req.session.loggedIn = true
            req.session.username = userData.username

            res.status(200).json(userData);
        });
    } catch (err) {
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
                .json({ message: 'The login entered does not match a user in our database. Please try again or sign up to create a new account!' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id
            req.session.loggedIn = true
            req.session.username = userData.username

            res.status(200).json({ message: 'Welcome to QuizMe!' });
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

router.delete('/delete', async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.session.user_id
            }
        });

        if (!userData) {
            res.status(404).json('This user could not be found!')
        };

        res.status(200).json(userData);


    } catch (err) {
        res.status(500).json(err);
    };
});

router.put('/update/username', async (req, res) => {

    try {
        const userData = await User.update({
            username : req.body.username
        }, {
            where: {
                id: req.session.user_id
            }
        });

        if (!userData[0]) {
            res.status(404).json('User data could not be found!')
        }

        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/update/email', async (req, res) => {
    try {
        const userData = await User.update({
            email : req.body.email
        }, {
            where: {
                id: req.session.user_id
            },
            individualHooks: true
        });

        if (!userData[0]) {
            res.status(404).json('User data could not be found!')
        }

        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/update/password', async (req, res) => {
    try {
        const userData = await User.update({
            password : req.body.password
        }, {
            where: {
                id: req.session.user_id
            },
            individualHooks: true
        });

        if (!userData[0]) {
            res.status(404).json('User data could not be found!')
        }

        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;