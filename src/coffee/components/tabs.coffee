$ ->
  # tabs
  $('body').on 'click', '.tabs > ul li a[href^=#], [role=tab] a', (e) ->
    $this = $ this
    unless $this.hasClass('disabled')
      
      if $this.closest('[role=tabpanel]').length > 0
        tabs = $this.closest('[role=tabpanel]')
      else
        tabs = $this.closest('.tabs')
        
      tabs.find('> ul li a, [role=tab] a').removeClass('active')
      $this.addClass('active')
      tabs.children('div, [role=tabpanel]').removeClass('active')
      tabs.children($this.attr('href')).addClass('active')
      
    e.preventDefault()
    return false
    
  return
