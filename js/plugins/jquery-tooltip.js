/*
 *
 *  jQuery Tooltips by Gary Hepting - https://github.com/ghepting/jquery-tooltips
 *  
 *  Open source under the MIT License. 
 *
 *  Copyright © 2013 Gary Hepting. All rights reserved.
 *
*/


(function() {
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

  $(document).ready(function() {
    return $('.tooltip[title]').tooltip();
  });

}).call(this);
