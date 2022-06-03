const AWS = require('aws-sdk');
const { v4: UUID } = require('uuid');
const Busboy = require('busboy');
const Attachment = require('../models/attachment.model');
const AppError = require('../utils/AppError');
AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const S3 = new AWS.S3();

exports.deleteFile = async (req, res, next) => {
  let doc = await Attachment.findOne({
    _id: req.params.attachment,
    owner: req.user.id,
    organisation: req.params.organisation,
    task: req.params.task,
    board: req.params.board,
  });

  if (!doc) {
    return next(
      new AppError(`No ${Model.modelName.toLowerCase} found with that ID`, 404)
    );
  }
  const params = {
    Bucket: 'thullo-attachment',
    Key: doc.key,
  };

  S3.deleteObject(params, async (err, data) => {
    if (err) {
      return next(new AppError(err, 500));
    } else {
      await Attachment.findByIdAndDelete(req.params.attachment);

      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  });
};

exports.upload = async (req, res, next) => {
  const attachment = await Attachment.create({
    organisation: req.params.organisation,
    owner: req.user.id,
    board: req.params.board,
    task: req.params.task,
  });

  let fileCheck = 0;
  const fileKey = `${req.user.id}/${UUID()}`;
  let chunks = [],
    fname,
    ftype,
    fEncoding;

  let busboy = new Busboy({
    headers: req.headers,
    limits: {
      fileSize: 50 * 1024 * 1024,
      files: 1,
    },
  });
  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    if (fileCheck === 1) {
      file.resume();
    }

    fileCheck = 1;

    fname = filename.replace(/ /g, '_');
    ftype = mimetype;
    fEncoding = encoding;
    file.on('data', function (data) {
      // you will get chunks here will pull all chunk to an array and later concat it.

      chunks.push(data);
    });
  });
  busboy.on('finish', function () {
    const params = {
      Bucket: 'thullo-attachment', // your s3 bucket name
      Key: fileKey, // file key or file name
      Body: Buffer.concat(chunks), // concatinating all chunks

      ContentEncoding: fEncoding, // optional
      ContentType: ftype, // required
    };
    // we are sending buffer data to s3.
    S3.upload(params, async (err, s3res) => {
      if (err) {
        return next(new AppError(err, 500));
      } else {
        const editedAttachment = await Attachment.findById(attachment._id);
        editedAttachment.location = s3res.Location;
        editedAttachment.title = fname.split('.')[0];
        editedAttachment.extension = fname.split('.')[1];
        editedAttachment.fileSize = Buffer.concat(chunks).byteLength;
        editedAttachment.type = ftype;

        editedAttachment.key = params.Key;
        editedAttachment.save();

        res.send({
          data: editedAttachment,
          status: 'success',
        });
      }
    });
  });
  req.pipe(busboy);
};
