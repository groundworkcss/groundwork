(function() {
  (function($) {
    return $('body').on('click', '.dismissible', function() {
      var _this = this;
      $(this).addClass('dismiss animated');
      return setTimeout(function() {
        return $(_this).hide(250, function() {
          return $(this).remove();
        });
      }, 1000);
    });
  })(jQuery);

}).call(this);
