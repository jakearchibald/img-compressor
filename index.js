var express = require('express');
var spawn = require('child_process').spawn;
var fs = require('fs');
var app = express();

app.use('/static', express.static(__dirname + '/www/static'));

app.get('/', function(req, res){
  res.sendfile('www/index.html');
});

app.get('/img-test/', function(req, res) {
  res.on('close', function() {
    console.log('Done!');
  });

  var error = '';
  var outfile = 'img-tmp/' + Date.now() + Math.floor(Math.random() * 1000000) + '.webp';

  var cmd = spawn('bin/cwebp', ['-q', '80', 'img-tmp/to-encode.png', '-o', outfile]).on('exit', function(code) {
    if (code) {
      res.send(error);
    }
    else {
      res.sendfile(outfile, function() {
        fs.unlink(outfile);
      });
    }
  });

  cmd.stderr.on('data', function(data) {
    error += data;
  });
});

app.listen(3000);

exports = app;