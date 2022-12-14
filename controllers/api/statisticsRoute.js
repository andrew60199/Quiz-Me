const router = require('express').Router();
const Statistics = require('../../models/Statistics');

router.get('/:user_id', async (req, res) => {
    try {
        const userStats = await Statistics.findOne({
            where: {
                id: req.session.user_id
            }
        });

        if (!userStats) {
            res.status(400).json({ message: "Statistics under that user id could not be found." });
        };

        const userStatsPlain = userStats.get({ plain: true })
        res.status(200).json(userStatsPlain)

    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/create', async (req, res) => {
    const newUserStats = await Statistics.create({
        total_played:"",
        wins: 0,
        user_id: req.session.user_id
    });
    res.status(200).json(newUserStats);
});

// Future development when we include delete account functionality
/*
router.delete('/delete', async (req, res) => {
    try {
        const userStats = await Statistics.destroy({
            where: {
                id: req.session.user_id
            }
        })

        if (!userStats) {
            res.status(404).json('These statistics could not be found!')
        }

        const userStatsPlain = userStats.get({ plain: true })
        res.status(200).json(userStatsPlain)

        
    } catch (err) {
        res.status(500).json(err)
    }
});
*/

router.put('/:user_id/total', async (req, res) => {
    try {
        const userStats = Statistics.update({
            total_played : req.body.total_played
        }, {
            where: {
                user_id: req.session.user_id
            }
        });
        if (!userStats) {
            res.status(400).json({ message: "Statistics under that user id could not be found." })
        };
        res.status(200).json(userStats)

    } catch (err) {
        res.status(500).json(err)
    };
});

router.put('/:user_id/wins', async (req, res) => {
    try {
        const userStats = Statistics.update({
            total_played : req.body.total_played,
            wins : req.body.wins,
        }, {
            where: {
                user_id: req.session.user_id
            }
        });
        if (!userStats) {
            res.status(400).json({ message: "Statistics under that user id could not be found." });
        };
        res.status(200).json(userStats)
        
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router; 