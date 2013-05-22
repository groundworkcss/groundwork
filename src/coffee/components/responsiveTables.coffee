###
 * Requires jquery.responsiveText.js
###
$ ->
  # responsive tables
  $('table.responsive').each (index, object) ->
    $this = $ this
    compression = 30
    min = 8
    max = 13
    padding = 0
    compression = parseFloat $this.attr('data-compression') || compression
    min = parseFloat $this.attr('data-min') || min
    max = parseFloat $this.attr('data-max') || max
    padding = parseFloat $this.attr('data-padding') || padding
    $(object).responsiveTable
      compressor: compression
      minSize: min
      maxSize: max
      padding: padding
      
    return
    
  return
