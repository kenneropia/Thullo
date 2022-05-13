const fs = require;
const sharp = require('sharp');

const resizePhoto = (buffer, resolution) =>
  sharp(buffer)
    .resize(...resolution)
    .toFormat('jpeg')
    .jpeg({ quality: 90 });

module.exports = resizePhoto;
