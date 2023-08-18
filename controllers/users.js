/* eslint-disable arrow-body-style */
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const NotFoundError = require('../errors/not-found-err');
const {
  OK_CODE, CREATED_CODE, saltRounds,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUserInfo = (req, res, next) => {
  return User.findById({ _id: req.user.id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден.');
      } else {
        res.status(OK_CODE).send(user);
      }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, saltRounds)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((createdUser) => {
      res.status(CREATED_CODE).send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует.'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('При регистрации пользователя произошла ошибка.'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Вы ввели неправильный логин или пароль.'));
      }
      return bcrypt.compare(password, user.password)
        .then((isPasswordMatch) => {
          if (!isPasswordMatch) {
            return Promise.reject(new UnauthorizedError('Вы ввели неправильный логин или пароль.'));
          }
          const token = jwt.sign({ id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
          res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
          });
          return res.status(OK_CODE).send({ token });
        });
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { email, name } = req.body;
  return User.findByIdAndUpdate(
    req.user.id,
    { email, name },
    {
      runValidators: true,
      new: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден.');
      } else {
        res.status(OK_CODE).send(user);
      }
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует.'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('При обновлении профиля произошла ошибка.'));
      } else {
        next(err);
      }
    });
};

const logOut = (req, res) => {
  res.status(OK_CODE)
    .clearCookie('jwt', {
      sameSite: true,
    })
    .send({ message: 'Logged out successfully' });
};

module.exports = {
  createUser, updateProfile, login, logOut, getUserInfo,
};
