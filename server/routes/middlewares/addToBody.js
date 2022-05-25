const addToBody = (param) => (req, res, next) => {
  if (param == 'owner') {
    req.body.owner = req.user.id;
    return next();
  }
  if (!Array.isArray(param) && typeof param === 'object') {
    req.params.id = req.params[param.id];

    delete req.params[param.id];
    return next();
  }
  req.body[param] = req.params[param];
  console.log(req.params);
  next();
};
module.exports = addToBody;

// const addToBody = (...params) => {
//   let isIdSet = false;
//   params.map((param) => async (req, res, next) => {
//     if (!Array.isArray(param) && typeof param === 'object') {
//       if (isIdSet) next(new Error('trying to set duplicate id'));
//       req.params.id = req.params[param.id];
//       isIdSet = true;
//       next();
//     }
//     if (param == 'owner') {
//       req.body.owner = req.user.id;
//       return next();
//     }
//     req.body[param] = req.params[param];
//     next();
//   });
// };
