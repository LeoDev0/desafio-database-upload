// import cvsParse from 'csv-parse';
// import fs from 'fs';
// import path from 'path';

// const cvsFilePath = path.resolve(__dirname, 'file.csv');

// const readCSVStream = fs.createReadStream(cvsFilePath);

// const parseStream = cvsParse({
//   from_line: 2,
//   ltrim: true,
//   rtrim: true,
// });

// const parseCSV = readCSVStream.pipe(parseStream);

// parseCSV.on('data', line => {
//   console.log(line);
// });

// parseCSV.on('end', () => {
//   console.log('Leitura do CSV finalizada');
// });

import csvParse from 'csv-parse';
import fs from 'fs';
import path from 'path';

async function loadCSV(filePath: string): any[] {
  const readCSVStream = fs.createReadStream(filePath);

  const parseStream = csvParse({
    from_line: 2,
    ltrim: true,
    rtrim: true,
  });

  const parseCSV = readCSVStream.pipe(parseStream);

  const lines = [];

  parseCSV.on('data', line => {
    lines.push(line);
  });

  await new Promise(resolve => {
    parseCSV.on('end', resolve);
  });

  return lines;
}

const csvFilePath = path.resolve(__dirname, 'file.csv');

const data = loadCSV(csvFilePath);

setTimeout(() => {
  console.log(data);
}, 3000);
