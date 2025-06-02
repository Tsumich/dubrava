const jwt = require('jsonwebtoken')

const checkAuth =  (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, 'random_secret_key123');

      req.userId = decoded.id;
      next();
    } catch (e) {
      return res.status(403).json({
        message: 'Нет доступа 403',
      });
    }
  } else {
    return res.status(403).json({
      message: 'Нет доступа 3',
    });
  }
};

module.exports = {checkAuth}