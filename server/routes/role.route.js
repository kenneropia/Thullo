const { createRole, updateRole } = require('../controllers/role.controller');
const schemaMiddleware = require('./middlewares/schemaMiddleware');
const addOrganisationId = require('./middlewares/addOrganisationId');
const { restrictToRole } = require('./middlewares/restrictTo');
const {
  addUserRoleSchema,
  upgradeUserRoleSchema,
} = require('./schemas/role.schema');
const express = require('express');

const addOwnerId = require('./middlewares/addOwnerId');
const convertToId = require('./middlewares/convertToId')('permitted_user');

const roleRouter = express.Router({ mergeParams: true });

roleRouter.post(
  '/add-user',
  addOrganisationId,
  addOwnerId,
  restrictToRole('supervisor', 'manager'),
  schemaMiddleware(addUserRoleSchema),
  createRole
);
roleRouter.patch(
  '/update-role/:permitted_user',
  (req, res, next) => {
    delete req.body.organisation;
    next();
  },
  convertToId,
  restrictToRole('supervisor'),
  schemaMiddleware(upgradeUserRoleSchema),
  updateRole
);

module.exports = roleRouter;
