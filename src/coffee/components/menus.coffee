navSelector = if $('.nav').length > 0 then '.nav' else 'nav'

$window = $(window)

$ ->
  # navigation menus
  $body = $('body')

  delay = undefined

  # open submenu function
  openMenu = ($target) ->
    $target.parents('li.menu').toggleClass('on')

    return

  # hover on
  $body.on 'mouseenter', navSelector + ' > ul > li.menu:not(.disabled)', (e) ->
    if $window.width() >= 768
      clearTimeout(delay)
      $(navSelector + ' > ul > li.menu.on').removeClass('on')
      $(this).addClass('on')

    return

  # hover off
  $body.on 'mouseleave', navSelector + ' > ul > li.menu:not(.disabled)', (e) ->
    if $window.width() >= 768
      delay = setTimeout (->
        $(navSelector + ' > ul > li.menu.on').removeClass('on')
      ), 350

    return

  # click/touch
  $body.on 'click', navSelector + ' > ul > li.menu:not(.disabled) > a', (e) =>
    $target = $(e.target)

    if !$target.hasClass('focused')
      if Modernizr.touch || $window.width() < 768
        openMenu($target)
      else
        $(navSelector + ' > ul > li.menu.on').removeClass('on')
        $target.parents('li.menu').addClass('on')
    else
      $target.removeClass('focused')

    e.stopImmediatePropagation()
    
    return
  
  # keyboard accessibility
  $body.on 'focusin', navSelector + ' > ul > li.menu > a', (e) ->
    $target = $(e.currentTarget)
    
    $target.addClass('focused')
    openMenu($target)

    e.stopImmediatePropagation()

    return
    
  $body.on 'focusin', navSelector + ' > ul > li.menu:not(.on) > a', (e) ->
    $(navSelector + ' > ul > li.menu.on').removeClass('on')
    
    return

  # dropdown buttons
  $body.on 'dropdown', (e) ->
    $target = $(e.target)

    $('.dropdown').not($target).removeClass('on')

    $target[if $target.hasClass('on') then 'removeClass' else 'addClass']('on')

    return

  $body.on 'click', '.dropdown', (e) ->
    $target = $(e.currentTarget)

    if !$target.is('a')
      e.stopPropagation()

    if !$target.hasClass('focused')
      $target.trigger('dropdown')
    else
      $target.removeClass('focused')

    return

  $body.on 'click', ->
    $dropdown = $('.dropdown.on')
    if $dropdown.length
      $dropdown.removeClass('on')

    $menu = $(navSelector + '.menu.on')
    if $menu.length
      $menu.removeClass('on')

    return

  # keyboard accessibility
  $body.on 'focus', '.dropdown', (e) ->
    $target = $(e.currentTarget)

    if not $(e.target).is('a')
      if $target.hasClass('dropdown')
        $target.addClass('focused').trigger('dropdown')
    else
      e.stopPropagation()

    return

  $body.on 'focusout', '.dropdown li:last-child a', (e) ->
    $('.dropdown.on').removeClass('on')

    return

  # hamburger menus
  $body.on 'menu-toggle', (e) ->
    $target = $(e.target).parents(navSelector + '.menu')

    $target[if $target.hasClass('on') then 'removeClass' else 'addClass']('on')

    return

  $(navSelector + '.menu').each ->
    $this = $(this)
    $this.attr('data-label','Menu') unless $this.attr('data-label')
    $this.prepend('<a href="#" class="menu-toggle"><i class="icon-reorder"></i></a>') unless $this.find('.menu-toggle').length > 0

    return

  $body.on 'click', navSelector + '.menu .menu-toggle', (e) ->
    $target = $(e.target)

    e.stopPropagation()
    e.preventDefault()

    if $target.parents('.menu-toggle').length
      $parent = $target.parents('.menu-toggle')
      if !$parent.hasClass('focused')
        $parent.trigger('menu-toggle')
      else
        $parent.removeClass('focused')
    else if !$target.hasClass('focused')
      $target.trigger('menu-toggle')
    else
      $target.removeClass('focused')

    return

  # keyboard accessibility
  $body.on 'focusin', navSelector + '.menu .menu-toggle', (e) ->
    $target = $(e.target)

    if $target.hasClass('menu-toggle')
      $target.addClass('focused').trigger('menu-toggle')
    else if ($parent = $target.parents('.menu-toggle')).length
      $parent.addClass('focused').trigger('menu-toggle')

    return

  $body.on 'focusout', navSelector + '.menu > ul > li:last-child a', (e) ->
    $(navSelector + '.menu.on').removeClass('on')

    return

  return

$window.on 'resize', ->
  selector = $(navSelector + ' > ul > li.menu.on')
  if selector.length > 1
    selector.removeClass('on').first().addClass('on')
