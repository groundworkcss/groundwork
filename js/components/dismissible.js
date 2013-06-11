(function() {
  $(function() {
    return $(".dismiss").click(function() {
      return $(this).closest(".dismissible").hide(150, function() {
        return $(this).closest(".dismissible").remove();
      });
    });
  });

}).call(this);
