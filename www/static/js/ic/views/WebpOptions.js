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
      },
      applicable: function(opts) {
        return !opts.lossless;
      }
    });

    this.addOpt_({
      field: '.sns',
      opt: 'sns',
      outputEl: '.sns-setting',
      outputTransform: function(val) {
        if (val === 0) return "Off";
        return val;
      },
      applicable: function(opts) {
        return !opts.lossless;
      }
    });

    this.addOpt_({
      field: '.method',
      opt: 'm'
    });

    this.addOpt_({
      field: '.segments',
      opt: 'segments',
      applicable: function(opts) {
        return !opts.lossless;
      }
    });

    this.addOpt_({
      field: '.filter',
      opt: 'f',
      outputEl: '.filter-setting',
      outputTransform: function(val) {
        if (val === 0) return "Off";
        return val;
      },
      applicable: function(opts) {
        return !opts.lossless;
      }
    });

    this.addOpt_({
      field: '.sharpness',
      opt: 'sharpness',
      outputEl: '.sharpness-setting',
      outputTransform: function(val) {
        if (val == 7) return "Max";
        return val;
      },
      valueTransform: function(val) {
        return 7 - val;
      },
      applicable: function(opts) {
        return !opts.lossless;
      }
    });

    this.addOpt_({
      field: '.strong-filter',
      opt: 'strong',
      applicable: function(opts) {
        return !opts.lossless;
      }
    });

    this.addOpt_({
      field: '.alpha-filter',
      cast: String,
      opt: 'alpha_filter'
    });

    this.addOpt_({
      field: '.alpha-cleanup',
      opt: 'alpha_cleanup'
    });

    this.addOpt_({
      field: '.hint',
      cast: String,
      opt: 'hint'
    });

    this.addOpt_({
      field: '.colors',
      opt: 'colors',
      outputEl: '.colors-setting',
      outputTransform: function(val) {
        if (val === 257) return "32bit";
        return val;
      },
      valueTransform: function(val) {
        if (val !== 257) return val;
      },
      applicable: function(opts) {
        return opts.lossless;
      }
    });

    this.addOpt_({
      field: '.dither',
      opt: 'dither',
      applicable: function(opts) {
        return !!opts.colors;
      }
    });

    ic.views.CompressorOptions.call(this);
  }

  var WebpOptionsProto = WebpOptions.prototype = Object.create(ic.views.CompressorOptions.prototype);

  ic.views.WebpOptions = WebpOptions;
})();