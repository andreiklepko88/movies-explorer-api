const router = require('express').Router();
const { validateDeleteMovie, validateCreateMovie } = require('../middlewares/validation');
const {
  deleteMovie, createMovie, getSavedMovies,
} = require('../controllers/movies');

router.get('/', getSavedMovies);

router.post('/', validateCreateMovie, createMovie);

router.delete('/:movId', validateDeleteMovie, deleteMovie);

module.exports = router;
