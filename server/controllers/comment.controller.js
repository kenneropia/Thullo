const factory = require('./utils/handlerFactory');
const Comment = require('./../models/comment.model');

exports.createComment = factory.createOne(Comment);

exports.getAllComments = factory.getAll(Comment);

exports.getComment = factory.getOne(Comment);

exports.updateComment = factory.updateOne(Comment);

exports.deleteComment = factory.deleteOne(Comment);
