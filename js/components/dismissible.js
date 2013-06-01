(function() {
  $(function() {
    return $(".dismissible").click(function() {
      return $(this).closest("[data-dismissible]").hide(150, function() {
        return $(this).closest("[data-dismissible]").remove();
      });
    });
  });

}).call(this);
