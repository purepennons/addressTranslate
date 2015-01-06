var  fs                  = require('fs')
   , iconv               = require('iconv-lite')
   , baby                = require('babyparse')
   , async               = require('async')
   , addressToCoordinate = require('./js/addressToLatitude');

var argv = process.argv;

if(argv.length === 5) {
  var  filePath = argv[2]
     , addressCol = argv[3]
     , outputPath = argv[4];

  var readFromCSV = fs.readFileSync(filePath).toString();  //同步讀檔

  var inputJSON = baby.parse(readFromCSV);

  var data = inputJSON.data;

  var field = data.shift();
  var truthData = data;

  // console.log('truth', truthData[0]);
  // console.log('field', field[1]);

  // async.mapSeries(truthData, function(record, callback){
  //   addressToCoordinate(record[addressCol], function(result) {
  //
  //     var resultJSON = JSON.parse(result);
  //     // console.log(resultJSON.status);
  //     if(resultJSON.status === 'OK') {
  //
  //       var location = resultJSON.results[0].geometry.location;
  //
  //       record.push(location.lat);
  //       record.push(location.lng);
  //
  //
  //     } else {
  //       record.push('NA');
  //       record.push('NA');
  //     };
  //
  //     callback(null, record);
  //
  //     console.log('record: ', record[0]);
  //
  //
  //   }, function(err) {
  //     console.log('err', err);
  //   });
  //
  // }, function(err, results) {
  //
  //   results.unshift(field);
  //
  //   var outputJSON = results;
  //
  //   // console.log(outputJSON);
  //   var outputString = baby.unparse(outputJSON,
  //   {
  //     quotes: true,
  //     delimiter: ",",
  //     newline: "\r\n"
  //   });
  //   // console.log(outputString);
  //
  //   fs.writeFile(outputPath, outputString, function(err) {
  //     if(err) throw err;
  //     console.log(outputPath + ' was saved!');
  //   });
  //
  // });
  var addressArray = [];
  truthData.map(function(record) {
    addressArray.push(record[addressCol]);
  });



    console.log(outputString);

  fs.writeFile(outputPath, outputString, function(err) {
    if(err) throw err;
    console.log(outputPath + ' was saved!');
  });
} else {

  console.log('params not match.');

}
