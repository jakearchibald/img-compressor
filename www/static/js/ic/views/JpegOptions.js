(function() {
  var el = document.querySelector('.jpeg-options-view');
  el.parentNode.removeChild(el);

  function JpegOptions() {
    var jpegOptions = this;

    this.el = el.cloneNode(true);

    this.addOpt_({
      field: '.quality',
      opt: 'quality',
      outputEl: '.quality-setting'
    });

    this.addOpt_({
      field: '.rgb',
      opt: 'rgb'
    });

    this.addOpt_({
      field: '.optimize',
      opt: 'optimize'
    });

    this.addOpt_({
      field: '.progressive',
      opt: 'progressive'
    });

    this.addOpt_({
      field: '.arithmetic',
      opt: 'arithmetic'
    });

    this.addOpt_({
      field: '.block',
      opt: 'block',
      outputEl: '.block-setting'
    });

    this.addOpt_({
      field: '.rgb1',
      opt: 'rgb1'
    });

    this.addOpt_({
      field: '.dct',
      opt: 'dct'
    });

    this.addOpt_({
      field: '.baseline',
      opt: 'baseline'
    });

    ic.views.CompressorOptions.call(this);
  }

  var JpegOptionsProto = JpegOptions.prototype = Object.create(ic.views.CompressorOptions.prototype);

  ic.views.JpegOptions = JpegOptions;
})();