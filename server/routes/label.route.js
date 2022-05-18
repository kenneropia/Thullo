const {
  createLabel,
  getLabels,
  updateLabel,
  deleteLabel,
} = require('../controllers/label.controller');
const addOrganisationId = require('./middlewares/addOrganisationId');
const addOwnerId = require('./middlewares/addOwnerId');
const convertToId = require('./middlewares/convertToId')('label');
const { restrictToRole } = require('./middlewares/restrictTo');
const router = require('./utils/router');

const labelRouter = router;

labelRouter
  .route('/')
  .get(addOrganisationId, restrictToRole('supervisor', 'manager'), getLabels)
  .post(
    addOwnerId,
    addOrganisationId,
    restrictToRole('supervisor', 'manager'),
    createLabel
  );

labelRouter
  .route('/:label')
  .get(
    convertToId,
    addOrganisationId,
    restrictToRole('supervisor', 'manager'),
    getLabelById
  )

  .patch(
    convertToId,
    addOrganisationId,
    addOwnerId,
    restrictToRole('supervisor', 'manager'),
    updateLabel
  )
  .delete(
    convertToId,
    addOrganisationId,
    addOwnerId,
    restrictToRole('supervisor', 'manager'),
    deleteLabel
  );

module.exports = labelRouter;
