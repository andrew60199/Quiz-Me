const router = require('express').Router();
const quizRoutes = require('./quizRoute');
const userRoutes = require('./userRoute');
const statisticsRoutes = require('./statisticsRoute');

router.use('/quiz', quizRoutes);
router.use('/users', userRoutes);
router.use('/stats', statisticsRoutes);

module.exports = router;