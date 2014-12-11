
/*
 *
 *  Responsive Navigation by Gary Hepting
 *
 *  Open source under the MIT License.
 *
 *  Copyright © 2013 Gary Hepting. All rights reserved.
 *
 */

(function() {
  var ResponsiveNavigation, responsiveNavigationIndex;

  responsiveNavigationIndex = 0;

  window.delayMenuClose = '';

  window.delayNavigationClose = '';

  ResponsiveNavigation = (function() {
    function ResponsiveNavigation(el) {
      this.index = responsiveNavigationIndex++;
      this.el = $(el);
      this.init();
    }

    ResponsiveNavigation.prototype.init = function() {
      this.defaultLabel();
      this.setupMarkers();
      if (!this.el.hasClass('nocollapse')) {
        return this.hamburgerHelper();
      }
    };

    ResponsiveNavigation.prototype.defaultLabel = function() {
      if (!this.el.hasClass('nocollapse')) {
        if (this.el.attr('title') === void 0) {
          return this.el.attr('title', 'Menu');
        }
      }
    };

    ResponsiveNavigation.prototype.setupMarkers = function() {
      this.el.find('ul').each(function() {
        if ($(this).find('li').length) {
          return $(this).attr('role', 'menu');
        }
      });
      if (!$(this.el).hasClass('vertical')) {
        this.el.find('> ul').attr('role', 'menubar');
      }
      return this.el.find('li').each(function() {
        if ($(this).find('ul').length) {
          return $(this).attr('role', 'menu');
        }
      });
    };

    ResponsiveNavigation.prototype.hamburgerHelper = function() {
      return this.el.prepend('<button class="hamburger"></button>');
    };

    return ResponsiveNavigation;

  })();

  $(function() {
    var mouseBindings, responsiveNavigationElements, touchBindings;
    mouseBindings = function() {
      $('body').on('mouseenter', '.nav:not(.vertical) li[role="menu"]', function(e) {
        var expandedSiblings, targetMenu;
        $('.nav:not(.vertical)').not(this).each(function() {
          if (!$(this).find('button.hamburger').is(':visible')) {
            return $(this).find('ul[aria-expanded="true"]').attr('aria-expanded', 'false');
          }
        });
        if (!$(this).parents('.nav').find('button.hamburger').is(':visible')) {
          clearTimeout(window.delayMenuClose);
          expandedSiblings = $(this).siblings().find('ul[aria-expanded="true"]');
          expandedSiblings.attr('aria-expanded', 'false');
          targetMenu = $(e.target).parents('li[role="menu"]').children('ul');
          return targetMenu.attr('aria-expanded', 'true');
        }
      });
      return $('body').on('mouseleave', '.nav:not(.vertical) li[role="menu"]', function(e) {
        if (!$(this).parents('.nav').find('button.hamburger').is(':visible')) {
          return window.delayMenuClose = setTimeout((function(_this) {
            return function() {
              return $(_this).find('ul[aria-expanded="true"]').attr('aria-expanded', 'false');
            };
          })(this), 500);
        }
      });
    };
    touchBindings = function() {
      $('body').on('click', '.nav li[role="menu"] > a, .nav li[role="menu"] > button', function(e) {
        var list, menu;
        list = $(this).siblings('ul');
        menu = $(this).parent('[role="menu"]');
        if (list.attr('aria-expanded') !== 'true') {
          list.attr('aria-expanded', 'true');
        } else {
          list.attr('aria-expanded', 'false');
          list.find('[aria-expanded="true"]').attr('aria-expanded', 'false');
        }
        if (menu.attr('aria-pressed') !== 'true') {
          menu.attr('aria-pressed', 'true');
        } else {
          menu.attr('aria-pressed', 'false');
          menu.find('[aria-pressed="true"]').attr('aria-pressed', 'false');
          menu.find('[aria-expanded="true"]').attr('aria-expanded', 'false');
        }
        return e.preventDefault();
      });
      return $('body').on('click', '.nav button.hamburger', function(e) {
        var list;
        list = $(this).siblings('ul');
        if (list.attr('aria-expanded') !== 'true') {
          list.attr('aria-expanded', 'true');
        } else {
          list.attr('aria-expanded', 'false');
          list.find('[aria-pressed="true"]').attr('aria-pressed', 'false');
          list.find('[aria-expanded="true"]').attr('aria-expanded', 'false');
        }
        return e.preventDefault();
      });
    };
    responsiveNavigationElements = [];
    $('.nav').each(function() {
      return responsiveNavigationElements.push(new ResponsiveNavigation(this));
    });
    touchBindings();
    if (!Modernizr.touch) {
      return mouseBindings();
    }
  });

}).call(this);
