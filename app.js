
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var rra = require('./routes/rra');

var app = express();

// all environments
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', rra.home);
app.post('/', rra.home_post_handler);
app.get('/restaurants', rra.restaurants);
app.get('/restaurants/:id', rra.restaurant);
app.get('/logout', function(req,res){
	delete req.session.username;
	res.redirect('/')
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
