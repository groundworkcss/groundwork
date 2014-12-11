(function() {
  $(function() {
    return $('body').on('click', '.dismissible', function() {
      $(this).addClass('dismiss animated');
      return setTimeout((function(_this) {
        return function() {
          return $(_this).hide(250, function() {
            return $(this).remove();
          });
        };
      })(this), 1000);
    });
  });

}).call(this);
