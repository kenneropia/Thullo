const express = require('express');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const schemaMiddleware = require('./middleware/schemaMiddleware');
const {
  signupSchema,
  loginSchema,
  updateUserSchema,
} = require('./schemas/auth.schema');

// the set of user routes

const router = express.Router();

router.post('/signup', schemaMiddleware(signupSchema), authController.signup);
router.post('/login', schemaMiddleware(loginSchema), authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  schemaMiddleware(updateUserSchema),
  userController.updateMe
);
router.delete('/deleteMe', userController.deleteMe);

module.exports = router;
