var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname, {'index': ['bab.html', 'bab.htm']})).listen(3000, function(){
    console.log('Server running on 3000...');
});