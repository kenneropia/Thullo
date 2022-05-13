const {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
} = require('../controllers/tag.controller');
const addOwnerId = require('./middlewares/addOwnerId');
const { convertToId } = require('./middlewares/convertToId')('tag');
const router = require('./utils/router');

const tagRouter = router;

tagRouter
  .route('/tags')
  .post(addOwnerId, createTag)
  .get(getAllTags)
  .get('/:tag', convertToId, getTagById)
  .patch('/:tag', convertToId, addOwnerId, updateTag);

module.exports = tagRouter;
