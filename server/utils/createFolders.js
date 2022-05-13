const fs = require('fs');

if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

if (!fs.existsSync('./uploads/users')) {
  fs.mkdirSync('./uploads/users');
}
