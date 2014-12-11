
/*
 *
 *  jQuery ResponsiveTables by Gary Hepting
 *  https://github.com/ghepting/jquery-responsive-tables
 *
 *  Open source under the MIT License.
 *
 *  Copyright © 2013 Gary Hepting. All rights reserved.
 *
 */

(function() {
  var ResponsiveTable, delayedAdjustTables, responsiveTableIndex;

  delayedAdjustTables = [];

  responsiveTableIndex = 0;

  ResponsiveTable = (function() {
    function ResponsiveTable(el) {
      this.index = responsiveTableIndex++;
      this.el = el;
      this.compression = $(this.el).data('compression') || 5;
      this.minFontSize = $(this.el).data('min') || 10;
      this.maxFontSize = $(this.el).data('max') || Number.POSITIVE_INFINITY;
      this.width = $(this.el).data('width') || "100%";
      this.height = $(this.el).data('height') || "auto";
      this.adjustParents = $(this.el).data('adjust-parents') || true;
      this.styled = $(this.el).data('styled') || true;
      this.columns = $('tbody tr', $(this.el)).first().find('th, td').length;
      this.rows = $('tbody tr', $(this.el)).length;
      this.init();
    }

    ResponsiveTable.prototype.init = function() {
      this.setupTable();
      this.adjustOnLoad();
      return this.adjustOnResize();
    };

    ResponsiveTable.prototype.fontSize = function() {
      var compressed;
      if (this.height === "auto") {
        compressed = $('tbody td', $(this.el)).first().width() / this.compression;
      } else {
        compressed = $(this.el).height() / this.rows / this.compression;
      }
      return Math.min(this.maxFontSize, Math.max(compressed, this.minFontSize));
    };

    ResponsiveTable.prototype.setupTable = function() {
      $(this.el).css('width', this.width);
      if (this.height !== "auto") {
        $(this.el).css('height', this.height);
      }
      $("th, td", $(this.el)).css('width', (100 / this.columns) + "%");
      if (this.styled) {
        $(this.el).addClass("responsiveTable");
      }
      if (this.height !== "auto") {
        $("th, td", $(this.el)).css('height', (100 / this.rows) + "%");
        if (this.adjustParents) {
          $(this.el).parents().each(function() {
            return $(this).css('height', '100%');
          });
        }
      }
      return $(this.el).css('font-size', this.fontSize());
    };

    ResponsiveTable.prototype.resizeTable = function() {
      return $(this.el).css('font-size', this.minFontSize).css('font-size', this.fontSize());
    };

    ResponsiveTable.prototype.adjustOnLoad = function() {
      return $(window).on('load', (function(_this) {
        return function() {
          return _this.resizeTable();
        };
      })(this));
    };

    ResponsiveTable.prototype.adjustOnResize = function() {
      return $(window).on('resize', (function(_this) {
        return function() {
          clearTimeout(delayedAdjustTables[_this.index]);
          return delayedAdjustTables[_this.index] = setTimeout(function() {
            return _this.resizeTable();
          }, 20);
        };
      })(this));
    };

    return ResponsiveTable;

  })();

  (function($) {
    var responsiveTableElements;
    responsiveTableElements = [];
    return $.fn.responsiveTables = function(options) {
      return this.each(function() {
        return responsiveTableElements.push(new ResponsiveTable(this));
      });
    };
  })(jQuery);

  $(document).ready(function() {
    return $("table.responsive").responsiveTables();
  });

}).call(this);
