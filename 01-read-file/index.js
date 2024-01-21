const fs = require('node:fs');
const path = require('node:path');
const filePath = path.join(__dirname, './text.txt');
const readStream = fs.createReadStream(filePath, 'utf-8');
readStream.on('data', text => console.log(text));
readStream.on('error', error => console.log(`Error ${error.message}`));