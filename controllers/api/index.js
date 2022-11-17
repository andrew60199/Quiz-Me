const router = require('express').Router();
const quizRoutes = require('./quizRoute');
const userRoutes = require('./userRoute');

router.use('/quiz', quizRoutes);
router.use('/users', userRoutes);

module.exports = router;