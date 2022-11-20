const router = require('express').Router();
const { User } = require('../../models/user');

router.post('/signup', async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json(err);
    }

});

router.post('/logout', async (req, res) => {

});

module.exports = router;