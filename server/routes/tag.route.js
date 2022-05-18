const {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
} = require('../controllers/tag.controller');
const addOwnerId = require('./middlewares/addOwnerId');
const { restrictToRole } = require('./middlewares/restrictTo');
const { convertToId } = require('./middlewares/convertToId')('tag');
const router = require('./utils/router');

const tagRouter = router;

tagRouter
  .route('/')
  .post(addOwnerId, restrictToRole('supervisor', 'manager'), createTag)
  .get(getAllTags);

tagRouter
  .route('/:tag')
  .get(convertToId, getTagById)
  .patch(
    convertToId,
    addOwnerId,
    restrictToRole('supervisor', 'manager'),
    updateTag
  );

module.exports = tagRouter;
