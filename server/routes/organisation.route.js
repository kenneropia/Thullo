const { protect } = require('../controllers/auth.controller');
const {
  createOrganisation,
  getOrganisationById,
  updateOrganisation,
  deleteOrganisation,
} = require('../controllers/organisation.controller');
const addOrganisationId = require('./middlewares/addOrganisationId');
const { restrictToRole } = require('./middlewares/restrictTo');
const addOwnerId = require('./middlewares/addOwnerId');
const router = require('./utils/router');
const convertToId = require('./middlewares/convertToId')('organisation');

const organisationRouter = router;
organisationRouter.use(protect, addOrganisationId);

organisationRouter
  .route('/')
  .post(addOwnerId, addOrganisationId, createOrganisation)
  .get('/:organisation', convertToId, addOrganisationId, getOrganisationById)
  .patch(
    '/:organisation',
    convertToId,
    addOrganisationId,
    addOwnerId,
    restrictToRole('supervisor'),
    updateOrganisation
  )
  .delete(
    '/:organisation',
    convertToId,
    addOrganisationId,
    addOwnerId,
    restrictToRole('supervisor'),
    deleteOrganisation
  );

module.exports = organisationRouter;
