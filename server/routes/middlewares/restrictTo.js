const Organisation = require('../../models/organisation.model');
const AppError = require('../../utils/appError');
const Role = require('../../models/role.model');

exports.restrictToRole = (...roles) => {
  return async (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    const owner =
      (await Organisation.findById(req.params.organisation))?.owner ==
      req.user._id
        ? true
        : false;
    req.user.isOwner = owner;
    const user = await Role.findOne({
      organisation: req.body.organisation,
      permitted: req.user._id,
      $in: roles,
    });
    if (owner || user) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    return next();
  };
};
