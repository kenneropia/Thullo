const Role = require('../models/role.model');
const AppError = require('../utils/AppError');
const { createOne, updateOne } = require('./utils/handlerFactory');

exports.createRole = createOne(Role);

exports.updateRole = async (req, res, next) => {
  //   !req.user?.isOwner && (filter.owner = req.user._id);
  const verifiedDoc = await Role.findOne({
    permitted_user: req.params.permitted_user,
    organisation: req.params.organisation,
  });

  if (!verifiedDoc)
    return next(
      new AppError(`No ${Role.modelName.toLowerCase()} found with that ID`, 404)
    );

  const doc = await Role.findByIdAndUpdate(verifiedDoc._id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc)
    return next(
      new AppError(`No ${Role.modelName.toLowerCase()} found with that ID`, 404)
    );

  res.status(200).json({
    status: 'success',
    data: doc,
  });
};
