###
 *
 *  jQuery ResponsiveTables by Gary Hepting
 *  https://github.com/ghepting/jquery-responsive-tables
 *
 *  Open source under the MIT License.
 *
 *  Copyright © 2013 Gary Hepting. All rights reserved.
 *
###

delayedAdjustTables = []
responsiveTableIndex = 0

class ResponsiveTable

  constructor: (el) ->
    @index = responsiveTableIndex++
    @el = el
    @compression = $(@el).data('compression') || 5
    @minFontSize = $(@el).data('min') || 10
    @maxFontSize = $(@el).data('max') || Number.POSITIVE_INFINITY
    @width = $(@el).data('width') || "100%"
    @height = $(@el).data('height') || "auto"
    @adjustParents = $(@el).data('adjust-parents') || true
    @styled = $(@el).data('styled') || true
    @columns = $('tbody tr', $(@el)).first().find('th, td').length
    @rows = $('tbody tr', $(@el)).length
    @init()

  init: ->
    @setupTable()
    @adjustOnLoad()
    @adjustOnResize()

  fontSize: ->
    if @height is "auto"
      compressed = $('tbody td', $(@el)).first().width() / @compression
    else
      compressed = $(@el).height() / @rows / @compression
    Math.min(@maxFontSize, Math.max(compressed, @minFontSize))

  setupTable: ->
    # setup table
    $(@el).css('width', @width)
    $(@el).css('height', @height) unless @height is "auto"
    # set column widths
    $("th, td", $(@el)).css('width', (100 / @columns) + "%")
    if @styled
      $(@el).addClass "responsiveTable"
    unless @height is "auto"
      # set row heights
      $("th, td", $(@el)).css('height', (100 / @rows) + "%")
      # set parent element heights
      if @adjustParents
        $(@el).parents().each ->
          $(this).css('height', '100%')
    $(@el).css('font-size', @fontSize())

  resizeTable: ->
    $(@el).css('font-size', @minFontSize).css('font-size', @fontSize())
    # $('th, td', $(@el)).each ->
    #   fontSize = $(@).width() / obj.compression
    #   fontSize = Math.min(obj.maxFontSize, fontSize)
    #   fontSize = Math.max(obj.minFontSize, fontSize)
    #   $(@).css('font-size', fontSize)

  adjustOnLoad: ->
    $(window).on 'load', =>
      @resizeTable()

  adjustOnResize: ->
    $(window).on 'resize', =>
      clearTimeout(delayedAdjustTables[@index])
      delayedAdjustTables[@index] = setTimeout(=>
        @resizeTable()
      , 20)


(($) ->

  responsiveTableElements = []

  $.fn.responsiveTables = (options) ->

    @each ->
      responsiveTableElements.push( new ResponsiveTable(@) )

) jQuery

jQuery(document).ready ($) ->
  $("table.responsive").responsiveTables()
