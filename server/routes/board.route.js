const {
  createBoard,
  getBoardById,
} = require('../controllers/board.controller');
const addOrganisationId = require('./middlewares/addOrganisationId');
const convertToId = require('./middlewares/convertToId')('board');

const addOwnerId = require('./middlewares/addOwnerId');
const router = require('./utils/router');
const boardRouter = router;

boardRouter
  .route('/boards')
  .post(addOrganisationId, addOwnerId, createBoard)
  .get(addOrganisationId, getAllBoards)
  .get('/:board', convertToId, addOrganisationId, getBoardById)
  .patch('/:board', convertToId, addOrganisationId, addOwnerId, updateBoard);

module.exports = boardRouter;
