const OK_CODE = 200;
const CREATED_CODE = 201;
const BAD_REQUEST_CODE = 400;
const UNAUTHORIZED_ERROR_CODE = 401;
const FORBIDDEN_ERROR_CODE = 403;
const NOT_FOUND_CODE = 404;
const CONFLICT_ERROR_CODE = 409;
const SERVER_ERROR_CODE = 500;

const saltRounds = 10;
const regexUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)/;

module.exports = {
  OK_CODE,
  CREATED_CODE,
  BAD_REQUEST_CODE,
  UNAUTHORIZED_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  NOT_FOUND_CODE,
  CONFLICT_ERROR_CODE,
  SERVER_ERROR_CODE,
  saltRounds,
  regexUrl,
};
