var serve = require('koa-static');
var app = require('koa')();

app.use(serve('app'));

var port = process.env.port || 3000;
app.listen(port);
console.log('listening on port ' + port);
