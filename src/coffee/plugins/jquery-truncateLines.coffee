###
 *
 *  jQuery TruncateLines by Gary Hepting
 *  https://github.com/ghepting/jquery-truncate-lines
 *
 *  Open source under the MIT License.
 *
 *  Copyright © 2013 Gary Hepting. All rights reserved.
 *
###

delayedAdjustTruncation = []
truncateIndex = 0

class TruncateLines

  constructor: (el) ->
    @el = el
    @index = truncateIndex++
    @text = $(@el).text()
    $(@el).attr('data-text',@text)
    @words = @text.trim().split(" ")
    @lines = parseInt($(@el).attr('data-truncate'))
    @truncate()
    @adjustOnResize()

  truncate: ->
    @measure()
    @setContent()

  reset: ->
    $(@el).text(@text)
      .css('max-height', 'none')
      .attr('data-truncated', 'false')

  measure: ->
    @reset()
    $(@el).html(".")
    @singleLineHeight = $(@el).outerHeight()
    i = 1
    while i++ < @lines
      $(@el).append("<br>.")
    @maxLinesHeight = $(@el).outerHeight()

  empty: ->
    $(@el).html("")

  setContent: ->
    @reset()
    truncated = false
    @addWords(@words.length)
    if @tooBig()
      # binary build-up the string -- Thanks @BananaNeil  :]
      @addNumberWordsThatFit()
      $(@el).css('max-height', @maxLinesHeight + 'px')
      $(@el).attr('data-truncated', true)

  addNumberWordsThatFit: ->
    cant = @words.length
    can = 0
    mid = Math.floor(@words.length/2)
    while can+1 != cant
      @addWords(can + mid)
      if @tooBig()
        cant = can + mid
      else
        can = can + mid
      mid = Math.floor(mid/2) || 1
    @addWords(can)
    $(@el).html( @trimTrailingPunctuation( $(@el).html() ) )

  addWords: (num) ->
    $(@el).html(@words.slice(0,num).join(" "))

  tooBig: ->
    $(@el).outerHeight() > @maxLinesHeight

  adjustOnResize: ->
    $(window).on 'resize', =>
      clearTimeout(delayedAdjustTruncation[@index])
      delayedAdjustTruncation[@index] = setTimeout(=>
        @truncate()
      , 20)

  trimTrailingPunctuation: (str) ->
    str.replace(/(,$)|(\.$)|(\:$)|(\;$)|(\?$)|(\!$)/g, "")

(($) ->

  truncateInitialized = false
  truncatedLineElements = []

  $.fn.truncateLines = ->

    unless truncateInitialized
      $('head').append('
<style type="text/css">
  [data-truncated="true"] { overflow: hidden; }
  [data-truncated="true"]:after { content: "..."; position: absolute; }
</style>')

    @each ->
      truncatedLineElements.push( new TruncateLines(@) )

) jQuery

(($) ->

  $(window).load ->
  $("[data-truncate]").truncateLines()

) jQuery
