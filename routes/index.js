
/*
 * GET home page.
 */
var request = require('request');
var fs = require('fs');
//create redis client                                                                                                                                                                                                                       
//var client = redis.createClient();
var async = require('async');
var dateFormat = require("dateformat");
var http = require("http");

//to get access to the socket
sio = require('../app').sio;

exports.index = function(req, res){
  res.render('index', { title: 'WN2LIV' });
};

exports.list = function(req, res){
var departureDate = '';
  var returnDate = '';
  var origin = '';
  var pickuplocation = '';
  var arrivaldate = '';
  var flightnumber = '';
  var reqParams='';
  //call external data
  if (Object.getOwnPropertyNames(req.body).length > 0){
    console.log('Body'+ JSON.stringify(req.body));
    origin = req.body.origin;
    pickuplocation = req.body.pickuplocation;
    arrivaldate = req.body.arrivaldate;
    flightnumber = req.body.flightnumber;
    reqParams = req.body;
  }else{
    console.log('Not a POST');
  }
  res.render('index',{formparam : reqParams});
  async.parallel([
    function(callback) {
      console.log('One parallel');
      callback();
        /*makeAPIcall(geo_query,function(response){
            if(type == 'CITY'){
              centerLat = response.city.lat;
              centerLon = response.city.lng;
              sio.sockets.emit('coords',response.city);
              callback(geoloc);
            }else if (type == 'AIRPORT'){
              centerLat = response.lat;
              centerLon = response.lng;
              sio.sockets.emit('coords',response);
              callback();
            }
        });*/
    },
    function(callback){
      console.log('Other parallel');
      callback();
      /*makeAPIcall(flightopensearch_query,function(fResponse){
        
        flightResponse = fResponse;
        async.forEach(fResponse, function(flight, callback) {
          var newdate = flight.departure_date.replace(new RegExp( "([1][3-5])([0-1][0-9])([0-3][0-9])", "gi" ),"$3-$2-20$1");
          var shortdate = flight.departure_date.replace(new RegExp( "([1][3-5])([0-1][0-9])([0-3][0-9])", "gi" ),"$3\/$2");
          graph.rows.push(JSON.parse('{"c":[{"v":"'+ flight.departure_date +'", "f": "'+ shortdate+'"},{"v":' + flight.price +',"f" : "'+ flight.price +'€"}]}')) ;
          callback();//for makeAPIcall 
        }, function(err) {
            if (err) { console.log(err)};
              //res.render('flight/landingpage',{graphdata: graph, formparam : reqParams}); 
              //res.render('flight/landingpage',{formparam : reqParams}); 
              sio.sockets.emit('chartdata',graph);
              graph.rows =[];  
              callback();//for parallel callback
        });
      });*/
    },// When all the parallel functions answer then 
  ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
      var response ={};
      response.lat = 51;
      response.lng = 10;
      sio.sockets.emit('coords',response);
      console.log('After Emit coords' + JSON.stringify(response));
    });
};







function makeAPIcall(fctURL, cb) {
  //console.log('API REQ' + fctURL);
  request(fctURL, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //console.log('API RESP:' + body);      
        return cb(JSON.parse(body))
      }
      else
          return cb(null);
  });
}


