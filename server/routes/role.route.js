const { createRole, updateRole } = require('../controllers/role.controller');
const schemaMiddleware = require('./middlewares/schemaMiddleware');
const addOrganisationId = require('./middlewares/addOrganisationId');
const { restrictToRole } = require('./middlewares/restrictTo');
const {
  addOrUpgradeUserRoleSchema,
  upgradeUserRoleSchema,
} = require('./schemas/role.schema');
const router = require('./utils/router');
const addOwnerId = require('./middlewares/addOwnerId');

const roleRouter = router;

roleRouter
  .post(
    '/add-user',
    addOrganisationId,
    addOwnerId,
    restrictToRole('supervisor', 'manager'),
    schemaMiddleware(addOrUpgradeUserRoleSchema),
    createRole
  )
  .patch(
    '/update-role',
    addOrganisationId,
    addOwnerId,
    restrictToRole('supervisor'),
    schemaMiddleware(upgradeUserRoleSchema),
    updateRole
  );

module.exports = roleRouter;
