const express = require('express');
const {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
} = require('../controllers/comment.controller');
const {
  restrictToRole,
  restrictToAssigned,
} = require('./middlewares/restrictTo');

const addToBody = require('./middlewares/addToBody');
const convertToId = addToBody({ id: 'comment' });
const addOwnerId = addToBody('owner');

const schemaMiddleware = require('./middlewares/schemaMiddleware');
const {
  createCommentSchema,
  updateCommentSchema,
} = require('./schemas/comment.schema');

const commentRouter = express.Router({ mergeParams: true });

commentRouter
  .route('/')
  .get(getAllComments)
  .post(
    addOwnerId,
    restrictToAssigned,
    schemaMiddleware(createCommentSchema),
    createComment
  );

commentRouter
  .route('/:comment')
  .patch(
    convertToId,
    addOwnerId,
    (req, res, next) => {
      req.body.edited = true;
      next();
    },
    schemaMiddleware(updateCommentSchema),
    updateComment
  )
  .delete(convertToId, addOwnerId, deleteComment);

module.exports = commentRouter;
