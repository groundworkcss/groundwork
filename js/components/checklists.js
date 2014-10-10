(function() {
  (function($) {
    return $('body').on('click', '.checklist:not([readonly]) li:not([readonly])', function() {
      if ($(this).attr('aria-checked') === "true" || $(this).attr('data-checked') === "true" || $(this).attr('checked') === "checked" || $(this).hasClass('checked') || $(this).hasClass('completed')) {
        $(this).attr('aria-checked', "false");
      } else {
        $(this).attr('aria-checked', "true");
      }
      return $(this).removeClass('checked completed').removeAttr('data-checked checked');
    });
  })(jQuery);

}).call(this);
