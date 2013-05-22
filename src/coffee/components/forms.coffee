$ ->
  $body = $ 'body'
  # select all text in invalid input field on focus
  $body.on 'click', [
      '.error input'
      '.error textarea'
      '.invalid input'
      '.invalid textarea'
      'input.error'
      'textarea.error '
      'input.invalid' 
      'textarea.invalid '
    ].join(','), ->
      $(this).focus().select()

  # polyfill select box placeholders
  $('.select select').each ->
    $this = $ this
    if $this.children('option').first().val() is '' and $this.children('option').first().attr('selected')
      $this.addClass('unselected')
    else
      $this.removeClass('unselected')
      
    return  
    
  $body.on 'change', '.select select', ->
    $this = $ this
    
    if $this.children('option').first().val() is '' and $this.children('option').first().attr('selected')
      $this.addClass('unselected')
    else
      $this.removeClass('unselected')

    return
    
  return
