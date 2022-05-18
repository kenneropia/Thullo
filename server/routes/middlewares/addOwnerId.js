const Organisation = require('../../models/organisation.model');
const Role = require('../../models/role.model');

const addOwnerId = async (req, res, next) => {
  req.body.owner = req.user.id;
  // req.user.role = (await Role.findById(req.user._id))?.user_role;
  // const owner = (await Organisation.findById(req.params.organisation)).owner;
  // req.user.isOwner = owner == req.user._id ? true : false;
  next();
};
module.exports = addOwnerId;
