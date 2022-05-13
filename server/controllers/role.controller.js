const { createOne, updateOne } = require('./utils/handlerFactory');

exports.createRole = createOne(Role);

exports.updateRole = updateOne(Role);
