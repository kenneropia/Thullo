const mongoose = require('mongoose');
const Label = require('../models/label.model');
const Tag = require('../models/tag.model');
const Organisation = require('../models/organisation.model');
const Role = require('../models/role.model');
const factory = require('./utils/handlerFactory');
const Assign = require('../models/assign.model');

exports.createOrganisation = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const newOrgansation = await Organisation.create({
      ...req.body,
    });
    await session.commitTransaction();

    const newRole = await Role.create({
      owner: req.user._id,
      organisation: newOrgansation._id,
      user_role: 'supervisor',
      permitted_user: req.user._id,
    });

    await session.commitTransaction();

    res.status(201).json({
      status: 'success',
      data: newOrgansation,
    });
  } catch (err) {
    await session.abortTransaction();
    console.error(err);
    next(new AppError('An error was encoutered, please try again later', 500));
  } finally {
    await session.endSession();
  }
};

exports.getOrganisationById = factory.getOne(Organisation);

exports.updateOrganisation = factory.updateOne(Organisation);

exports.deleteOrganisation = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedOrgansation = await Organisation.deleteMany({
      _id: req.params.organisation,
    });

    const deletedRole = await Role.deleteMany({
      organisation: req.params.organisation,
    });

    const deletedTag = await Tag.deleteMany({
      organisation: req.params.organisation,
    });

    const deletedLabel = await Label.deleteMany({
      organisation: req.params.organisation,
    });

    const deletedAssign = await Assign.deleteMany({
      organisation: req.params.organisation,
    });

    await session.commitTransaction();

    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    await session.abortTransaction();
    console.error(err);
    next(new AppError('An error was encoutered, please try again later', 500));
  } finally {
    await session.endSession();
  }
};
