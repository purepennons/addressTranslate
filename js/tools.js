var ToolsImmed =  (function() {
  var Tools = function(){
    var http = require('http');
    var https = require('https');

    //http/https request function
    this.httpRequest = function(options, cb, errCb){
      var req = http.request(options, function(res){
        var recData = '';
        res.setEncoding('utf8');
        if(res.statusCode === 200){

          //receive data by chunk
          res.on('data', function (chunk) {
            recData += chunk;
          });

          //wait all data to be received
          res.on('end', function(){
            cb(recData);
          });

        } else {
          errCb(res.statusCode);
        }
      });

      req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
      });
      req.end();
    };

    this.httpsRequest = function(options, cb, errCb){
      var req = https.request(options, function(res){
        var recData = '';
        res.setEncoding('utf8');
        if(res.statusCode === 200){

          //receive data by chunk
          res.on('data', function (chunk) {
            recData += chunk;
          });

          //wait all data to be received
          res.on('end', function(){
            cb(recData);
          });

        } else {
          errCb(res.statusCode);
        }
      });

      req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
      });
      req.end();
    };
  };

  return Tools;

})();

module.exports = ToolsImmed;
