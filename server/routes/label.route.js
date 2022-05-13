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
  .route('/labels')
  .get(addOrganisationId, restrictToRole('supervisor', 'manager'), getLabels)
  .post(
    addOwnerId,
    addOrganisationId,
    restrictToRole('supervisor', 'manager'),
    createLabel
  )
  .get(
    '/:label',
    convertToId,
    addOrganisationId,
    restrictToRole('supervisor', 'manager'),
    getLabelById
  )

  .patch(
    '/:label',
    convertToId,
    addOrganisationId,
    addOwnerId,
    restrictToRole('supervisor', 'manager'),
    updateLabel
  )
  .delete(
    '/:label',
    convertToId,
    addOrganisationId,
    addOwnerId,
    restrictToRole('supervisor', 'manager'),
    deleteLabel
  );
module.exports = labelRouter;
