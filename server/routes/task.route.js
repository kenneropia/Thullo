const {
  createTask,
  getTaskById,
  updateTask,
  getAllTasks,
} = require('../controllers/task.controller');
const router = require('./utils/router');
const addOrganisationId = require('./middlewares/addOrganisationId');
const schemaMiddleware = require('./middlewares/schemaMiddleware');
const addOwnerId = require('./middlewares/addOwnerId');
const convertToId = require('./middlewares/convertToId')('task');
const { restrictToRole } = require('./middlewares/restrictTo');
const { addTaskSchema } = require('./schemas/task.schema');
const {
  assignUserToTask,
  removeUserFromTask,
  reassignUserToTask,
} = require('../controllers/assign.controller');

const taskRouter = router;

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
    addOwnerId,
    restrictToRole('supervisor', 'manager'),
    schemaMiddleware(updateTaskSchema),
    updateTask
  );

taskRouter
  .route('/assign-user')
  .post(convertToId, addOwnerId, addOrganisationId, assignUserToTask);

taskRouter
  .route('/reassign-user')
  .patch(convertToId, addOwnerId, addOrganisationId, reassignUserToTask);

taskRouter
  .route('/remove-user')
  .delete(convertToId, addOwnerId, addOrganisationId, removeUserFromTask);

module.exports = taskRouter;
