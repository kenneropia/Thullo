const Board = require('../models/board.model');
const AppError = require('../utils/AppError');
const factory = require('./utils/handlerFactory');

exports.createBoard = async (req, res, next) => {
  const doc = await Board.create({ ...req.body });

  res.status(201).json({
    status: 'success',
    data: doc,
  });
};

exports.updateBoard = factory.deleteOne(Board);

exports.getAllBoards = factory.getAll(Board);

exports.getBoardById = factory.getOne(Board);

exports.deleteBoard = async (req, res, next) => {
  const doc = await Board.findByIdAndDelete(req.params.board);
  if (!doc) {
    return next(new AppError('No board found with that ID', 404));
  }

  res.status(201).json({
    status: 'success',
    data: doc,
  });
};
