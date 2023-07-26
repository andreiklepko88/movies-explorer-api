const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');
const { login, createUser } = require('../controllers/users');
const { validateSignin, validateSignup } = require('../middlewares/validation');

router.post('/signin', validateSignin, login);

router.post('/signup', validateSignup, createUser);

router.use('/users', auth, userRoutes);
router.use('/movies', auth, movieRoutes);
router.use('*', auth, (req, res, next) => {
  next(new NotFoundError(` Страница по указанному маршруту ${req.path} не найдена.`));
});

module.exports = router;
