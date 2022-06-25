const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/jwt');
const UnauthorizedError = require('../errors/UnauthorizedError');

// eslint-disable-next-line consistent-return
module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  // if (!authorization || !authorization.startsWith('Bearer '))
  if (!authorization) {
    return next(new UnauthorizedError('Did not find authorization header.'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError('Error Parsing JWT token.'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
