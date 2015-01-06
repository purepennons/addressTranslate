module.exports = function(address, cb, errCb) {
  var  Tools       = require('./tools')
     , querystring = require('querystring');

  var tools = new Tools();

  var qs = {
    address: address,
    sensor: true
  };

  var options = {
    hostname: 'maps.googleapis.com',
    port: 80,
    path: '/maps/api/geocode/json?' + querystring.stringify(qs),
    method: 'GET'
  };

  tools.httpRequest(options, function(result) {
    cb(result);
  }, function(statusCode) {
    errCb(statusCode);
  });

};
