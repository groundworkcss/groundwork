(($) ->

  $('body').on 'click', '.dismissible', ->
    $(@).addClass('dismiss animated')
    setTimeout( =>
      $(@).hide 250, ->
        $(@).remove()
    , 1000)

) jQuery
