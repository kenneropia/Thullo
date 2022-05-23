const {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
} = require('../controllers/comment.controller');
const addOrganisationId = require('./middlewares/addOrganisationId');
const addOwnerId = require('./middlewares/addOwnerId');
const convertToId = require('./middlewares/convertToId')('comment');
const { restrictToRole } = require('./middlewares/restrictTo');

const schemaMiddleware = require('./middlewares/schemaMiddleware');
const {
  createCommentSchema,
  updateCommentSchema,
} = require('./schemas/comment.schema');
const router = require('./utils/router');

const commentRouter = router;

commentRouter
  .route('/')
  .get(
    addOrganisationId,
    restrictToRole('supervisor', 'manager'),
    getAllComments
  )
  .post(
    addOwnerId,
    addOrganisationId,
    restrictToRole('supervisor', 'manager'),
    schemaMiddleware(createCommentSchema),
    createComment
  );

commentRouter
  .route('/:comment')
  .get(
    convertToId,
    addOrganisationId,
    restrictToRole('supervisor', 'manager'),
    getCommentById
  )

  .patch(
    convertToId,
    addOrganisationId,
    addOwnerId,
    (req, res, next) => {
      req.body.edited = true;
      next();
    },
    restrictToRole('supervisor', 'manager'),
    schemaMiddleware(updateCommentSchema),
    updateComment
  )
  .delete(
    convertToId,
    addOrganisationId,
    addOwnerId,
    restrictToRole('supervisor', 'manager'),
    deleteComment
  );

module.exports = commentRouter;
