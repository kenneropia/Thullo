const Organisation = require('../../models/organisation.model');
const AppError = require('../../utils/appError');
const Role = require('../../models/role.model');
const Assign = require('../../models/assign.model');
const Board = require('../../models/board.model');

//this is a middleware tthat restricts on an organisation level, if you're part of the org you are gave access
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
      organisation: req.params.organisation,
      permitted_user: req.user._id,
      user_role: { $in: roles },
    });

    if (!user) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    return next();
  };
};

exports.restrictToAssigned = async (req, res, next) => {
  const board = await Board.findById(req.params.board);

  const isAssigned = await Assign.findOne({
    permitted_user: req.user._id,

    organisation: req.params.organisation,
    board: req.params.board,
  }).lean();
  const owner = req.user._id.equals(board.owner);
  if (isAssigned || owner) return next();
  return next(
    new AppError('You do not have permission to perform this action', 403)
  );

  next();
};
