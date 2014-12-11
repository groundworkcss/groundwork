
/*
 *
 *  jQuery ResponsiveText by Gary Hepting
 *  https://github.com/ghepting/jquery-responsive-text
 *
 *  Open source under the MIT License.
 *
 *  Copyright © 2013 Gary Hepting. All rights reserved.
 *
 */

(function() {
  var ResponsiveText, delayedAdjustText, responsiveTextIndex;

  delayedAdjustText = [];

  responsiveTextIndex = 0;

  ResponsiveText = (function() {
    function ResponsiveText(el) {
      this.index = responsiveTextIndex++;
      this.el = el;
      this.compression = $(this.el).data('compression') || 10;
      this.minFontSize = $(this.el).data('min') || Number.NEGATIVE_INFINITY;
      this.maxFontSize = $(this.el).data('max') || Number.POSITIVE_INFINITY;
      this.scrollable = $(this.el).data('scrollable') || false;
      this.scrollSpeed = $(this.el).data('scrollspeed') || 650;
      this.scrollReset = $(this.el).data('scrollreset') || 200;
      this.init();
    }

    ResponsiveText.prototype.init = function() {
      $(this.el).wrapInner('<span class="responsiveText-wrapper" />');
      this.adjustOnLoad();
      this.adjustOnResize();
      if (this.scrollable) {
        return this.scrollOnHover();
      }
    };

    ResponsiveText.prototype.resizeText = function() {
      var calculatedFontSize, fontSize;
      calculatedFontSize = $(this.el).width() / this.compression;
      fontSize = Math.max(Math.min(calculatedFontSize, this.maxFontSize), this.minFontSize);
      return $(this.el).css({
        "font-size": Math.floor(fontSize)
      });
    };

    ResponsiveText.prototype.adjustOnLoad = function() {
      return $(window).on('load', (function(_this) {
        return function() {
          return _this.resizeText();
        };
      })(this));
    };

    ResponsiveText.prototype.adjustOnResize = function() {
      return $(window).on('resize', (function(_this) {
        return function() {
          clearTimeout(delayedAdjustText[_this.index]);
          return delayedAdjustText[_this.index] = setTimeout(function() {
            return _this.resizeText();
          }, 20);
        };
      })(this));
    };

    ResponsiveText.prototype.scrollOnHover = function() {
      $(this.el).css({
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap'
      });
      return $(this.el).hover((function(_this) {
        return function() {
          _this.difference = _this.el.scrollWidth - $(_this.el).width();
          if (_this.difference > _this.scrollSpeed) {
            _this.scrollSpeed = _this.difference;
          }
          if (_this.difference > 0) {
            $(_this.el).css('cursor', 'e-resize');
            return $(_this.el).stop().animate({
              "text-indent": -_this.difference
            }, _this.scrollSpeed, function() {
              return $(_this.el).css('cursor', 'text');
            });
          }
        };
      })(this), (function(_this) {
        return function() {
          return $(_this.el).stop().animate({
            "text-indent": 0
          }, _this.scrollReset);
        };
      })(this));
    };

    return ResponsiveText;

  })();

  (function($) {
    var responsiveTextElements;
    responsiveTextElements = [];
    return $.fn.responsiveText = function(options) {
      return this.each(function() {
        return responsiveTextElements.push(new ResponsiveText(this));
      });
    };
  })(jQuery);

  $(document).ready(function() {
    return $(".responsive").not('table').responsiveText();
  });

}).call(this);
