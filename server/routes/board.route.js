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
const { objectId } = require('./schemas/utils/JoiObjectId');
const addOwnerId = require('./middlewares/addOwnerId');
const schemaMiddleware = require('./middlewares/schemaMiddleware');
const router = require('./utils/router');
const boardRouter = router;

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
    convertToId,
    addOrganisationId,
    addOwnerId,
    schemaMiddleware(updateBoardSchema),
    updateBoard
  )
  .delete(convertToId, addOrganisationId, addOwnerId, deleteBoard);

module.exports = boardRouter;
