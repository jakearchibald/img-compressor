(function() {
  function Compressor(name) {
    this.name = name;
    this.url = ''; // url to compressor
    this.output = null; // blob?
    this.input = null; // blob?
    this.opts = {}; // cmd line opts
  }

  var CompressorProto = Compressor.prototype;

  CompressorProto.compress = function() {
    // return a promise with the output
  };

  ic.models.Compressor = Compressor;
})();