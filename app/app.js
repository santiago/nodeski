var express= require('express'),
    sys= require('sys'),
    io= require('socket.io'),
    fs= require('fs'),
    stylus= require('stylus'),
    net= require('net');

var websocket;

var app = module.exports = express.createServer();
app.set('view engine', 'jade');
app.configure(function(){
    app.use(express.bodyParser());
});

module.exports.__dirname= __dirname;

app.get('/*.css', function(req, res) {
    var url= req.url.split('/').reverse();
    if (url[1] == 'styl') {
	var filename= res.req.params[0].split('/')[1];
	var str= fs.readFileSync(__dirname + '/views/'+filename+'.styl', 'utf8');
	stylus.render(str, { filename: filename+'.styl' }, function(err, css){
	    if (err) throw err;
	    res.send(css);
	});
    } else {
	res.sendfile(__dirname+'/public/stylesheets/'+req.params[0]+'.css');
    }
});

app.get('/javascripts/*', function(req, res){
    res.sendfile(__dirname+'/public/javascripts/'+req.params[0]);
});

app.get('/images/*', function(req, res){
    res.sendfile(__dirname+'/public/images/'+req.params[0]);
});

app.get('/', function(req, res){
    res.render('index.jade', {
	locals: {
	    title: "OntoIM"
	}
    });
});

app.listen(8080);

var io= io.listen(app);
io.on('connection', function(client) {
    websocket= client;
    client.on('message', function(message){
	console.log(message);
    });
    
    client.on('disconnect', function(){
	client.broadcast({ announcement: client.sessionId + ' disconnected' });
    });
});