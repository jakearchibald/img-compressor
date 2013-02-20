(function() {
  function NullCompressor() {
    ic.models.Compressor.call(this);
    this.name = 'Original';
  }

  var NullCompressorProto = NullCompressor.prototype = Object.create(ic.models.Compressor.prototype);

  ic.models.NullCompressor = NullCompressor;
})();