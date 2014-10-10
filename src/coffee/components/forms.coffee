(($) ->

  $body = $ 'body'
  $targets = [
      '.error input'
      '.error textarea'
      '.invalid input'
      '.invalid textarea'
      'input.error'
      'textarea.error'
      'input.invalid'
      'textarea.invalid'
      'input[aria-invalid="true"]'
      'textarea[aria-invalid="true"]'
    ].join(',')
  $body.on 'click', $targets, ->
    $(@).focus()
    $(@).select()

) jQuery
