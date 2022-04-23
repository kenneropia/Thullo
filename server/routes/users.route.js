const express = require('express');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const schemaMiddleware = require('./middleware/schemaMiddleware');
const { signupSchema } = require('./schemas/auth.schema');
// the set of user routes
const router = express.Router();

router.use(authController.protect);

router.get('/me', userController.getUser);

router.use(authController.restrictTo('instructor'));

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
