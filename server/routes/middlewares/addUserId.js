const addUserId = (req, res, next) => {
  req.body.owner = req.user.id;
  next();
};

module.exports = addUserId;
