(function() {
  function CompressorOptions() {}

  var CompressorOptionsProto = CompressorOptions.prototype = Object.create(ic.views.View.prototype);

  CompressorOptionsProto.buildOpts_ = function() {
    var opts = {};

    this.optsSpec_.forEach(function(spec) {
      var el = spec[0];
      var cast = spec[1];
      var prop = spec[2];
      var transform = spec[3];
      var val = cast(el.value);

      if (transform) {
        val = transform(val);
      }

      if (val !== undefined) {
        opts[prop] = val;
      }
    });

    this.opts = opts;
  };

  ic.views.CompressorOptions = CompressorOptions;
})();