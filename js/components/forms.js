(function() {
  (function($) {
    var $body, $targets;
    $body = $('body');
    $targets = ['.error input', '.error textarea', '.invalid input', '.invalid textarea', 'input.error', 'textarea.error', 'input.invalid', 'textarea.invalid', 'input[aria-invalid="true"]', 'textarea[aria-invalid="true"]'].join(',');
    return $body.on('click', $targets, function() {
      $(this).focus();
      return $(this).select();
    });
  })(jQuery);

}).call(this);
