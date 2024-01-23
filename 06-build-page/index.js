const fs = require('node:fs');
const path = require('node:path');

const stylesPath = path.join(__dirname, 'styles');
const componentsPath = path.join(__dirname, 'components');
const assetsPath = path.join(__dirname, 'assets');
const templatePath = path.join(__dirname, 'template.html');

const projectDistePath = path.join(__dirname, 'project-dist');
const newSlylePath = path.join(projectDistePath, 'style.css');
const newIndexPath = path.join(projectDistePath, 'index.html');
const newAssetsPath = path.join(projectDistePath, 'assets');

const writeStyle = fs.createWriteStream(newSlylePath);
const readTemplate = fs.createReadStream(templatePath);
let stringIndex = '';
readTemplate.on('data', (data) => {
  stringIndex = data.toString();
});

function createMkdir(data) {
  fs.mkdir(data, { recursive: true }, (error) =>
    console.log(`Error ${error.message}`),
  );
}

function copyFiles(data, originData) {
  fs.readdir(originData, { withFileTypes: true }, (error, files) => {
    if (error) {
      console.error(error.message);
      return;
    }

    files.forEach((file) => {
      const pathFile = path.join(originData, file.name);
      const extname = path.extname(pathFile);
      if (extname === '.css') {
        const readStream = fs.createReadStream(pathFile);
        readStream.on('data', (chunk) => writeStyle.write(chunk));
        readStream.on('error', (error) =>
          console.log(`Error ${error.message}`),
        );
      }
      if (extname === '.html') {
        const section = `{{${file.name.replace(extname, '')}}}`;
        const readStream = fs.createReadStream(pathFile, 'utf-8');
        readStream.on('data', (chunk) => {
          stringIndex = stringIndex.replaceAll(section, chunk);
          fs.writeFile(data, stringIndex, (error) =>
            console.log(`Error ${error.message}`),
          );
        });
        readStream.on('error', (error) =>
          console.log(`Error ${error.message}`),
        );
      }
    });
  });
}

function copyFilesDirectory(data, originData) {
  fs.readdir(originData, { withFileTypes: true }, (error, files) => {
    if (error) {
      console.error(error.message);
      return;
    }

    files.forEach((file) => {
      const pathFile = path.join(originData, file.name);
      if (file.isDirectory()) {
        createMkdir(path.join(data, file.name));
        copyFilesDirectory(
          path.join(data, file.name),
          path.join(originData, file.name),
        );
      } else {
        if (file.isFile()) {
          const pathFileCopy = path.join(data, file.name);
          fs.copyFile(pathFile, pathFileCopy, (error) =>
            console.log(`Error ${error.message}`),
          );
        }
      }
    });
  });
}
createMkdir(projectDistePath);
createMkdir(newAssetsPath);
copyFiles(newSlylePath, stylesPath);
copyFiles(newIndexPath, componentsPath);
copyFilesDirectory(newAssetsPath, assetsPath);
