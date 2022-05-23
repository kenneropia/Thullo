const express = require('express');
const Joi = require('joi');
const {
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard,
  getAllBoards,
} = require('../controllers/board.controller');

const addOrganisationId = require('./middlewares/addOrganisationId');
const convertToId = require('./middlewares/convertToId')('board');
const addOwnerId = require('./middlewares/addOwnerId');
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

boardRouter
  .route('/')
  .post(
    restrictToRole('supervisor', 'manager'),
    addOrganisationId,
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
    addOrganisationId,
    addOwnerId,
    schemaMiddleware(updateBoardSchema),
    updateBoard
  )
  .delete(
    restrictToRole('supervisor', 'manager'),
    convertToId,
    addOrganisationId,
    addOwnerId,
    deleteBoard
  );

boardRouter.use('/:board/tasks', taskRouter);
boardRouter.use('/:board/tags', tagRouter);

module.exports = boardRouter;
