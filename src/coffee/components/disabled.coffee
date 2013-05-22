$ ->
  $('.disabled').each ->
    $this = $ this
    # disable keyboard accessiblity on disabled elements
    $this.attr('tabindex','-1')
    # and on nested link items
    $this.find('a').attr('tabindex','-1')
    # also disable nested form fields
    $this.find('input, select, textarea').addClass('disabled').attr('tabindex','-1').attr('readonly','readyonly')
    
    return
  
  # remove ability to click on .disabled elements
  $('body').on 'click', '.disabled, .disabled *', (e) ->
    e.preventDefault()
    return false
    
  return
