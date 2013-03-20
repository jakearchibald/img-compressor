(function() {
  function JpegCompressor() {
    ic.models.Compressor.call(this);
    this.name = 'JPEG';
    this.url = '/compress/jpeg';
  }

  var JpegCompressorProto = JpegCompressor.prototype = Object.create(ic.models.Compressor.prototype);

  ic.models.JpegCompressor = JpegCompressor;
})();