const factory = require('./utils/handlerFactory');
const Comment = require('./../models/comment.model');

exports.createComment = factory.createComment(Comment);

exports.getAllComments = factory.getAll(Comment);

exports.getComment = factory.getComment(Comment);

exports.updateComment = factory.updateComment(Comment);

exports.deleteComment = factory.deleteComment(Comment);
