const {
  createOrganisation,
  getOrganisationById,
  updateOrganisation,
  deleteOrganisation,
} = require('../controllers/organisation.controller');
const protect = require('./middlewares/protect');

const addToBody = require('./middlewares/addToBody');
const addOrganisationId = addToBody('organisation');
const addOwnerId = addToBody('owner');
const { restrictToRole } = require('./middlewares/restrictTo');
const schemaMiddleware = require('./middlewares/schemaMiddleware');
const {
  createOrganisationSchema,
  updateOrganisationSchema,
} = require('./schemas/organisation.schema');
const express = require('express');
const boardRouter = require('./board.route');
const roleRouter = require('./role.route');

let convertToId = addToBody({ id: 'organisation' });

const organisationRouter = express.Router();

organisationRouter.use(protect, addOrganisationId);

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
  addOwnerId,
  restrictToRole('supervisor'),
  deleteOrganisation
);
organisationRouter.patch(
  '/:organisation',
  convertToId,
  addOwnerId,
  restrictToRole('supervisor'),
  schemaMiddleware(updateOrganisationSchema),
  updateOrganisation
);

organisationRouter.use('/:organisation/roles', roleRouter);
organisationRouter.use('/:organisation/boards', boardRouter);

module.exports = organisationRouter;
