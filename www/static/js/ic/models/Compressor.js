(function() {
  function Compressor() {
    this.name = '';
    this.url = ''; // url to compressor
    this.output = null; // blob?
    this.input = null; // blob?
    this.opts = {}; // compressor options
  }

  var CompressorProto = Compressor.prototype;

  CompressorProto.compress = function() {
    // return a promise with the output
  };

  ic.models.Compressor = Compressor;
})();