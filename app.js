
/**
 * Module dependencies.
 */

var express = require('express');
//var RedisStore = require('connect-redis')(express);
var routes = require('./routes');
var index = require('./routes/index');
//var flight = require('./routes/flight');
//var hotel = require('./routes/hotel');
var http = require('http');
var path = require('path');
//var redis = require('redis');
var socket = require('socket.io');
//create redis client                                                                                                                                                                                                                       
//var client = redis.createClient();

var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session({secret: '1234567890QWERTY'}));
/*app.use(express.session({
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    db: 2
    //pass: 'RedisPASS'
  }),
  secret: '1234567890QWERTY'
}));*/
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/',index.list);
//app.get('/flights', flight.list);
//app.get('/flightlp',flight.landingpage);
//app.get('/hotels', hotel.list);
//app.post('/city',index.getCity);

CONNECTION = '';
require('dns').resolve('www.google.com', function(err) {
  if (err){
     // no connection
    console.log('Local environement')
    CONNECTION = false;
  }else{
     // connection
   
   CONNECTION = true;
   console.log('Internet environement: '+CONNECTION)
  }
});
server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
sio = require('socket.io').listen(server);
sio.set('log level', 3);
module.exports.sio = sio; 
// build local environement
BUILDLOCALENV=false;