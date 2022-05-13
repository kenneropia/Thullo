const addUserId = (req, res, next) => {
  req.body.owner = req.user._id;
  next();
};

module.exports = addUserId;
