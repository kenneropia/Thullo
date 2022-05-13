module.exports.convertToId = (param) => {
  return async (req, res, next) => {
    req.body._id = req.params[param];
    req.params.id = req.params[param];
    next();
  };
};
