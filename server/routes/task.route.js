const express = require('express');
const {
  createTask,
  getTaskById,
  updateTask,
  getAllTasks,
} = require('../controllers/task.controller');
const addToBody = require('./middlewares/addToBody');
const addBoardId = addToBody('board');
const addOwnerId = addToBody('owner');
const addOrganisationId = addToBody('organisation');
const addTaskId = addToBody('task');
const schemaMiddleware = require('./middlewares/schemaMiddleware');
const convertToId = addToBody({ id: 'task' });
const { restrictToRole } = require('./middlewares/restrictTo');
const { addTaskSchema, updateTaskSchema } = require('./schemas/task.schema');
const {
  assignUserToTask,
  removeUserFromTask,
} = require('../controllers/assign.controller');
const { assignUserSchema } = require('./schemas/assign.schema');
const commentRouter = require('./comment.route');

const taskRouter = express.Router({ mergeParams: true });

taskRouter.use(addTaskId);

taskRouter
  .route('/')
  .post(
    addOwnerId,
    restrictToRole('supervisor', 'manager'),
    schemaMiddleware(addTaskSchema),
    createTask
  )
  .get(getAllTasks);

taskRouter.route('/:task').get(convertToId, getTaskById).patch(
  convertToId,

  restrictToRole('supervisor', 'manager'),
  schemaMiddleware(updateTaskSchema),
  updateTask
);

taskRouter.route('/:task/assign-user').post(
  convertToId,
  addOwnerId,
  addOrganisationId,

  restrictToRole('supervisor', 'manager'),
  schemaMiddleware(assignUserSchema),
  assignUserToTask
);

taskRouter.route('/remove-user').delete(
  convertToId,
  addOwnerId,

  restrictToRole('supervisor', 'manager'),
  removeUserFromTask
);
taskRouter.use('/:task/comments/', commentRouter);
module.exports = taskRouter;
