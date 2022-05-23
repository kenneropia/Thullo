const express = require('express');
const Joi = require('joi');
const {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
} = require('../controllers/tag.controller');
const addOrganisationId = require('./middlewares/addOrganisationId');
const addOwnerId = require('./middlewares/addOwnerId');
const { restrictToRole } = require('./middlewares/restrictTo');
const schemaMiddleware = require('./middlewares/schemaMiddleware');
const { objectId } = require('./schemas/utils/JoiObjectId');
const convertToId = require('./middlewares/convertToId')('tag');
const router = require('./utils/router');

const tagRouter = express.Router({ mergeParams: true });

const createTagSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  organisation: objectId().required(),
  owner: objectId().required(),
});

const updateTagSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  organisation: objectId().required(),
  owner: objectId().required(),
});

tagRouter.use(addOrganisationId);

tagRouter
  .route('/')
  .post(
    addOwnerId,
    restrictToRole('supervisor', 'manager'),
    schemaMiddleware(createTagSchema),
    createTag
  )
  .get(getAllTags);

tagRouter
  .route('/:tag')
  .get(convertToId, getTagById)
  .patch(
    convertToId,
    addOwnerId,
    restrictToRole('supervisor', 'manager'),
    schemaMiddleware(updateTagSchema),
    updateTag
  )
  .delete(convertToId, addOwnerId, deleteTag);

module.exports = tagRouter;
