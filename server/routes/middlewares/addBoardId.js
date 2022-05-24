const addBoardId = (req, res, next) => {
  req.body.organisation = req.params.organisation;
  next();
};

module.exports = addBoardId;
