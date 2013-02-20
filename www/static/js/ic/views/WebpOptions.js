(function() {
  var el = document.querySelector('.webp-options-view');
  el.parentNode.removeChild(el);

  function WebpOptions() {
    var webpOptions = this;

    this.el = el.cloneNode(true);
    this.qualityRange_ = this.$('.quality');
    this.qualitySetting_ = this.$('.quality-setting');
    this.alphaQualityRange_ = this.$('.alpha-quality');
    this.alphaQualitySetting_ = this.$('.alpha-quality-setting');
    this.method_ = this.$('.method');
    this.segments_ = this.$('.segments');
    this.opts = null;

    this.qualityRange_.addEventListener('change', function() {
      webpOptions.updateQualityLabel_();
      webpOptions.formChange_();
    });

    this.alphaQualityRange_.addEventListener('change', function() {
      webpOptions.updateAlphaQualityLabel_();
      webpOptions.formChange_();
    });

    this.method_.addEventListener('change', function() {
      webpOptions.formChange_();
    });

    this.segments_.addEventListener('change', function() {
      webpOptions.formChange_();
    });

    // Translate elements into compressor option values
    // element, type, prop, translate
    this.optsSpec_ = [
      [this.qualityRange_, Number, 'q', function(val) { if (val < 101) return val; }],
      [this.qualityRange_, Number, 'lossless', function(val) { if (val === 101) return 1; }],
      [this.alphaQualityRange_, Number, 'alpha_q'],
      [this.method_, Number, 'm'],
      [this.segments_, Number, 'segments']
    ];

    this.buildOpts_();
    this.updateQualityLabel_();
    this.updateAlphaQualityLabel_();
  }

  var WebpOptionsProto = WebpOptions.prototype = Object.create(ic.views.CompressorOptions.prototype);

  WebpOptionsProto.formChange_ = ic.utils.debounce(function() {
    this.buildOpts_();
    this.trigger('optionsChange');
  }, 100);

  WebpOptionsProto.updateQualityLabel_ = function() {
    var val = Number(this.qualityRange_.value);

    if (val == 101) {
      this.qualitySetting_.textContent = "Lossless";
    }
    else {
      this.qualitySetting_.textContent = val;
    }
  };

  WebpOptionsProto.updateAlphaQualityLabel_ = function() {
    var val = Number(this.alphaQualityRange_.value);

    if (val == 100) {
      this.alphaQualitySetting_.textContent = "Lossless";
    }
    else {
      this.alphaQualitySetting_.textContent = val;
    }
  };

  ic.views.WebpOptions = WebpOptions;
})();