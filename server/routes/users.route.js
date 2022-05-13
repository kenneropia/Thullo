const express = require('express');
const userController = require('../controllers/user.controller');

const { signupSchema } = require('./schemas/auth.schema');
const schemaMiddleware = require('./middlewares/schemaMiddleware');
const { restrictToRole } = require('./middlewares/restrictTo');
const protect = require('./middlewares/protect');

// the set of user routes
const router = express.Router();

router.use(protect);

router.get('/me', userController.getUser);

router.use(restrictToRole('instructor'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(schemaMiddleware(signupSchema), userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .delete(userController.deleteUser);
// .patch(userController.updateUser)

module.exports = router;
