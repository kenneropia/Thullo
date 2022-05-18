const {
  createOrganisation,
  getOrganisationById,
  updateOrganisation,
  deleteOrganisation,
} = require('../controllers/organisation.controller');
const protect = require('./middlewares/protect');
const addOrganisationId = require('./middlewares/addOrganisationId');
const { restrictToRole } = require('./middlewares/restrictTo');
const addOwnerId = require('./middlewares/addOwnerId');
const router = require('./utils/router');
const schemaMiddleware = require('./middlewares/schemaMiddleware');
const {
  createOrganisationSchema,
  updateOrganisationSchema,
} = require('./schemas/organisation.schema');
const express = require('express');
const boardRouter = require('./board.route');
const roleRouter = require('./role.route');

let convertToId = require('./middlewares/convertToId')('organisation');

const organisationRouter = express.Router({ mergeParams: true });

organisationRouter.use(protect);

organisationRouter.post(
  '/',
  protect,
  addOwnerId,
  schemaMiddleware(createOrganisationSchema),
  createOrganisation
);

organisationRouter.use(addOrganisationId);

organisationRouter.get('/:organisation', convertToId, getOrganisationById);
organisationRouter.delete(
  '/:organisation',
  convertToId,
  addOrganisationId,
  addOwnerId,
  restrictToRole('supervisor'),
  deleteOrganisation
);
organisationRouter.patch(
  '/:organisation',
  convertToId,
  addOrganisationId,
  addOwnerId,
  restrictToRole('supervisor'),
  schemaMiddleware(updateOrganisationSchema),
  updateOrganisation
);

organisationRouter.use('/:organisation/roles', roleRouter);
organisationRouter.use('/:organisation/boards', boardRouter);

module.exports = organisationRouter;
