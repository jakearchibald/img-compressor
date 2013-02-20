(function() {
  function WebpCompressor() {
    ic.models.Compressor.call(this);
    this.name = 'WebP';
    this.url = '/compress/webp';
  }

  var WebpCompressorProto = WebpCompressor.prototype = Object.create(ic.models.Compressor.prototype);

  ic.models.WebpCompressor = WebpCompressor;
})();