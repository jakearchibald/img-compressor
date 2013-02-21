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
    this.psnrRange_ = this.$('.psnr');
    this.psnrSetting_ = this.$('.psnr-setting');
    this.snsRange_ = this.$('.sns');
    this.snsSetting_ = this.$('.sns-setting');
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

    this.psnrRange_.addEventListener('change', function() {
      webpOptions.updatePsnrLabel_();
      webpOptions.formChange_();
    });

    this.snsRange_.addEventListener('change', function() {
      webpOptions.updateSnsLabel_();
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
      [this.segments_, Number, 'segments'],
      [this.psnrRange_, Number, 'psnr', function(val) { if (val) return val; }],
      [this.snsRange_, Number, 'sns']
    ];

    this.buildOpts_();
    this.updateQualityLabel_();
    this.updateAlphaQualityLabel_();
    this.updatePsnrLabel_();
    this.updateSnsLabel_();
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

  WebpOptionsProto.updatePsnrLabel_ = function() {
    var val = Number(this.psnrRange_.value);

    if (val === 0) {
      this.psnrSetting_.textContent = "Auto";
    }
    else {
      this.psnrSetting_.textContent = val + 'dB';
    }
  };

  WebpOptionsProto.updateSnsLabel_ = function() {
    var val = Number(this.snsRange_.value);

    if (val === 0) {
      this.snsSetting_.textContent = "Off";
    }
    else {
      this.snsSetting_.textContent = val;
    }
  };

  ic.views.WebpOptions = WebpOptions;
})();