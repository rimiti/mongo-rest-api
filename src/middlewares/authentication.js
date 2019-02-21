import jwt from 'jsonwebtoken';

/**
 * @description Authentication middleware.
 * @param req
 * @param res
 * @param next
 */
export default (req, res, next) => {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send();
  }

  const parts = req.headers.authorization.split(' ');
  if (parts.length !== 2 || !/^Bearer$/i.test(parts[0])) {
    return res.status(401).send({error: {message: 'Invalid Authorization format.'}});
  }

  if (!parts[1]) {
    return res.status(401).send({error: {message: 'Token required.'}});
  }

  jwt.verify(parts[1], process.env.API_JWT_SECRET, (err) => {
    if (err) {
      if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
        return res.status(401).send({error: {message: 'Token expired.'}});
      }

      return res.status(401).send({error: {message: 'Token error.'}});
    }

    return next();
  });
};
