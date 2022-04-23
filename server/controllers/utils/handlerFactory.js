const AppError = require('./../../utils/AppError');
const APIFeatures = require('./../../utils/ApiFeatures');

const checkForId = (req) => {
  let filter = { user: req.user.id };
  if (req.params.course) filter.course = req.params.course;
  if (req.params.video) filter.video = req.params.video;
  if (req.params.comment) filter.comment = req.params.comment;
  return filter;
};

exports.updateOne = (Model) => async (req, res, next) => {
  const verifiedDoc = await Model.find({
    id: req.params.id,
    user: req.user._id,
  });

  if (!verifiedDoc.length) {
    return next(new AppError('No document found with that ID', 404));
  }

  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: doc,
  });
};

exports.createOne = (Model) => async (req, res, next) => {
  let filter = checkForId(req);

  console.log({ ...req.body, ...filter });
  const doc = await Model.create({ ...req.body, ...filter });

  res.status(201).json({
    status: 'success',
    data: doc,
  });
};

exports.getOne = (Model, popOptions) => async (req, res, next) => {
  let query = Model.findOne({ id: req.params.id });
  if (popOptions) query = query.populate(popOptions);
  const doc = await query;

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: doc,
  });
};

exports.getAll = (Model) => async (req, res, next) => {
  // To allow for nested GET reviews on tour (hack)
  let filter = checkForId(req);
  const features = new APIFeatures(Model.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  // const doc = await features.query.explain();
  const doc = await features.query;
  const count = await Model.countDocuments({});
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: { currentQueryCount: doc.length, allDocCount: count },
    data: doc,
  });
};

exports.deleteOne = (Model) => async (req, res, next) => {
  let doc = await Model.find({ id: req.params.id, user: req.user._id });

  if (!doc.length) {
    return next(new AppError('No document found with that ID', 404));
  }

  doc = await Model.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
