const csv = require('csvtojson');
const fs = require('fs');

const readStream = fs.createReadStream('.csv/nodejs-hw1-ex1.csv');
const writeStream = fs.createWriteStream('.csv/nodejs-hw1-ex1.txt');

const colParser = {
  amount: 'omit',
  price: 'number'
};

const csv2Json = csv({ colParser })
  .preFileLine(function (fileLineString, lineIdx) {
    if (lineIdx === 0) {
      // column headers - all keys are lowercased
      return fileLineString.toLowerCase();
    }
    return fileLineString;
  });

readStream.pipe(csv2Json).pipe(writeStream);
