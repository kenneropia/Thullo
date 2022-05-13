const AppError = require('../../utils/appError');

const schemaMiddleware = (schema) =>
  (validator = async (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errorMessages = error.details.map((err) => err.message);
      return next(new AppError(errorMessages, 400));
    }
    next();
  });
module.exports = schemaMiddleware;
