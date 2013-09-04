
/**
 * Module dependencies.
 */

var http = require('http');
var path = require('path');
var os = require('os');

var express = require('express');
var socket = require('socket.io');
var ConnectRedis = require('connect-redis')(express);

var routes = require('./routes');
var user = require('./routes/user');

var app = express();
var redisStore = new ConnectRedis({prefix: 's:session:'});
var server = http.createServer(app);
var io = socket.listen(server)

io.configure(function(){
  io.set('log level', 1)
})

function sysStats(){
  var retObj = {}
  Object.keys(os).filter(function(method){
    if (typeof(os[method]) !== 'function') { return false;}

    if (method === 'getNetworkInterfaces') { return false;}
    if (method === 'networkInterfaces') { return false;} 
    if (method === 'tmpDir') { return false;}

    return true
  }).forEach(function(method){
    retObj[method] = os[method]();
  })
  return retObj;
}

io.sockets.on('connection', function(socket){
 // console.log('HHHHHHH', Object.keys(os));
  setInterval(function(){
    socket.emit('datum', sysStats())
  }, 1000)
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
//
// pay attetion on this cookie secrete
//
app.use(express.cookieParser('your secret here'));
app.use(express.session({
  store: redisStore,
  secret: 'your secret here'
}));
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
