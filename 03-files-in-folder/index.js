const fs = require('node:fs');
const path = require('node:path');
const dir = 'secret-folder';
const dirPath = path.join(__dirname, dir);
fs.readdir(dirPath, { withFileTypes: true }, (error, items) => {
    if (error) {
        console.error(error.message);
        return;
    }

    const files = items.filter(elem => elem.isFile());
    files.forEach(file => {
        const pathFile = path.join(file.path, file.name);
        const extname = path.extname(pathFile).slice(1);
        const name = file.name.replace(`.${extname}`, '')
        fs.stat(pathFile, (error, stats) => {
            if (error) {
                console.log(error.message);
                return;
            }
            console.log(`${name} - ${extname} - ${(stats.size / 1024).toFixed(3)}kb`);
        });
    })

});
