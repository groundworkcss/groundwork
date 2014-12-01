
/*
 *
 *  jQuery TruncateLines by Gary Hepting
 *  https://github.com/ghepting/jquery-truncate-lines
 *
 *  Open source under the MIT License.
 *
 *  Copyright © 2013 Gary Hepting. All rights reserved.
 *
 */

(function() {
  var TruncateLines, delayedAdjustTruncation, truncateIndex;

  delayedAdjustTruncation = [];

  truncateIndex = 0;

  TruncateLines = (function() {
    function TruncateLines(el) {
      this.el = el;
      this.index = truncateIndex++;
      this.text = $(this.el).text();
      $(this.el).attr('data-text', this.text);
      this.words = this.text.trim().split(" ");
      this.lines = parseInt($(this.el).attr('data-truncate'));
      this.truncate();
      this.adjustOnResize();
    }

    TruncateLines.prototype.truncate = function() {
      this.measure();
      return this.setContent();
    };

    TruncateLines.prototype.reset = function() {
      return $(this.el).text(this.text).css('max-height', 'none').attr('data-truncated', 'false');
    };

    TruncateLines.prototype.measure = function() {
      var i;
      this.reset();
      $(this.el).html(".");
      this.singleLineHeight = $(this.el).outerHeight();
      i = 1;
      while (i++ < this.lines) {
        $(this.el).append("<br>.");
      }
      return this.maxLinesHeight = $(this.el).outerHeight();
    };

    TruncateLines.prototype.empty = function() {
      return $(this.el).html("");
    };

    TruncateLines.prototype.setContent = function() {
      var truncated;
      this.reset();
      truncated = false;
      this.addWords(this.words.length);
      if (this.tooBig()) {
        this.addNumberWordsThatFit();
        $(this.el).css('max-height', this.maxLinesHeight + 'px');
        return $(this.el).attr('data-truncated', true);
      }
    };

    TruncateLines.prototype.addNumberWordsThatFit = function() {
      var can, cant, mid;
      cant = this.words.length;
      can = 0;
      mid = Math.floor(this.words.length / 2);
      while (can + 1 !== cant) {
        this.addWords(can + mid);
        if (this.tooBig()) {
          cant = can + mid;
        } else {
          can = can + mid;
        }
        mid = Math.floor(mid / 2) || 1;
      }
      this.addWords(can);
      return $(this.el).html(this.trimTrailingPunctuation($(this.el).html()));
    };

    TruncateLines.prototype.addWords = function(num) {
      return $(this.el).html(this.words.slice(0, num).join(" "));
    };

    TruncateLines.prototype.tooBig = function() {
      return $(this.el).outerHeight() > this.maxLinesHeight;
    };

    TruncateLines.prototype.adjustOnResize = function() {
      return $(window).on('resize', (function(_this) {
        return function() {
          clearTimeout(delayedAdjustTruncation[_this.index]);
          return delayedAdjustTruncation[_this.index] = setTimeout(function() {
            return _this.truncate();
          }, 20);
        };
      })(this));
    };

    TruncateLines.prototype.trimTrailingPunctuation = function(str) {
      return str.replace(/(,$)|(\.$)|(\:$)|(\;$)|(\?$)|(\!$)/g, "");
    };

    return TruncateLines;

  })();

  (function($) {
    var truncateInitialized, truncatedLineElements;
    truncateInitialized = false;
    truncatedLineElements = [];
    return $.fn.truncateLines = function() {
      if (!truncateInitialized) {
        $('head').append('<style type="text/css"> [data-truncated="true"] { overflow: hidden; } [data-truncated="true"]:after { content: "..."; position: absolute; } </style>');
      }
      return this.each(function() {
        return truncatedLineElements.push(new TruncateLines(this));
      });
    };
  })(jQuery);

  $(window).load(function() {
    return $("[data-truncate]").truncateLines();
  });

}).call(this);
