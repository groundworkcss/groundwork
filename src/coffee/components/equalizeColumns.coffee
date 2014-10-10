(($) ->

  jQuery(window).on 'load resize',  ->
    equalizeColumns()

  equalizeColumns = ->
    $('.row.equalize').each ->
      $row = $ this
      tallest = 0
      collapsed = false

      $row.children().each (i) ->
        $this = $ this
        $this.css('minHeight','1px')
        collapsed = ($this.outerWidth() == $row.outerWidth())
        unless collapsed
          $this.addClass('equal') unless $this.hasClass('equal')
          if $this.outerHeight() > tallest
            tallest = $this.outerHeight()

      $row.children().css('min-height', tallest) unless collapsed

) jQuery
