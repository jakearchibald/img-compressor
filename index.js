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

function reduceColors(inFile, colors, dither, callback) {
  var args = [];
  var outFile = 'compress-tmp/' + Date.now() + Math.floor(Math.random() * 1000000) + '.png';
  var error = '';

  if (!dither) {
    args.push('--nofs');
  }

  args.push(colors);

  var cmd = spawn('bin/pngquant', args).on('exit', function(code) {
    if (code) {
      callback(error);
    }
    else {
      callback(null, outFile);
    }
  });

  cmd.stdout.pipe(fs.createWriteStream(outFile));
  fs.createReadStream(inFile).pipe(cmd.stdin);

  cmd.stderr.on('data', function(data) {
    error += data;
  });
}

app.post('/compress/webp', function(req, res) {
  var id = req.body.id;

  if (!id) {
    res.status(400).json({
      err: "No ID"
    });
    return;
  }

  var args = [];

  function addArg(prop, cast) {
    cast = cast || Number;

    if (prop in req.body) {
      if (cast === Boolean && req.body[prop]) {
        args.push('-' + prop);
      }
      else {
        args.push('-' + prop, cast(req.body[prop]));
      }
    }
  }

  addArg('q');
  addArg('lossless', Boolean);
  addArg('alpha_q');
  addArg('m');
  addArg('segments');
  addArg('sns');
  addArg('f');
  addArg('sharpness');
  addArg('strong', Boolean);
  addArg('alpha_filter', String);
  addArg('alpha_cleanup', Boolean);
  addArg('hint', String);

  function requestEnd() {
    fs.unlink(outFile);

    if (reducedInFile) {
      fs.unlink(reducedInFile);
    }
  }

  res.on('close', requestEnd);

  var error = '';
  var inFile = 'upload-tmp/' + id;
  var outFile = 'compress-tmp/' + Date.now() + Math.floor(Math.random() * 1000000) + '.webp';
  var reducedInFile;

  function compressWebP() {
    args.push(reducedInFile || inFile, '-o', outFile);

    var cmd = spawn('bin/cwebp', args).on('exit', function(code) {
      if (code) {
        res.status(400).json({
          err: error
        });
        requestEnd();
      }
      else {
        res.sendfile(outFile, requestEnd);
      }
    });

    cmd.stderr.on('data', function(data) {
      error += data;
    });
  }

  if (req.body.colors) {
    reduceColors(inFile, Number(req.body.colors) || 256, Boolean(req.body.dither), function(err, rif) {
      if (err) {
        res.status(400).json({
          err: err
        });
        requestEnd();
      }
      else {
        reducedInFile = rif;
        compressWebP();
      }
    });
  }
  else {
    compressWebP();
  }

});

app.listen(3000);

exports = app;