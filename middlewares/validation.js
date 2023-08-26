const { celebrate, Joi } = require('celebrate');
const { regexUrl } = require('../utils/constants');

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movId: Joi.string().required().length(24).hex(),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(50),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(regexUrl).required(),
    trailerLink: Joi.string().pattern(regexUrl).required(),
    thumbnail: Joi.string().pattern(regexUrl).required(),
    owner: Joi.string().length(24).hex(),
    movieId: Joi.number().unsafe().required(),
    nameRU: Joi.string().required().min(2),
    nameEN: Joi.string().required().min(2),
  }),
});

module.exports = {
  validateSignin, validateSignup, validateUpdateProfile, validateDeleteMovie, validateCreateMovie,
};
