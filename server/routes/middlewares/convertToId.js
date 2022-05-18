const convertToId = (param) => {
  return async (req, res, next) => {
    req.params.id = req.params[param];
    next();
  };
};

module.exports = convertToId;
