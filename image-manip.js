var fs = require('fs');
var Q = require('q');
var spawn = require('child_process').spawn;

function ImageProcess(inFile) {
  this.inFile = inFile;
  this.outFile = '';
  this.args_ = [];
  this.opts = {};
  this.process_ = null;
}

ImageProcess.prototype.destroy = function() {
  if (this.process_) this.process_.kill();
  //fs.unlink(this.outFile);
};

ImageProcess.prototype.addArg_ = function(prop, cast) {
  cast = cast || Number;

  if (prop in this.opts) {
    if (cast === Boolean && this.opts[prop]) {
      this.args_.push('-' + prop);
    }
    else {
      this.args_.push('-' + prop, cast(this.opts[prop]));
    }
  }
};


function WebpEncode(inFile, opts) {
  ImageProcess.call(this, inFile);

  this.outFile = 'compress-tmp/' + Date.now() + Math.floor(Math.random() * 1000000) + '.webp';
  this.opts = opts;
  this.addArg_('q');
  this.addArg_('lossless', Boolean);
  this.addArg_('alpha_q');
  this.addArg_('m');
  this.addArg_('segments');
  this.addArg_('sns');
  this.addArg_('f');
  this.addArg_('sharpness');
  this.addArg_('strong', Boolean);
  this.addArg_('alpha_filter', String);
  this.addArg_('alpha_cleanup', Boolean);
  this.addArg_('hint', String);

  this.args_.push(inFile, '-o', this.outFile);
}

exports.WebpEncode = WebpEncode;

WebpEncode.prototype = Object.create(ImageProcess.prototype);

WebpEncode.prototype.start = function() {
  var webpEncode = this;
  var deferred = Q.defer();
  var error = '';


  this.process_ = spawn('bin/cwebp', this.args_).on('exit', function(code) {
    if (code) {
      deferred.reject(error);
    }
    else {
      deferred.resolve(webpEncode.outFile);
    }
  });

  this.process_.stderr.on('data', function(data) {
    error += data;
  });

  return deferred.promise;
};


function ColorReduce(inFile, colors, opts) {
  ImageProcess.call(this, inFile);

  this.outFile = 'compress-tmp/' + Date.now() + Math.floor(Math.random() * 1000000) + '.png';
  this.opts = opts;

  if (!opts.dither) {
    this.args_.push('--nofs');
  }

  this.args_.push(colors);
}

exports.ColorReduce = ColorReduce;

ColorReduce.prototype = Object.create(ImageProcess.prototype);

ColorReduce.prototype.start = function() {
  var colorReduce = this;
  var deferred = Q.defer();
  var error = '';
  this.process_ = spawn('bin/pngquant', this._args).on('exit', function(code) {
    if (code) {
      deferred.reject(error);
    }
    else {
      deferred.resolve(colorReduce.outFile);
    }
  });

  fs.createReadStream(this.inFile).pipe(this.process_.stdin);

  this.process_.stdout.pipe(fs.createWriteStream(this.outFile, {
    mode: 0644
  }));

  this.process_.stderr.on('data', function(data) {
    error += data;
  });

  return deferred.promise;
};