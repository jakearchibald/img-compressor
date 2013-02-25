var express = require('express');
var views = require('./views.js');
var app = express();

app.use('/static', express.static(__dirname + '/www/static'));
app.use(express.bodyParser());

app.get('/', views.index);
app.post('/compress/upload', views.upload);
app.post('/compress/webp', views.compressWebP);

app.listen(3000);