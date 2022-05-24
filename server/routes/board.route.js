const express = require('express');
const Joi = require('joi');
const {
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard,
  getAllBoards,
} = require('../controllers/board.controller');

const addToBody = require('./middlewares/addToBody');
const addOrganisationId = addToBody('organisation');
const addBoardId = addToBody('board');
const convertToId = require('./middlewares/convertToId')('board');
const addOwnerId = addToBody('owner');
const { restrictToRole } = require('./middlewares/restrictTo');
const schemaMiddleware = require('./middlewares/schemaMiddleware');

const { objectId } = require('./schemas/utils/JoiObjectId');

const tagRouter = require('./tag.route');
const taskRouter = require('./task.route');

const boardRouter = express.Router({ mergeParams: true });

const createBoardSchema = Joi.object({
  owner: objectId().required(),
  title: Joi.string().min(5).max(60).required(),
  description: Joi.string().min(5).max(200).required(),
  organisation: objectId().required(),
});

const updateBoardSchema = Joi.object({
  title: Joi.string().min(5).max(60).required(),
  description: Joi.string().min(5).max(200).required(),
});
boardRouter.use(addBoardId);
boardRouter
  .route('/')
  .post(
    restrictToRole('supervisor', 'manager'),
    addOwnerId,
    schemaMiddleware(createBoardSchema),
    createBoard
  )
  .get(addOrganisationId, getAllBoards);

boardRouter
  .route('/:board')
  .get(convertToId, addOrganisationId, getBoardById)
  .patch(
    restrictToRole('supervisor', 'manager'),
    convertToId,
    addOwnerId,
    schemaMiddleware(updateBoardSchema),
    updateBoard
  )
  .delete(
    restrictToRole('supervisor', 'manager'),
    convertToId,
    addOwnerId,
    deleteBoard
  );

boardRouter.use('/:board/tasks', taskRouter);
boardRouter.use('/:board/tags', tagRouter);

module.exports = boardRouter;
