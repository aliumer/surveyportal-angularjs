var express = require('express');
var path = require('path');

var app = express();

app.use('/dist', express.static('dist'));
app.use(express.static('/'));

app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'src',  'index.html'));
});

app.listen(3000);
