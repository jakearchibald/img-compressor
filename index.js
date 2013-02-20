var express = require('express');
var spawn = require('child_process').spawn;
var fs = require('fs');
var app = express();

app.use('/static', express.static(__dirname + '/www/static'));
app.use(express.bodyParser());

app.get('/', function(req, res){
  res.sendfile('www/index.html');
});

app.post('/compress/upload', function(req, res) {
  var id = '' + Date.now() + Math.floor(Math.random() * 1000000);

  if (req.files.image) {
    fs.rename(req.files.image.path, 'upload-tmp/' + id, function(err) {
      if (err) {
        res.json({
          err: err
        });
      }
      else {
        res.json({
          id: id
        });
      }
    });
  }
  else {
    res.status(400).json({
      err: "No image sent"
    });
  }
});

app.post('/compress/webp', function(req, res) {
  var id = req.body.id;

  if (!id) {
    res.status(400).json({
      err: "No ID"
    });
    return;
  }

  var args = [];

  var opts = {
    q: Number(req.body.q),
    lossless: Boolean(req.body.lossless),
    alpha_q: Number(req.body.alpha_q)
  };

  if (opts.lossless) {
    args.push('-lossless');
  }
  else if ('q' in opts) {
    args.push('-q', opts.q);
  }
  if ('alpha_q' in opts) {
    args.push('-alpha_q', opts.alpha_q);
  }

  function requestEnd() {
    fs.unlink(outfile);
  }

  res.on('close', requestEnd);


  var error = '';
  var outfile = 'compress-tmp/' + Date.now() + Math.floor(Math.random() * 1000000) + '.webp';
  
  args.push('upload-tmp/' + id, '-o', outfile);

  var cmd = spawn('bin/cwebp', args).on('exit', function(code) {
    if (code) {
      res.status(400).json({
        err: error
      });
      requestEnd();
    }
    else {
      res.sendfile(outfile, requestEnd);
    }
  });

  cmd.stderr.on('data', function(data) {
    error += data;
  });
});

app.get('/img-test/', function(req, res) {
  var error = '';
  var outfile = 'img-tmp/' + Date.now() + Math.floor(Math.random() * 1000000) + '.webp';

  var cmd = spawn('bin/cwebp', ['-q', '80', 'img-tmp/to-encode.png', '-o', outfile]).on('exit', function(code) {
    if (code) {
      console.log(error);
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