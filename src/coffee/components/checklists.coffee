(($) ->

  $('body').on 'click', '.checklist:not([readonly]) li:not([readonly])', ->
    if $(@).attr('aria-checked') == "true" or $(@).attr('data-checked') == "true" or $(@).attr('checked') == "checked" or $(@).hasClass('checked') or $(@).hasClass('completed')
      $(@).attr('aria-checked', "false")
    else
      $(@).attr('aria-checked', "true")
    $(@).removeClass('checked completed').removeAttr('data-checked checked')

) jQuery
