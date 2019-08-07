###
 *
 *  Responsive Navigation by Gary Hepting
 *
 *  Open source under the MIT License.
 *
 *  Copyright © 2013 Gary Hepting. All rights reserved.
 *
###

responsiveNavigationIndex = 0
window.delayMenuClose = ''
window.delayNavigationClose = ''

class ResponsiveNavigation

  constructor: (el) ->
    @index = responsiveNavigationIndex++
    @el = $(el)
    @init()

  init: ->
    @defaultLabel()
    @setupMarkers()
    unless @el.hasClass('nocollapse')
      @hamburgerHelper()

  defaultLabel: ->
    unless @el.hasClass('nocollapse')
      @el.attr('title', 'Menu') if @el.attr('title') == undefined

  setupMarkers: ->
    @el.find('ul').each ->
      if $(@).find('li').length
        $(@).attr('role', 'menu')
    @el.find('> ul').attr('role', 'menubar') unless $(@el).hasClass('vertical')
    @el.find('li').each ->
      if $(@).find('ul').length
        $(@).attr('role', 'menu')

  hamburgerHelper: ->
    @el.prepend('<button class="hamburger"></button>')

(($) ->

  mouseBindings = -> # needs more <3
    $('body').on 'mouseenter', '.nav:not(.vertical) li[role="menu"]', (e) ->
      $('.nav:not(.vertical)').not(@).each ->
        unless $(@).find('button.hamburger').is(':visible')
          $(@).find('ul[aria-expanded="true"]').attr('aria-expanded', 'false')
      unless $(@).parents('.nav').find('button.hamburger').is(':visible')
        clearTimeout(window.delayMenuClose)
        expandedSiblings = $(@).siblings().find('ul[aria-expanded="true"]')
        expandedSiblings.attr('aria-expanded', 'false')
        targetMenu = $(e.target).parents('li[role="menu"]').children('ul')
        targetMenu.attr('aria-expanded', 'true')

    $('body').on 'mouseleave', '.nav:not(.vertical) li[role="menu"]', (e) ->
      unless $(@).parents('.nav').find('button.hamburger').is(':visible')
        window.delayMenuClose = setTimeout( =>
          $(@).find('ul[aria-expanded="true"]').attr('aria-expanded', 'false')
        , 500)

  touchBindings = ->
    $('body').on 'click', '.nav li[role="menu"] > a,
                           .nav li[role="menu"] > button', (e) ->
      list = $(@).siblings('ul')
      menu = $(@).parent('[role="menu"]')
      if list.attr('aria-expanded') != 'true'
        list.attr('aria-expanded', 'true')
      else
        list.attr('aria-expanded', 'false')
        list.find('[aria-expanded="true"]').attr('aria-expanded', 'false')
      if menu.attr('aria-pressed') != 'true'
        menu.attr('aria-pressed', 'true')
      else
        menu.attr('aria-pressed', 'false')
        menu.find('[aria-pressed="true"]').attr('aria-pressed', 'false')
        menu.find('[aria-expanded="true"]').attr('aria-expanded', 'false')
      e.preventDefault()

    $('body').on 'click', '.nav button.hamburger', (e) ->
      list = $(@).siblings('ul')
      if list.attr('aria-expanded') != 'true'
        list.attr('aria-expanded', 'true')
      else
        list.attr('aria-expanded', 'false')
        list.find('[aria-pressed="true"]').attr('aria-pressed', 'false')
        list.find('[aria-expanded="true"]').attr('aria-expanded', 'false')
      e.preventDefault()

  responsiveNavigationElements = []

  $('.nav').each ->
    responsiveNavigationElements.push( new ResponsiveNavigation(@) )

  # initialize bindings
  touchBindings()
  unless Modernizr.touch
    mouseBindings()

) jQuery
