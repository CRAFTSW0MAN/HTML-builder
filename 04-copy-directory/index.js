const fs = require('node:fs');
const path = require('node:path');

const dir = 'files';
const dirPath = path.join(__dirname, dir);

const dirCopy = 'files-copy';
const dirCopyPath = path.join(__dirname, dirCopy);

fs.mkdir(dirCopyPath, { recursive: true }, (error) => {
  if (error) {
    console.error(error.message);
    return;
  }
});
fs.readdir(dirCopyPath, { withFileTypes: true }, (error, files) => {
  if (error) {
    console.error(error.message);
    return;
  }

  files.forEach((file) => {
    const pathFile = path.join(dirCopyPath, file.name);
    fs.unlink(pathFile, (error) => {
      if (error) {
        console.error(error.message);
        return;
      }
    });
  });
});

fs.readdir(dirPath, { withFileTypes: true }, (error, files) => {
  if (error) {
    console.error(error.message);
    return;
  }

  files.forEach((file) => {
    if (file.isFile()) {
      const pathFile = path.join(dirPath, file.name);
      const pathFileCopy = path.join(dirCopyPath, file.name);
      fs.copyFile(pathFile, pathFileCopy, (copyError) => {
        if (copyError) {
          console.error(copyError.message);
          return;
        }
        console.log(`${file.name} has been successfully copied.`);
      });
    }
  });
});
