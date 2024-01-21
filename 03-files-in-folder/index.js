const fs = require('node:fs');
const path = require('node:path');
const dir = './secret-folder';
const dirPath = path.resolve(__dirname, dir);
fs.readdir(dirPath, { withFileTypes: true }, (error, items) => {
    if (error) {
        console.error(error.message);
    } else {
        const files = items.filter(elem => elem.isFile());
        files.forEach(file => {
             const pathFile = path.join(file.path, file.name);
             const extname = path.extname(pathFile).slice(1);
             const name = file.name.replace(`.${extname}`, '')
             fs.stat(pathFile, (error, stats) => {
                if (error) {
                  console.log(error.message);
                }
                console.log(stats);
        
                console.log(`${name} - ${extname} - ${(stats.size / 1024).toFixed(3)}kb`);
              });

        })
    }
});
