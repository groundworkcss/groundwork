$ ->
  $(".dismiss").click ->
    $(this).closest(".dismissible").hide 150, ->
      $(this).closest(".dismissible").remove()
