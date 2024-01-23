const fs = require('node:fs');
const path = require('node:path');
const process = require('node:process');
const readline = require('readline');

const file = './text.txt';
const filePath = path.join(__dirname, file);
const readStream = fs.createWriteStream(filePath, 'utf-8');
const task = readline.createInterface({
  input: process.stdin,
  output: readStream,
});
process.stdout.write('Привет,Проверяющий, как проходит проверка таска? \n');
task.input.on('data', (data) => {
  if (data.toString().trim().toLowerCase() === 'exit') {
    exit();
  }
  task.output.write(`${data}`);
});

process.on('SIGINT', () => {
  exit();
});
const exit = () => {
  process.stdout.write('спасибо за уделенное время , удачи в учебе! \n');
  process.exit();
};
