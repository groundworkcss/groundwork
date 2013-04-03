$ ->
  # tabs
  $('body').on 'click', '.tiles > .tile', (e) ->
    unless $(this).hasClass('disabled')
      tiles = $(this).parents('.tiles')
      tiles.find('> .tile').removeClass('active')
      tiles.find('> input').val($(this).data('value'))
      $(this).addClass('active')
    e.preventDefault()
    return false