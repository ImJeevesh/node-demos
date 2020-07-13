import { Converter as csv } from 'csvtojson';
import { createReadStream, createWriteStream } from 'fs';

const readStream = createReadStream('.csv/nodejs-hw1-ex1.csv');
const writeStream = createWriteStream('.csv/nodejs-hw1-ex1.txt');

const colParser = {
  amount: 'omit',
  price: 'number'
};

const csv2Json = csv({ colParser })
  .preFileLine((fileLineString, lineIdx) => lineIdx === 0 ? fileLineString.toLowerCase() : fileLineString);

readStream.pipe(csv2Json).pipe(writeStream);
