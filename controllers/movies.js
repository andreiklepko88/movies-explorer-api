/* eslint-disable arrow-body-style */
const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');
const {
  OK_CODE, CREATED_CODE,
} = require('../utils/constants');

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;

  return Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user.id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.status(CREATED_CODE).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('При сохранении фильма произошла ошибка.'));
      } else {
        next(err);
      }
    });
};

const getSavedMovies = (req, res, next) => {
  return Movie.find({ owner: req.user.id })
    .then((movies) => {
      res.status(OK_CODE).send(movies);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  return Movie.findById(req.params.movId).then(
    (movie) => {
      if (!movie) {
        next(new NotFoundError('Фильм не найден.'));
      } else if (req.user.id !== movie.owner.toString()) {
        next(new ForbiddenError('Нельзя удалить фильм другого пользователя'));
      } else {
        Movie.deleteOne(movie)
          .then(() => {
            return res.status(OK_CODE).send({ message: 'Фильм удалён.' });
          }).catch(next);
      }
    },
  ).catch(next);
};

module.exports = {
  deleteMovie, createMovie, getSavedMovies,
};
