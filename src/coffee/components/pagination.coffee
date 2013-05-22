$ ->
  # initialize
  limitPaginationItems()
  $body = $ 'body'

  # change active page
  $body.on 'click', '.pagination ul > li:not(.next, .prev) a', (e) ->
    $this = $ this
    $('.pagination ul > li:not(.next, .prev)').removeClass('active')
    
    $this.parent('li').addClass('active')
    # toggle previous button state
    $prev = $('.pagination ul > li.prev') 
    if $this.parent('li').hasClass('first')
      $prev.addClass('disabled')
    else
      $prev.removeClass('disabled')
      
    # toggle next button state
    $next = $('.pagination ul > li.next')
    
    if $this.parent('li').hasClass('last')
      $next.addClass('disabled')
    else
      $next.removeClass('disabled')
      
    # adjust pagination
    limitPaginationItems()
    e.preventDefault()
    
    return false

  # handle previous pagination button
  $body.on 'click', '.pagination ul > li.prev:not(.disabled)', (e) ->
    # enable next button
    $('.pagination ul > li.next').removeClass('disabled')
    el = $('.pagination ul > li.active')
    if !el.hasClass('first')
      # set previous page active
      el.removeClass('active')
      el.prev().addClass('active')
      # adjust pagination
      limitPaginationItems()
      
    # disable previous button if at first page
    if $('.pagination ul > li.active').hasClass('first')
      $(this).addClass('disabled')
    e.preventDefault()
    return false

  # handle next pagination button
  $body.on 'click', '.pagination ul > li.next:not(.disabled)', (e) ->
    # enable previous button
    $('.pagination ul > li.prev').removeClass('disabled')
    el = $('.pagination ul > li.active')
    if !el.hasClass('last')
      # set next page active
      el.removeClass('active')
      el.next().addClass('active')
      # adjust pagination
      limitPaginationItems()
      
    # disable next button if at last page
    if $('.pagination ul > li.active').hasClass('last')
      $(this).addClass('disabled')
      
    e.preventDefault()
    return false

  # disable page jump for disabled pagination links
  $body.on 'click', '.pagination ul > li.disabled a', (e) ->
    e.preventDefault()
    return false

  return

$(window).resize ->
  # adjust pagination on resize
  limitPaginationItems()

# responsive pagination
limitPaginationItems = ->
  #process pagination lists
  $('.pagination ul').each ->
    pagination = $(this)
    # pagination dimensions
    visibleSpace = pagination.outerWidth() - pagination.children('li.prev').outerWidth() - pagination.children('li.next').outerWidth()
    totalItemsWidth = 0
    
    pagination.children('li').each ->
      totalItemsWidth += $(this).outerWidth()
      return
      
    # hide pages that don't fit
    pagination.children('li').not('.prev, .next, .active').hide()
    visibleItemsWidth = 0
    
    pagination.children('li:visible').each ->
      visibleItemsWidth += $(this).outerWidth()
      return
      
    # adjust visible elements
    while (visibleItemsWidth + 29) < visibleSpace && (visibleItemsWidth + 29) < totalItemsWidth
      # show the next page number
      pagination.children('li:visible').not('.next').last().next().show()
      visibleItemsWidth = 0
      
      pagination.children('li:visible').each ->
        visibleItemsWidth += $(this).outerWidth()
        return
        
      if (visibleItemsWidth + 29) <= visibleSpace
        # show the previous page number
        pagination.children('li:visible').not('.prev').first().prev().show()
        visibleItemsWidth = 0
        
        pagination.children('li:visible').each ->
          visibleItemsWidth += $(this).outerWidth()
          return
          
      # recalculate visibleItemsWidth
      visibleItemsWidth = 0
      
      pagination.children('li:visible').each ->
        visibleItemsWidth += $(this).outerWidth()
        return
        
  return
