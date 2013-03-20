###
 *
 *  GroundworkCSS JS by Gary Hepting - https://github.com/groundworkcss/groundwork
 *  
 *  Open source under the BSD License. 
 *
 *  Copyright © 2013 Gary Hepting. All rights reserved.
 *
###

$(document).ready ->

  # navigation menus
  delay = ''
  $submenu = $('nav > ul > li.menu')
  $submenu.on
    mouseenter: (e) ->
      if $(window).width() > 768
        clearTimeout(delay)
        $('nav > ul > li').removeClass('on')
        $('nav > ul > li > ul').hide()
        $(this).addClass('on')
    mouseleave: (e) ->
      if $(window).width() > 768
        delay = setTimeout (->
          $('nav > ul > li').removeClass('on')
          $('nav > ul > li > ul').hide()
        ), 350
    click: (e) ->
      if $(window).width() < 768
        if $(e.target).parent('li.menu').size() > 0
          $this = $(this)
          $(this).children('ul').slideToggle 300, ->
            $this.toggleClass('on')
          e.preventDefault()
          return false
    tap: (e) ->
      if $(e.target).parent('li.menu').size() > 0
        $this = $(this)
        $(this).children('ul').slideToggle 300, ->
          $this.toggleClass('on')
        e.preventDefault()
        return false
 
  # a11y : tab access to submenu (by Geoffrey Crofte - CreativeJuiz.com)
  $submenu.find('>a').on 'focus', ( ->
    $(this).closest('li.menu').trigger('mouseenter')
  )
  
  $submenu.find('li:last-child > a').on 'blur', ( -> 
    $(this).closest('li.menu').trigger('mouseleave')
  )
  
  # DropDown Button a11y (by Geoffrey Crofte - CreativeJuiz.com)
  $('.dropdown.button').attr('tabindex', '0').on 'focus', ( ->
    $(this).find('>ul').css('display', 'block')
  ).find('>ul li:last-child a').on 'blur', ( ->
    $(this).closest('ul').css('display', 'none')
  )
  

  # dynamically adjust pagination items
  limitPaginationItems()
  # change active page
  $('.pagination ul > li:not(.next, .prev) a').on 'click', ( (e) ->
    $('.pagination ul > li:not(.next, .prev)').removeClass('active')
    $(this).parent('li').addClass('active')
    # toggle previous button state
    if $(this).parent('li').hasClass('first')
      $('.pagination ul > li.prev').addClass('disabled')
    else
      $('.pagination ul > li.prev').removeClass('disabled')
    # toggle next button state
    if $(this).parent('li').hasClass('last')
      $('.pagination ul > li.next').addClass('disabled')
    else
      $('.pagination ul > li.next').removeClass('disabled')
    # adjust pagination
    limitPaginationItems()
    e.preventDefault()
    false
  )
  # handle previous pagination button
  $('.pagination ul > li.prev:not(.disabled)').on 'click', ( (e) ->
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
    false
  )
  # handle next pagination button
  $('.pagination ul > li.next:not(.disabled)').on 'click', ( (e) ->
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
    false
  )
  # disable page jump for disabled pagination links
  $('.pagination ul > li.disabled a').on 'click', ( (e) ->
    e.preventDefault()
    false
  )
  
  # select all text on invalid input field entries
  $('.error input, .error textarea, 
     .invalid input, .invalid textarea, 
     input.error, textarea.error, 
     input.invalid, textarea.invalid').on
    click: ->
      $(this).focus()
      $(this).select()

  # polyfill select box placeholders
  $('span.select select').each ->
    if $(this).children('option').first().val() == '' and $(this).children('option').first().attr('selected')
      $(this).addClass('unselected')
    else
      $(this).removeClass('unselected')
  $('span.select select').on
    change: ->
      if $(this).children('option').first().val() == '' and $(this).children('option').first().attr('selected')
        $(this).addClass('unselected')
      else
        $(this).removeClass('unselected')

  # tabs
  $('.tabs > ul > li > a').not('.disabled').on 'click', (e) ->
    tabs = $(this).parents('.tabs')
    tabs.find('> ul li a').removeClass('active')
    $(this).addClass('active')
    tabs.children('div').removeClass('active')
    tabs.children($(this).attr('href')).addClass('active')
    e.preventDefault()
    return false

  # responsive headings
  $('.responsive').not('table').each (index, object) ->
    compression = 10
    min = 10
    max = 200
    compression = parseFloat $(this).attr('data-compression') || compression
    min = parseFloat $(this).attr('data-min') || min
    max = parseFloat $(this).attr('data-max') || max
    $(object).responsiveText
      compressor: compression,
      minSize: min,
      maxSize: max

  # responsive tables
  $('table.responsive').each (index, object) ->
    compression = 30
    min = 8
    max = 13
    padding = 0
    compression = parseFloat $(this).attr('data-compression') || compression
    min = parseFloat $(this).attr('data-min') || min
    max = parseFloat $(this).attr('data-max') || max
    padding = parseFloat $(this).attr('data-padding') || padding
    $(object).responsiveTable
      compressor: compression,
      minSize: min,
      maxSize: max,
      padding: padding
  
  # tooltips
  $('.tooltip[title]').tooltip()

  # modals
  $('div.modal').modal()

  
$(window).load ->
  $('.slider').orbit()

$(window).resize ->
  limitPaginationItems()

# responsive pagination
limitPaginationItems = ->
  #process pagination lists
  $('.pagination ul').each ->
    pagination = $(this)
    # pagination dimensions
    visibleSpace = pagination.outerWidth() - pagination.children('li.prev').outerWidth() - pagination.children('li.next').outerWidth()
    # hide pages that don't fit
    pagination.children('li').not('.prev, .next, .active').hide()
    visibleItemsWidth = 0
    pagination.children('li:visible').each ->
      visibleItemsWidth += $(this).outerWidth()
    # loop
    while (visibleItemsWidth + 29) < visibleSpace
      # show the next page number
      pagination.children('li:visible').not('.next').last().next().show()
      visibleItemsWidth = 0
      pagination.children('li:visible').each ->
        visibleItemsWidth += $(this).outerWidth()
      if (visibleItemsWidth + 29) <= visibleSpace
        # show the previous page number
        pagination.children('li:visible').not('.prev').first().prev().show()
        visibleItemsWidth = 0
        pagination.children('li:visible').each ->
          visibleItemsWidth += $(this).outerWidth()
      # recalculate visibleItemsWidth
      visibleItemsWidth = 0
      pagination.children('li:visible').each ->
        visibleItemsWidth += $(this).outerWidth()