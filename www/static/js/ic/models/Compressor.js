(function() {
  function Compressor() {
    this.name = '';
    this.url = ''; // url to compressor
    this.output = null; // blob
    this.outputImage_ = null; // image element
    this.input = null;
    this.compressPromise_ = null;
    this.lastRequest_ = null;
    this.opts = {}; // compressor options
  }

  var CompressorProto = Compressor.prototype;

  CompressorProto.compress = function() {
    var compressor = this;

    this.outputImage_ = null;

    // abort any existing request
    if (this.lastRequest_) {
      this.lastRequest_.abort();
    }

    this.lastRequest_ = ic.utils.post(this.url, {
      id: this.input.id,
      q: this.opts.q
    }, {
      responseType: 'blob'
    });

    this.compressPromise_ = this.lastRequest_.promise.then(function(req) {
      compressor.output = req.response;
    });

    return this.compressPromise_;
  };

  CompressorProto.outputImage = function() {
    var compressor = this;

    if (this.outputImage_) {
      return Q.resolve(this.outputImage_);
    }

    var promise = this.compressPromise_.then(function() {
      var readDeferred = Q.defer();
      var reader = new FileReader();
      reader.onload = function() {
        var img = new Image();
        compressor.outputImage_ = img;

        img.onload = function() {
          readDeferred.resolve(img);
        };

        img.src = reader.result;
      };
      reader.readAsDataURL(compressor.output);
      return readDeferred.promise;
    });

    return promise;
  };

  ic.models.Compressor = Compressor;
})();