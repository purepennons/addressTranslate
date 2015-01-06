var fs    = require('fs')
   ,iconv = require('iconv-lite')
   ,baby = require('babyparse');

var readFromCSV = fs.readFileSync('./Input/A_utf8.csv').toString();  //同步讀檔
// console.log(readFromCSV);

var inputJSON = baby.parse(readFromCSV);

console.log(inputJSON.data[0]);
