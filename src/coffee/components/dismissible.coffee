$ ->
  $(".dismissible").click ->
    $(this).closest("[data-dismissible]").hide 150, ->
      $(this).closest("[data-dismissible]").remove()
