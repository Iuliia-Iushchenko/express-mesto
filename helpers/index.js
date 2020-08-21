const fs = require('fs');

const readFile = (file) => new Promise((resolve, rejects) => {
  fs.readFile(file, (error, data) => {
    if (error) {
      rejects(error);
    }
    resolve(data);
  });
});

module.exports = readFile;
