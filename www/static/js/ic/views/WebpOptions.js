(function() {
  var el = document.querySelector('.webp-options-view');
  el.parentNode.removeChild(el);

  function WebpOptions() {
    var webpOptions = this;

    this.el = el.cloneNode(true);

    this.addOpt_({
      field: '.quality',
      opt: 'q',
      outputEl: '.quality-setting',
      outputTransform: function(val) {
        if (val == 101) return "Lossless";
        return val;
      },
      valueTransform: function(val) {
        if (val < 101) return val;
      }
    });

    this.addOpt_({
      field: '.quality',
      opt: 'lossless',
      valueTransform: function(val) {
        if (val == 101) return 1;
      }
    });

    this.addOpt_({
      field: '.alpha-quality',
      opt: 'alpha_q',
      outputEl: '.alpha-quality-setting',
      outputTransform: function(val) {
        if (val == 100) return "Lossless";
        return val;
      }
    });

    this.addOpt_({
      field: '.sns',
      opt: 'sns',
      outputEl: '.sns-setting',
      outputTransform: function(val) {
        if (val === 0) return "Off";
        return val;
      }
    });

    this.addOpt_({
      field: '.method',
      opt: 'm'
    });

    this.addOpt_({
      field: '.segments',
      opt: 'segments'
    });

    ic.views.CompressorOptions.call(this);
  }

  var WebpOptionsProto = WebpOptions.prototype = Object.create(ic.views.CompressorOptions.prototype);

  ic.views.WebpOptions = WebpOptions;
})();