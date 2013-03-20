var fs = require('fs');
var imageManip = require('./image-manip.js');
var Q = require('q');


exports.index = function(req, res) {
  res.sendfile('www/index.html');
};

exports.upload = function(req, res) {
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
};

exports.compressWebP = function(req, res) {
  var id = req.body.id;

  if (!id) {
    res.status(400).json({
      err: "No ID"
    });
    return;
  }

  function requestEnd() {
    imageProcesses.forEach(function(process) {
      process.destroy();
    });
  }

  res.on('close', requestEnd);

  var imageProcesses = [];

  var deferred = Q.resolve('upload-tmp/' + id).then(function(inFile) {
    if (req.body.colors) {
      var process = new imageManip.ColorReduce(inFile, Number(req.body.colors) || 256, {
        dither: !!req.body.dither
      });
      imageProcesses.push(process);
      return process.start();
    }
    else return inFile;
  }).then(function(inFile) {
    var process = new imageManip.WebpEncode(inFile, req.body);
    imageProcesses.push(process);
    return process.start();
  }).then(function(outFile) {
    res.sendfile(outFile, requestEnd);
  }).fail(function(error) {
    console.error(error);
    res.status(400).json({
      err: error
    });
    requestEnd();
  });

};

exports.compressJpeg = function(req, res) {
  var id = req.body.id;

  if (!id) {
    res.status(400).json({
      err: "No ID"
    });
    return;
  }

  function requestEnd() {
    imageProcesses.forEach(function(process) {
      process.destroy();
    });
  }

  res.on('close', requestEnd);

  var imageProcesses = [];

  var deferred = Q.resolve('upload-tmp/' + id).then(function(inFile) {
    var process = new imageManip.BmpEncode(inFile);
    imageProcesses.push(process);
    return process.start();
  }).then(function(inFile) {
    var process = new imageManip.JpegEncode(inFile, req.body);
    imageProcesses.push(process);
    return process.start();
  }).then(function(outFile) {
    res.sendfile(outFile, requestEnd);
  }).fail(function(error) {
    console.error(error);
    res.status(400).json({
      err: error
    });
    requestEnd();
  });

};