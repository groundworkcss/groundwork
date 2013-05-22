(function() {
  var $window, equalizeColumns, limitPaginationItems, navSelector;

  $(function() {
    $('.disabled').each(function() {
      var $this;

      $this = $(this);
      $this.attr('tabindex', '-1');
      $this.find('a').attr('tabindex', '-1');
      $this.find('input, select, textarea').addClass('disabled').attr('tabindex', '-1').attr('readonly', 'readyonly');
    });
    $('body').on('click', '.disabled, .disabled *', function(e) {
      e.preventDefault();
      return false;
    });
  });

  $(window).on('load resize', function() {
    return equalizeColumns();
  });

  equalizeColumns = function() {
    return $('.row.equalize').each(function() {
      var $row, collapsed, tallest;

      $row = $(this);
      tallest = 0;
      collapsed = false;
      $row.children('*').each(function(i) {
        var $this;

        $this = $(this);
        $this.css('minHeight', '1px');
        collapsed = $this.outerWidth() === $row.outerWidth();
        if (!collapsed) {
          if (!$this.hasClass('equal')) {
            $this.addClass('equal');
          }
          if ($this.outerHeight() > tallest) {
            tallest = $this.outerHeight();
          }
        }
      });
      if (!collapsed) {
        return $row.children('*').css('min-height', tallest);
      }
    });
  };

  $(function() {
    var $body;

    $body = $('body');
    $body.on('click', ['.error input', '.error textarea', '.invalid input', '.invalid textarea', 'input.error', 'textarea.error ', 'input.invalid', 'textarea.invalid '].join(','), function() {
      return $(this).focus().select();
    });
    $('.select select').each(function() {
      var $this;

      $this = $(this);
      if ($this.children('option').first().val() === '' && $this.children('option').first().attr('selected')) {
        $this.addClass('unselected');
      } else {
        $this.removeClass('unselected');
      }
    });
    $body.on('change', '.select select', function() {
      var $this;

      $this = $(this);
      if ($this.children('option').first().val() === '' && $this.children('option').first().attr('selected')) {
        $this.addClass('unselected');
      } else {
        $this.removeClass('unselected');
      }
    });
  });

  navSelector = $('.nav').length > 0 ? '.nav' : 'nav';

  $window = $(window);

  $(function() {
    var $body, delay, openMenu,
      _this = this;

    $body = $('body');
    delay = void 0;
    openMenu = function($target) {
      $target.parents('li.menu').toggleClass('on');
    };
    $body.on('mouseenter', navSelector + ' > ul > li.menu:not(.disabled)', function(e) {
      if ($window.width() >= 768) {
        clearTimeout(delay);
        $(navSelector + ' > ul > li.menu.on').removeClass('on');
        $(this).addClass('on');
      }
    });
    $body.on('mouseleave', navSelector + ' > ul > li.menu:not(.disabled)', function(e) {
      if ($window.width() >= 768) {
        delay = setTimeout((function() {
          return $(navSelector + ' > ul > li.menu.on').removeClass('on');
        }), 350);
      }
    });
    $body.on('click', navSelector + ' > ul > li.menu:not(.disabled) > a', function(e) {
      var $target;

      $target = $(e.target);
      if (!$target.hasClass('focused')) {
        if (Modernizr.touch || $window.width() < 768) {
          openMenu($target);
        } else {
          $(navSelector + ' > ul > li.menu.on').removeClass('on');
          $target.parents('li.menu').addClass('on');
        }
      } else {
        $target.removeClass('focused');
      }
      e.stopImmediatePropagation();
    });
    $body.on('focusin', navSelector + ' > ul > li.menu > a', function(e) {
      var $target;

      $target = $(e.currentTarget);
      $target.addClass('focused');
      openMenu($target);
      e.stopImmediatePropagation();
    });
    $body.on('focusin', navSelector + ' > ul > li.menu:not(.on) > a', function(e) {
      $(navSelector + ' > ul > li.menu.on').removeClass('on');
    });
    $body.on('dropdown', function(e) {
      var $target;

      $target = $(e.target);
      $('.dropdown').not($target).removeClass('on');
      $target[$target.hasClass('on') ? 'removeClass' : 'addClass']('on');
    });
    $body.on('click', '.dropdown', function(e) {
      var $target;

      $target = $(e.currentTarget);
      if (!$target.is('a')) {
        e.stopPropagation();
      }
      if (!$target.hasClass('focused')) {
        $target.trigger('dropdown');
      } else {
        $target.removeClass('focused');
      }
    });
    $body.on('click', function() {
      var $dropdown, $menu;

      $dropdown = $('.dropdown.on');
      if ($dropdown.length) {
        $dropdown.removeClass('on');
      }
      $menu = $(navSelector + '.menu.on');
      if ($menu.length) {
        $menu.removeClass('on');
      }
    });
    $body.on('focus', '.dropdown', function(e) {
      var $target;

      $target = $(e.currentTarget);
      if (!$(e.target).is('a')) {
        if ($target.hasClass('dropdown')) {
          $target.addClass('focused').trigger('dropdown');
        }
      } else {
        e.stopPropagation();
      }
    });
    $body.on('focusout', '.dropdown li:last-child a', function(e) {
      $('.dropdown.on').removeClass('on');
    });
    $body.on('menu-toggle', function(e) {
      var $target;

      $target = $(e.target).parents(navSelector + '.menu');
      $target[$target.hasClass('on') ? 'removeClass' : 'addClass']('on');
    });
    $(navSelector + '.menu').each(function() {
      var $this;

      $this = $(this);
      if (!$this.attr('data-label')) {
        $this.attr('data-label', 'Menu');
      }
      if (!($this.find('.menu-toggle').length > 0)) {
        $this.prepend('<a href="#" class="menu-toggle"><i class="icon-reorder"></i></a>');
      }
    });
    $body.on('click', navSelector + '.menu .menu-toggle', function(e) {
      var $parent, $target;

      $target = $(e.target);
      e.stopPropagation();
      e.preventDefault();
      if ($target.parents('.menu-toggle').length) {
        $parent = $target.parents('.menu-toggle');
        if (!$parent.hasClass('focused')) {
          $parent.trigger('menu-toggle');
        } else {
          $parent.removeClass('focused');
        }
      } else if (!$target.hasClass('focused')) {
        $target.trigger('menu-toggle');
      } else {
        $target.removeClass('focused');
      }
    });
    $body.on('focusin', navSelector + '.menu .menu-toggle', function(e) {
      var $parent, $target;

      $target = $(e.target);
      if ($target.hasClass('menu-toggle')) {
        $target.addClass('focused').trigger('menu-toggle');
      } else if (($parent = $target.parents('.menu-toggle')).length) {
        $parent.addClass('focused').trigger('menu-toggle');
      }
    });
    $body.on('focusout', navSelector + '.menu > ul > li:last-child a', function(e) {
      $(navSelector + '.menu.on').removeClass('on');
    });
  });

  $window.on('resize', function() {
    var selector;

    selector = $(navSelector + ' > ul > li.menu.on');
    if (selector.length > 1) {
      return selector.removeClass('on').first().addClass('on');
    }
  });

  /*
   * Requires jquery.magnific-popup.js
  */


  $(function() {
    $(".modal.image,      .modal[href*='.jpg'],      .modal[href*='.jpeg'],      .modal[href*='.gif'],      .modal[href*='.png']").magnificPopup({
      type: 'image'
    });
    $(".modal.gallery").magnificPopup({
      delegate: 'a',
      type: 'image',
      image: {
        titleSrc: 'title'
      },
      gallery: {
        enabled: true
      }
    });
    $(".modal[href^='#']").magnificPopup({
      type: 'inline',
      mainClass: 'inline-modal'
    });
    $("a.modal[href^='http']").not(".image").not("[href*='.jpg']").not("[href*='.jpeg']").not("[href*='.gif']").not("[href*='.png']").magnificPopup({
      type: 'iframe',
      height: '100%'
    });
    $("a.video.modal[href^='http']").magnificPopup({
      type: 'iframe'
    });
    return $("a.modal[href]").not("[href^='#']").not(".image").not("[href^='http']").not("[href*='.jpg']").not("[href*='.jpeg']").not("[href*='.gif']").not("[href*='.png']").magnificPopup({
      type: 'ajax'
    });
  });

  $(function() {
    var $body;

    limitPaginationItems();
    $body = $('body');
    $body.on('click', '.pagination ul > li:not(.next, .prev) a', function(e) {
      var $next, $prev, $this;

      $this = $(this);
      $('.pagination ul > li:not(.next, .prev)').removeClass('active');
      $this.parent('li').addClass('active');
      $prev = $('.pagination ul > li.prev');
      if ($this.parent('li').hasClass('first')) {
        $prev.addClass('disabled');
      } else {
        $prev.removeClass('disabled');
      }
      $next = $('.pagination ul > li.next');
      if ($this.parent('li').hasClass('last')) {
        $next.addClass('disabled');
      } else {
        $next.removeClass('disabled');
      }
      limitPaginationItems();
      e.preventDefault();
      return false;
    });
    $body.on('click', '.pagination ul > li.prev:not(.disabled)', function(e) {
      var el;

      $('.pagination ul > li.next').removeClass('disabled');
      el = $('.pagination ul > li.active');
      if (!el.hasClass('first')) {
        el.removeClass('active');
        el.prev().addClass('active');
        limitPaginationItems();
      }
      if ($('.pagination ul > li.active').hasClass('first')) {
        $(this).addClass('disabled');
      }
      e.preventDefault();
      return false;
    });
    $body.on('click', '.pagination ul > li.next:not(.disabled)', function(e) {
      var el;

      $('.pagination ul > li.prev').removeClass('disabled');
      el = $('.pagination ul > li.active');
      if (!el.hasClass('last')) {
        el.removeClass('active');
        el.next().addClass('active');
        limitPaginationItems();
      }
      if ($('.pagination ul > li.active').hasClass('last')) {
        $(this).addClass('disabled');
      }
      e.preventDefault();
      return false;
    });
    $body.on('click', '.pagination ul > li.disabled a', function(e) {
      e.preventDefault();
      return false;
    });
  });

  $(window).resize(function() {
    return limitPaginationItems();
  });

  limitPaginationItems = function() {
    $('.pagination ul').each(function() {
      var pagination, totalItemsWidth, visibleItemsWidth, visibleSpace, _results;

      pagination = $(this);
      visibleSpace = pagination.outerWidth() - pagination.children('li.prev').outerWidth() - pagination.children('li.next').outerWidth();
      totalItemsWidth = 0;
      pagination.children('li').each(function() {
        totalItemsWidth += $(this).outerWidth();
      });
      pagination.children('li').not('.prev, .next, .active').hide();
      visibleItemsWidth = 0;
      pagination.children('li:visible').each(function() {
        visibleItemsWidth += $(this).outerWidth();
      });
      _results = [];
      while ((visibleItemsWidth + 29) < visibleSpace && (visibleItemsWidth + 29) < totalItemsWidth) {
        pagination.children('li:visible').not('.next').last().next().show();
        visibleItemsWidth = 0;
        pagination.children('li:visible').each(function() {
          visibleItemsWidth += $(this).outerWidth();
        });
        if ((visibleItemsWidth + 29) <= visibleSpace) {
          pagination.children('li:visible').not('.prev').first().prev().show();
          visibleItemsWidth = 0;
          pagination.children('li:visible').each(function() {
            visibleItemsWidth += $(this).outerWidth();
          });
        }
        visibleItemsWidth = 0;
        _results.push(pagination.children('li:visible').each(function() {
          visibleItemsWidth += $(this).outerWidth();
        }));
      }
      return _results;
    });
  };

  /*
   * Requires jquery.responsiveText.js
  */


  $(function() {
    $('table.responsive').each(function(index, object) {
      var $this, compression, max, min, padding;

      $this = $(this);
      compression = 30;
      min = 8;
      max = 13;
      padding = 0;
      compression = parseFloat($this.attr('data-compression') || compression);
      min = parseFloat($this.attr('data-min') || min);
      max = parseFloat($this.attr('data-max') || max);
      padding = parseFloat($this.attr('data-padding') || padding);
      $(object).responsiveTable({
        compressor: compression,
        minSize: min,
        maxSize: max,
        padding: padding
      });
    });
  });

  /*
   * Requires jquery.responsiveText.js
  */


  $(function() {
    $('.responsive').not('table').each(function(index, object) {
      var $this, compression, max, min, scrollReset, scrollTime;

      $this = $(this);
      compression = 10;
      min = 10;
      max = 200;
      scrollTime = 650;
      scrollReset = 200;
      compression = parseFloat($this.attr('data-compression') || compression);
      min = parseFloat($this.attr('data-min') || min);
      max = parseFloat($this.attr('data-max') || max);
      $(object).responsiveText({
        compressor: compression,
        minSize: min,
        maxSize: max
      });
      $this.hover((function() {
        var difference;

        difference = $this.get(0).scrollWidth - $this.width();
        if (difference > scrollTime) {
          scrollTime = difference;
        }
        if (difference > 0) {
          return $this.stop().animate({
            "text-indent": -difference
          }, scrollTime);
        }
      }), function() {
        return $this.stop().animate({
          "text-indent": 0
        }, scrollReset);
      });
    });
  });

  $(function() {
    $('body').on('click', '.tabs > ul li a[href^=#], [role=tab] a', function(e) {
      var $this, tabs;

      $this = $(this);
      if (!$this.hasClass('disabled')) {
        if ($this.parents('[role=tabpanel]').length > 0) {
          tabs = $this.parents('[role=tabpanel]');
        } else {
          tabs = $this.parents('.tabs');
        }
        tabs.find('> ul li a, [role=tab] a').removeClass('active');
        $this.addClass('active');
        tabs.children('div, [role=tabpanel]').removeClass('active');
        tabs.children($this.attr('href')).addClass('active');
      }
      e.preventDefault();
      return false;
    });
  });

  $(function() {
    var $body;

    $body = $('body');
    $('.tiles').each(function() {
      var $this;

      $this = $(this);
      $this.find('.tile').attr('role', 'button');
      $this.find('.tile[data-value=' + $this.find('input.value, select.value').val() + ']').addClass('active');
    });
    $body.on('click', '.tiles .tile', function(e) {
      var $this, tiles;

      $this = $(this);
      if (!$this.hasClass('disabled')) {
        tiles = $this.parents('.tiles');
        tiles.find('.tile').removeClass('active');
        tiles.find('input.value, select.value').val($this.data('value')).change();
        $this.addClass('active');
      }
      e.preventDefault();
      return false;
    });
    $body.on('change', '.tiles input.value, .tiles select.value', function() {
      var $this, tiles;

      $this = $(this);
      tiles = $this.parents('.tiles');
      tiles.find('.tile').removeClass('active');
      tiles.find('.tile[data-value=' + $this.val() + ']').addClass('active');
    });
  });

  /*
   * Requires jquery.tooltips.js
  */


  $(function() {
    return $('.tooltip[title]').tooltip();
  });

  /*
   *
   *  jQuery ResponsiveTables by Gary Hepting - https://github.com/ghepting/responsiveTables
   *  
   *  Open source under the MIT License. 
   *
   *  Copyright © 2013 Gary Hepting. All rights reserved.
   *
  */


  (function($) {
    var elems;

    elems = [];
    $.fn.responsiveTable = function(options) {
      var settings;

      settings = {
        compressor: options.compressor || 10,
        minSize: options.minSize || Number.NEGATIVE_INFINITY,
        maxSize: options.maxSize || Number.POSITIVE_INFINITY,
        padding: 2,
        height: "auto",
        adjust_parents: true
      };
      return this.each(function() {
        var columns, elem, fontSize, rows;

        elem = $(this);
        elem.attr('data-compression', settings.compressor);
        elem.attr('data-min', settings.minSize);
        elem.attr('data-max', settings.maxSize);
        elem.attr('data-padding', settings.padding);
        columns = $("tr", elem).first().children("th, td").length;
        rows = $("tr", elem).length;
        if (settings.height !== "auto") {
          $this.css("height", settings.height);
          if (settings.adjust_parents) {
            $this.parents().each(function() {
              return $(this).css("height", "100%");
            });
          }
        }
        $("tr th, tr td", elem).css("width", Math.floor(100 / columns) + "%");
        $("tr th, tr td", elem).css("height", Math.floor(100 / rows) + "%");
        fontSize = Math.floor(Math.max(Math.min(elem.width() / settings.compressor, parseFloat(settings.maxSize)), parseFloat(settings.minSize)));
        $("tr th, tr td", elem).css("font-size", fontSize + "px");
        return elems.push(elem);
      });
    };
    return $(window).on("resize", function() {
      return $(elems).each(function() {
        var elem, fontSize;

        elem = $(this);
        fontSize = Math.floor(Math.max(Math.min(elem.width() / (elem.attr('data-compression')), parseFloat(elem.attr('data-max'))), parseFloat(elem.attr('data-min'))));
        return $("tr th, tr td", elem).css("font-size", fontSize + "px");
      });
    });
  })(jQuery);

  /*
   *
   *  jQuery ResponsiveText by Gary Hepting - https://github.com/ghepting/responsiveText
   *  
   *  Open source under the MIT License. 
   *
   *  Copyright © 2013 Gary Hepting. All rights reserved.
   *
  */


  (function($) {
    var elems;

    elems = [];
    $.fn.responsiveText = function(options) {
      var settings;

      settings = {
        compressor: options.compressor || 10,
        minSize: options.minSize || Number.NEGATIVE_INFINITY,
        maxSize: options.maxSize || Number.POSITIVE_INFINITY
      };
      return this.each(function() {
        var elem;

        elem = $(this);
        elem.attr('data-compression', settings.compressor);
        elem.attr('data-min', settings.minSize);
        elem.attr('data-max', settings.maxSize);
        elem.css("font-size", Math.floor(Math.max(Math.min(elem.width() / settings.compressor, parseFloat(settings.maxSize)), parseFloat(settings.minSize))));
        return elems.push(elem);
      });
    };
    return $(window).on("resize", function() {
      return $(elems).each(function() {
        var elem;

        elem = $(this);
        return elem.css("font-size", Math.floor(Math.max(Math.min(elem.width() / (elem.attr('data-compression')), parseFloat(elem.attr('data-max'))), parseFloat(elem.attr('data-min')))));
      });
    });
  })(jQuery);

  /*
   *
   *  jQuery Tooltips by Gary Hepting - https://github.com/ghepting/jquery-tooltips
   *  
   *  Open source under the MIT License. 
   *
   *  Copyright © 2013 Gary Hepting. All rights reserved.
   *
  */


  (function($) {
    return $.fn.tooltip = function(options) {
      var closetooltip, defaults, delayShow, getElementPosition, resettooltip, setPosition, showtooltip, tooltip, trigger;

      defaults = {
        topOffset: 0,
        delay: 100,
        speed: 100
      };
      options = $.extend(defaults, options);
      tooltip = $('#tooltip');
      delayShow = '';
      trigger = '';
      if ($('#tooltip').length !== 1) {
        tooltip = $("<div id=\"tooltip\"></div>");
        tooltip.appendTo("body").hide();
      }
      getElementPosition = function(el) {
        var bottom, left, offset, right, top, win;

        offset = el.offset();
        win = $(window);
        return {
          top: top = offset.top - win.scrollTop(),
          left: left = offset.left - win.scrollLeft(),
          bottom: bottom = win.height() - top - el.outerHeight(),
          right: right = win.width() - left - el.outerWidth()
        };
      };
      setPosition = function(trigger) {
        var attrs, coords, height, width;

        coords = getElementPosition(trigger);
        if (tooltip.outerWidth() > ($(window).width() - 20)) {
          tooltip.css('width', $(window).width() - 20);
        }
        attrs = {};
        tooltip.css('max-width', Math.min($(window).width() - parseInt($('body').css('padding-left')) - parseInt($('body').css('padding-right')), parseInt(tooltip.css('max-width'))));
        width = tooltip.outerWidth();
        height = tooltip.outerHeight();
        if (coords.left <= coords.right) {
          tooltip.addClass('left');
          attrs.left = coords.left;
        } else {
          tooltip.addClass('right');
          attrs.right = coords.right;
        }
        if ((coords.top - options.topOffset) > (height + 20)) {
          tooltip.addClass('top');
          attrs.top = (trigger.offset().top - height) - 20;
        } else {
          tooltip.addClass('bottom');
          attrs.top = trigger.offset().top + trigger.outerHeight() - 4;
        }
        return tooltip.css(attrs);
      };
      resettooltip = function() {
        return tooltip.text('').removeClass().css({
          left: 'auto',
          right: 'auto',
          top: 'auto',
          bottom: 'auto',
          width: 'auto',
          'padding-left': 'auto',
          'padding-right': 'auto'
        });
      };
      closetooltip = function() {
        tooltip.stop().hide();
        resettooltip();
        return $('[role=tooltip]').removeClass('on');
      };
      showtooltip = function(trigger) {
        clearTimeout(delayShow);
        return delayShow = setTimeout(function() {
          tooltip.css({
            "opacity": 0,
            "display": "block"
          }).text(trigger.attr('data-title'));
          $.each(['disabled', 'info', 'alert', 'warning', 'error', 'success', 'green', 'turquoise', 'blue', 'purple', 'pink', 'yellow', 'orange', 'red', 'asphalt'], function(index, value) {
            if (trigger.hasClass(value)) {
              return tooltip.addClass(value);
            }
          });
          setPosition(trigger);
          trigger.addClass('on');
          return tooltip.animate({
            top: "+=10",
            opacity: 1
          }, options.speed);
        }, options.delay);
      };
      this.each(function() {
        var $this;

        $this = $(this);
        $this.attr('role', 'tooltip').attr('data-title', $this.attr('title'));
        return $this.removeAttr("title");
      });
      $('body').on('focus', '[role=tooltip]', function() {
        return showtooltip($(this));
      }).on('blur', '[role=tooltip]', function() {
        clearTimeout(delayShow);
        return closetooltip();
      }).on('mouseenter', '[role=tooltip]:not(input,select,textarea)', function() {
        return showtooltip($(this));
      }).on('mouseleave', '[role=tooltip]:not(input,select,textarea)', function() {
        clearTimeout(delayShow);
        return closetooltip();
      });
      return $(window).on({
        scroll: function() {
          trigger = $('[role=tooltip].on');
          if (trigger.length) {
            setPosition(trigger);
            return $('#tooltip').css({
              top: "+=10"
            });
          }
        }
      });
    };
  })(jQuery);

}).call(this);
