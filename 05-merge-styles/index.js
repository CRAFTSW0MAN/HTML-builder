const fs = require('node:fs');
const path = require('node:path');

const newBundle = 'bundle.css';
const newBundlePath = path.join(__dirname, 'project-dist', newBundle);

const styleFiles = path.join(__dirname, 'styles');
const writeStream = fs.createWriteStream(newBundlePath);

fs.readdir(styleFiles, { withFileTypes: true }, (error, items) => {
  if (error) {
    console.error(error.message);
    return;
  }

  items.forEach((file) => {
    const pathFile = path.join(file.path, file.name);
    const extname = path.extname(pathFile);
    if (extname === '.css') {
      const readStream = fs.createReadStream(pathFile);
      readStream.on('data', (chunk) => writeStream.write(chunk));

      readStream.on('error', (error) => console.log(`Error ${error.message}`));
    }
  });
});
