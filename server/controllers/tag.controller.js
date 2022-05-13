const Tag = require('../models/tag.model');
const factory = require('./utils/handlerFactory');

exports.createTag = factory.createOne(Tag);

exports.getAllTags = factory.getAll(Tag);

exports.getTagById = factory.getOne(Tag);

exports.updateTag = factory.updateOne(Tag);

exports.deleteTag = factory.deleteOne(Tag);
