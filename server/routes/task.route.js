const express = require('express');
const {
  createTask,
  getTaskById,
  updateTask,
  getAllTasks,
} = require('../controllers/task.controller');
const addOrganisationId = require('./middlewares/addOrganisationId');
const schemaMiddleware = require('./middlewares/schemaMiddleware');
const addOwnerId = require('./middlewares/addOwnerId');
const convertToId = require('./middlewares/convertToId')('task');
const { restrictToRole } = require('./middlewares/restrictTo');
const { addTaskSchema, updateTaskSchema } = require('./schemas/task.schema');
const {
  assignUserToTask,
  removeUserFromTask,
} = require('../controllers/assign.controller');
const { assignUserSchema } = require('./schemas/assign.schema');

const taskRouter = express.Router({ mergeParams: true });

taskRouter
  .route('/')
  .post(
    addOwnerId,
    addOrganisationId,
    restrictToRole('supervisor', 'manager'),
    schemaMiddleware(addTaskSchema),
    createTask
  )
  .get(addOrganisationId, getAllTasks);

taskRouter
  .route('/:task')
  .get(convertToId, addOrganisationId, getTaskById)
  .patch(
    convertToId,
    addOrganisationId,
    restrictToRole('supervisor', 'manager'),
    schemaMiddleware(updateTaskSchema),
    updateTask
  );

taskRouter
  .route('/assign-user')
  .post(
    convertToId,
    addOwnerId,
    addOrganisationId,
    restrictToRole('supervisor', 'manager'),
    schemaMiddleware(assignUserSchema),
    assignUserToTask
  );

taskRouter
  .route('/remove-user')
  .delete(
    convertToId,
    addOwnerId,
    addOrganisationId,
    restrictToRole('supervisor', 'manager'),
    removeUserFromTask
  );

module.exports = taskRouter;
