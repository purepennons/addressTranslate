var  fs                  = require('fs')
   , iconv               = require('iconv-lite')
   , baby                = require('babyparse')
   , async               = require('async')
   , addressToCoordinate = require('./js/addressToLatitude');

var argv = process.argv;

// if(argv.length === 5) {
  var  filePath   = argv[2]
     , addressCol = argv[3]
     , from       = argv[4]
     , to         = argv[5]
     , outputPath = argv[6];

  var readFromCSV = fs.readFileSync(filePath).toString();  //同步讀檔

  var inputJSON = baby.parse(readFromCSV);

  var data = inputJSON.data;

  var field = data.shift();
  var truthData = data.slice(from, to);

  // var address = data.map(function(record) {
  //   return record[addressCol];
  // });
  //
  // var out = "";
  //
  // for(var i=0;i<address.length;i++) {
  //   out += address[i] + ',\n';
  // };
  //
  // // console.log(out);
  //
  // fs.writeFile('address', out, function(err) {
  //   if(err) throw err;
  //   console.log(address + ' was saved!');
  // });
  batch(truthData, [], truthData.length, 0);

function batch(data, success, totalLength, counter) {

  var unsuccess = [];
  var beforeSuccessLength = success.length;

  async.eachSeries(truthData, function(record, callback){
    addressToCoordinate(record[addressCol], function(result) {

      var resultJSON = JSON.parse(result);
      // console.log(resultJSON.status);
      if(resultJSON.status === 'OK') {

        var location = resultJSON.results[0].geometry.location;

        record.push(location.lat);
        record.push(location.lng);

        success.push(record);

        console.log('success_record: ', record[0]);

      } else {

        unsuccess.push(record);
        console.log('unsuccess_record_record: ', record[0]);

      };

      callback(null);

    }, function(err) {
      console.log('err', err);
    });

  }, function(err) {

    if(totalLength !== success.length) {
      if(beforeSuccessLength !== success.length || counter===0){
        console.log('b',beforeSuccessLength);
        console.log('a',success.length);
        console.log('counter',counter);

        console.log('success: ', success.length);
        console.log('unsuccess: ', unsuccess.length);

        var outputJSON = success;

        // console.log(outputJSON);
        var outputString = baby.unparse(outputJSON,
        {
          quotes: true,
          delimiter: ",",
          newline: "\r\n"
        });
        // console.log(outputString);

        fs.writeFile(outputPath+counter, outputString, function(err) {
          if(err) throw err;
          console.log(outputPath+counter + ' was saved!');
        });

        // unsuccess
        var outputJSON = unsuccess;

        // console.log(outputJSON);
        var outputString = baby.unparse(outputJSON,
        {
          quotes: true,
          delimiter: ",",
          newline: "\r\n"
        });
        // console.log(outputString);

        fs.writeFile(outputPath+'unsuccess'+counter, outputString, function(err) {
          if(err) throw err;
          console.log(outputPath+'unsuccess'+counter + ' was saved!');
        });

      }

      batch(unsuccess, success, totalLength, ++counter);

    } else {
      // success.unshift(field);

      var outputJSON = success;

      // console.log(outputJSON);
      var outputString = baby.unparse(outputJSON,
      {
        quotes: true,
        delimiter: ",",
        newline: "\r\n"
      });
      // console.log(outputString);

      fs.writeFile(outputPath, outputString, function(err) {
        if(err) throw err;
        console.log(outputPath + ' was saved!');
      });
    }

  });
};
