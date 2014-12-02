(function() {
  var ResponsiveNavigation, ResponsiveTable, ResponsiveText, TruncateLines, delayedAdjustTables, delayedAdjustText, delayedAdjustTruncation, equalizeColumns, responsiveNavigationIndex, responsiveTableIndex, responsiveTextIndex, truncateIndex;

  $(function() {
    return $('body').on('click', '.checklist:not([readonly]) li:not([readonly])', function() {
      if ($(this).attr('aria-checked') === "true" || $(this).attr('data-checked') === "true" || $(this).attr('checked') === "checked" || $(this).hasClass('checked') || $(this).hasClass('completed')) {
        $(this).attr('aria-checked', "false");
      } else {
        $(this).attr('aria-checked', "true");
      }
      return $(this).removeClass('checked completed').removeAttr('data-checked checked');
    });
  });

  $(function() {
    return $('body').on('click', '.dismissible', function() {
      $(this).addClass('dismiss animated');
      return setTimeout((function(_this) {
        return function() {
          return $(_this).hide(250, function() {
            return $(this).remove();
          });
        };
      })(this), 1000);
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
      $row.children().each(function(i) {
        var $this;
        $this = $(this);
        $this.css('minHeight', '1px');
        collapsed = $this.outerWidth() === $row.outerWidth();
        if (!collapsed) {
          if (!$this.hasClass('equal')) {
            $this.addClass('equal');
          }
          if ($this.outerHeight() > tallest) {
            return tallest = $this.outerHeight();
          }
        }
      });
      if (!collapsed) {
        return $row.children().css('min-height', tallest);
      }
    });
  };

  $(function() {
    var $body, $targets;
    $body = $('body');
    $targets = ['.error input', '.error textarea', '.invalid input', '.invalid textarea', 'input.error', 'textarea.error', 'input.invalid', 'textarea.invalid', 'input[aria-invalid="true"]', 'textarea[aria-invalid="true"]'].join(',');
    return $body.on('click', $targets, function() {
      $(this).focus();
      return $(this).select();
    });
  });

  $(function() {
    var $body;
    $body = $('body');
    $('.dropdown').each(function() {
      if ($(this).attr('aria-pressed') !== 'true') {
        $(this).attr('aria-pressed', 'false');
        return $(this).children('ul').attr({
          'aria-expanded': 'false',
          'aria-hidden': 'true',
          'role': 'menu'
        });
      }
    });
    $body.on('dropdown', function(e) {
      var $target, dropdownState;
      $target = $(e.target);
      $('.dropdown').not($target).attr('aria-pressed', 'false');
      $('.dropdown').children('ul').attr({
        'aria-expanded': 'false',
        'aria-hidden': 'true'
      });
      if ($target.attr('aria-pressed') === 'true') {
        dropdownState = 'false';
      } else {
        dropdownState = 'true';
      }
      $target.attr('aria-pressed', dropdownState);
      return $target.children('ul').attr({
        'aria-expanded': !dropdownState,
        'aria-hidden': dropdownState
      });
    });
    $body.on('click', '.dropdown', function(e) {
      var $target;
      $target = $(e.currentTarget);
      if (!($target.is('a') || $target.is('button'))) {
        e.stopPropagation();
      }
      if (!$target.hasClass('focused')) {
        return $target.trigger('dropdown');
      } else {
        return $target.removeClass('focused');
      }
    });
    $body.on('click', function() {
      var $dropdown;
      $dropdown = $('.dropdown[aria-pressed="true"]');
      if ($dropdown.length) {
        return $dropdown.attr('aria-pressed', 'false');
      }
    });
    return $body.on('focusout', '.dropdown li:last-child a, .dropdown li:last-child button', function(e) {
      return $('.dropdown[aria-pressed="true"]').attr('aria-pressed', 'false');
    });
  });


  /*
   *
   *  Responsive Navigation by Gary Hepting
   *
   *  Open source under the MIT License.
   *
   *  Copyright © 2013 Gary Hepting. All rights reserved.
   *
   */

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

  $(function() {
    var adjustVerticalTabs, convertToAccordion, restoreTabStructure, transformTabs;
    $('.tabs').each(function() {
      var activeTab, tabs;
      activeTab = $(this).children('ul').children('li.active');
      if (activeTab.length) {
        tabs = activeTab.parents('.tabs');
        return tabs.find(activeTab.attr('aria-controls')).addClass('active');
      } else {
        $(this).children('ul').children('li').first().addClass('active');
        return $(this).children('div').first().addClass('active');
      }
    });
    $('body').on('click', '.tabs > ul li', function(e) {
      var tab, tabs;
      tab = $(this).addClass('active');
      tabs = tab.parents('.tabs');
      tab.siblings('li').removeClass('active');
      tabs.find('> div, > ul > div').hide();
      tabs.find(tab.attr('aria-controls')).show();
      return e.preventDefault();
    });
    transformTabs = function() {
      var accordion, ipad, mobile, notaccordion, notipad, notmobile, notsmalltablet, smalltablet, viewport;
      viewport = $(window).width();
      accordion = '.tabs.accordion';
      mobile = '.tabs.accordion.mobile';
      smalltablet = '.tabs.accordion.small-tablet';
      ipad = '.tabs.accordion.ipad';
      notaccordion = '.tabs:not(.accordion)';
      notmobile = ':not(.mobile)';
      notsmalltablet = ':not(.small-tablet)';
      notipad = ':not(.ipad)';
      if (viewport <= 480) {
        restoreTabStructure(mobile);
        return convertToAccordion(notaccordion + notmobile);
      } else if (viewport < 768) {
        restoreTabStructure(mobile + ', ' + smalltablet);
        return convertToAccordion(notaccordion + notmobile + notsmalltablet);
      } else if (viewport <= 1024) {
        restoreTabStructure(mobile + ', ' + smalltablet + ', ' + ipad);
        return convertToAccordion(notaccordion + notmobile + notsmalltablet + notipad);
      } else if (viewport > 1024) {
        return restoreTabStructure(accordion);
      }
    };
    convertToAccordion = function(tabTypes) {
      tabTypes = $(tabTypes);
      return tabTypes.each(function() {
        var tabs;
        tabs = $(this);
        tabs.addClass('accordion');
        return tabs.find('> div').each(function() {
          var tablink, tabpanel;
          tabpanel = $(this).clone();
          tablink = 'li[aria-controls="#' + tabpanel.attr('id') + '"]';
          tabs.find(tablink).after(tabpanel);
          return $(this).remove();
        });
      });
    };
    restoreTabStructure = function(tabTypes) {
      return $(tabTypes).each(function() {
        var tabs;
        tabs = $(this);
        tabs.removeClass('accordion');
        if (tabs.hasClass('vertical')) {
          adjustVerticalTabs(tabs);
        }
        return tabs.children('ul').children('div').each(function() {
          var tabpanel;
          tabpanel = $(this).clone();
          tabs.append(tabpanel);
          return $(this).remove();
        });
      });
    };
    adjustVerticalTabs = function(tabs) {
      tabs = $(tabs);
      if (!tabs.length) {
        tabs = $('.tabs.vertical');
      }
      return tabs.each(function() {
        if ($(this).hasClass('vertical')) {
          $(this).children('ul').css({
            'min-height': '0px'
          });
          if (!$(this).hasClass('accordion')) {
            $(this).children('[role="tabpanel"]').css({
              'padding-left': $(this).children('ul').width() + 10 + 'px'
            });
            return $(this).children('ul').css({
              'min-height': $(this).height() + 'px'
            });
          }
        }
      });
    };
    $(window).resize(function() {
      clearTimeout(window.delayedAdjustTabs);
      return window.delayedAdjustTabs = setTimeout(function() {
        transformTabs();
        return adjustVerticalTabs();
      }, 50);
    });
    return $(window).load(function() {
      transformTabs();
      return adjustVerticalTabs();
    });
  });


  /*
   *
   *  jQuery PlaceholderText by Gary Hepting
   *
   *  Open source under the MIT License.
   *
   *  Copyright © 2013 Gary Hepting. All rights reserved.
   *
   */

  (function($) {
    return $.fn.placeholderText = function(options) {
      var createPlaceholderContent, opts, placeholder;
      $.fn.placeholderText.defaults = {
        type: "paragraphs",
        amount: "1",
        html: true,
        punctuation: true
      };
      opts = $.extend({}, $.fn.placeholderText.defaults, options);
      placeholder = new Array(10);
      placeholder[0] = "Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla non arcu lacinia neque faucibus fringilla. Nulla non lectus sed nisl molestie malesuada. Proin in tellus sit amet nibh dignissim sagittis. Vivamus luctus egestas leo. Maecenas sollicitudin. Nullam rhoncus aliquam metus. Etiam egestas wisi a erat.";
      placeholder[1] = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam feugiat, turpis at pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus sit amet ante. Aliquam erat volutpat. Nunc auctor. Mauris pretium quam et urna. Fusce nibh. Duis risus. Curabitur sagittis hendrerit ante. Aliquam erat volutpat. Vestibulum erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat. Duis condimentum augue id magna semper rutrum. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Proin pede metus, vulputate nec, fermentum fringilla, vehicula vitae, justo. Fusce consectetuer risus a nunc. Aliquam ornare wisi eu metus. Integer pellentesque quam vel velit. Duis pulvinar.";
      placeholder[2] = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi gravida libero nec velit. Morbi scelerisque luctus velit. Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam. Proin mattis lacinia justo. Vestibulum facilisis auctor urna. Aliquam in lorem sit amet leo accumsan lacinia. Integer rutrum, orci vestibulum ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem sit amet enim. Phasellus et lorem id felis nonummy placerat. Fusce dui leo, imperdiet in, aliquam sit amet, feugiat eu, orci. Aenean vel massa quis mauris vehicula lacinia. Quisque tincidunt scelerisque libero. Maecenas libero. Etiam dictum tincidunt diam. Donec ipsum massa, ullamcorper in, auctor et, scelerisque sed, est. Suspendisse nisl. Sed convallis magna eu sem. Cras pede libero, dapibus nec, pretium sit amet, tempor quis, urna.";
      placeholder[3] = "Etiam posuere quam ac quam. Maecenas aliquet accumsan leo. Nullam dapibus fermentum ipsum. Etiam quis quam. Integer lacinia. Nulla est. Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis. Integer vulputate sem a nibh rutrum consequat. Maecenas lorem. Pellentesque pretium lectus id turpis. Etiam sapien elit, consequat eget, tristique non, venenatis quis, ante. Fusce wisi. Phasellus faucibus molestie nisl. Fusce eget urna. Curabitur vitae diam non enim vestibulum interdum. Nulla quis diam. Ut tempus purus at lorem.";
      placeholder[4] = "In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam id dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Mauris dictum facilisis augue. Fusce tellus. Pellentesque arcu. Maecenas fermentum, sem in pharetra pellentesque, velit turpis volutpat ante, in pharetra metus odio a lectus. Sed elit dui, pellentesque a, faucibus vel, interdum nec, diam. Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus. Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu, urna. Nullam at arcu a est sollicitudin euismod. Praesent dapibus. Duis bibendum, lectus ut viverra rhoncus, dolor nunc faucibus libero, eget facilisis enim ipsum id lacus. Nam sed tellus id magna elementum tincidunt.";
      placeholder[5] = "Morbi a metus. Phasellus enim erat, vestibulum vel, aliquam a, posuere eu, velit. Nullam sapien sem, ornare ac, nonummy non, lobortis a, enim. Nunc tincidunt ante vitae massa. Duis ante orci, molestie vitae, vehicula venenatis, tincidunt ac, pede. Nulla accumsan, elit sit amet varius semper, nulla mauris mollis quam, tempor suscipit diam nulla vel leo. Etiam commodo dui eget wisi. Donec iaculis gravida nulla. Donec quis nibh at felis congue commodo. Etiam bibendum elit eget erat.";
      placeholder[6] = "Praesent in mauris eu tortor porttitor accumsan. Mauris suscipit, ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel metus. Aenean fermentum risus id tortor. Integer imperdiet lectus quis justo. Integer tempor. Vivamus ac urna vel leo pretium faucibus. Mauris elementum mauris vitae tortor. In dapibus augue non sapien. Aliquam ante. Curabitur bibendum justo non orci.";
      placeholder[7] = "Morbi leo mi, nonummy eget, tristique non, rhoncus non, leo. Nullam faucibus mi quis velit. Integer in sapien. Fusce tellus odio, dapibus id, fermentum quis, suscipit id, erat. Fusce aliquam vestibulum ipsum. Aliquam erat volutpat. Pellentesque sapien. Cras elementum. Nulla pulvinar eleifend sem. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque porta. Vivamus porttitor turpis ac leo.";
      placeholder[8] = "Maecenas ipsum velit, consectetuer eu, lobortis ut, dictum at, dui. In rutrum. Sed ac dolor sit amet purus malesuada congue. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Suspendisse sagittis ultrices augue. Mauris metus. Nunc dapibus tortor vel mi dapibus sollicitudin. Etiam posuere lacus quis dolor. Praesent id justo in neque elementum ultrices. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. In convallis. Fusce suscipit libero eget elit. Praesent vitae arcu tempor neque lacinia pretium. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus.";
      placeholder[9] = "Aenean placerat. In vulputate urna eu arcu. Aliquam erat volutpat. Suspendisse potenti. Morbi mattis felis at nunc. Duis viverra diam non justo. In nisl. Nullam sit amet magna in magna gravida vehicula. Mauris tincidunt sem sed arcu. Nunc posuere. Nullam lectus justo, vulputate eget, mollis sed, tempor sed, magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam neque. Curabitur ligula sapien, pulvinar a, vestibulum quis, facilisis vel, sapien. Nullam eget nisl. Donec vitae arcu.";
      createPlaceholderContent = function(el) {
        var count, i, iParagraphCount, iWordCount, list, numOfChars, numOfWords, outputString, placeholderText, random, tempString, wordList;
        options = {};
        if ($(el).data('placeholderType') !== 'undefined') {
          options.type = $(el).data('placeholderType');
        }
        if ($(el).data('placeholderAmount') !== 'undefined') {
          options.amount = $(el).data('placeholderAmount');
        }
        if ($(el).data('placeholderHtml') !== 'undefined') {
          options.html = $(el).data('placeholderHtml');
        }
        if ($(el).data('placeholderPunctuation') !== 'undefined') {
          options.punctuation = $(el).data('placeholderPunctuation');
        }
        opts = $.extend({}, $.fn.placeholderText.defaults, options);
        count = opts.amount;
        placeholderText = "";
        i = 0;
        while (i < count) {
          random = Math.floor(Math.random() * 10);
          if (opts.html) {
            placeholderText += "<p>";
          }
          placeholderText += placeholder[random];
          if (opts.html) {
            placeholderText += "</p>";
          }
          placeholderText += "\n\n";
          i++;
        }
        switch (opts.type) {
          case "words":
            numOfWords = opts.amount;
            numOfWords = parseInt(numOfWords);
            list = new Array();
            wordList = new Array();
            wordList = placeholderText.split(" ");
            iParagraphCount = 0;
            iWordCount = 0;
            while (list.length < numOfWords) {
              if (iWordCount > wordList.length) {
                iWordCount = 0;
                iParagraphCount++;
                if (iParagraphCount + 1 > placeholder.length) {
                  iParagraphCount = 0;
                }
                wordList = placeholder[iParagraphCount].split(" ");
                wordList[0] = "\n\n" + wordList[0];
              }
              list.push(wordList[iWordCount]);
              iWordCount++;
            }
            placeholderText = list.join(" ");
            break;
          case "characters":
            outputString = "";
            numOfChars = opts.amount;
            numOfChars = parseInt(numOfChars);
            tempString = placeholder.join("\n\n");
            while (outputString.length < numOfChars) {
              outputString += tempString;
            }
            placeholderText = outputString.substring(0, numOfChars);
            break;
          case "paragraphs":
            break;
        }
        if (!opts.punctuation) {
          placeholderText = placeholderText.replace(",", "").replace(".", "");
        }
        return placeholderText;
      };
      return this.each(function() {
        var $this, placeholderContent;
        $this = $(this);
        placeholderContent = createPlaceholderContent(this);
        return $this.html(placeholderContent);
      });
    };
  })(jQuery);

  $(function() {
    return $('.placeholderText').placeholderText();
  });


  /*
   *
   *  jQuery ResponsiveTables by Gary Hepting
   *  https://github.com/ghepting/jquery-responsive-tables
   *
   *  Open source under the MIT License.
   *
   *  Copyright © 2013 Gary Hepting. All rights reserved.
   *
   */

  delayedAdjustTables = [];

  responsiveTableIndex = 0;

  ResponsiveTable = (function() {
    function ResponsiveTable(el) {
      this.index = responsiveTableIndex++;
      this.el = el;
      this.compression = $(this.el).data('compression') || 5;
      this.minFontSize = $(this.el).data('min') || 10;
      this.maxFontSize = $(this.el).data('max') || Number.POSITIVE_INFINITY;
      this.width = $(this.el).data('width') || "100%";
      this.height = $(this.el).data('height') || "auto";
      this.adjustParents = $(this.el).data('adjust-parents') || true;
      this.styled = $(this.el).data('styled') || true;
      this.columns = $('tbody tr', $(this.el)).first().find('th, td').length;
      this.rows = $('tbody tr', $(this.el)).length;
      this.init();
    }

    ResponsiveTable.prototype.init = function() {
      this.setupTable();
      this.adjustOnLoad();
      return this.adjustOnResize();
    };

    ResponsiveTable.prototype.fontSize = function() {
      var compressed;
      if (this.height === "auto") {
        compressed = $('tbody td', $(this.el)).first().width() / this.compression;
      } else {
        compressed = $(this.el).height() / this.rows / this.compression;
      }
      return Math.min(this.maxFontSize, Math.max(compressed, this.minFontSize));
    };

    ResponsiveTable.prototype.setupTable = function() {
      $(this.el).css('width', this.width);
      if (this.height !== "auto") {
        $(this.el).css('height', this.height);
      }
      $("th, td", $(this.el)).css('width', (100 / this.columns) + "%");
      if (this.styled) {
        $(this.el).addClass("responsiveTable");
      }
      if (this.height !== "auto") {
        $("th, td", $(this.el)).css('height', (100 / this.rows) + "%");
        if (this.adjustParents) {
          $(this.el).parents().each(function() {
            return $(this).css('height', '100%');
          });
        }
      }
      return $(this.el).css('font-size', this.fontSize());
    };

    ResponsiveTable.prototype.resizeTable = function() {
      return $(this.el).css('font-size', this.minFontSize).css('font-size', this.fontSize());
    };

    ResponsiveTable.prototype.adjustOnLoad = function() {
      return $(window).on('load', (function(_this) {
        return function() {
          return _this.resizeTable();
        };
      })(this));
    };

    ResponsiveTable.prototype.adjustOnResize = function() {
      return $(window).on('resize', (function(_this) {
        return function() {
          clearTimeout(delayedAdjustTables[_this.index]);
          return delayedAdjustTables[_this.index] = setTimeout(function() {
            return _this.resizeTable();
          }, 20);
        };
      })(this));
    };

    return ResponsiveTable;

  })();

  (function($) {
    var responsiveTableElements;
    responsiveTableElements = [];
    return $.fn.responsiveTables = function(options) {
      return this.each(function() {
        return responsiveTableElements.push(new ResponsiveTable(this));
      });
    };
  })(jQuery);

  $(document).ready(function() {
    return $("table.responsive").responsiveTables();
  });


  /*
   *
   *  jQuery ResponsiveText by Gary Hepting
   *  https://github.com/ghepting/jquery-responsive-text
   *
   *  Open source under the MIT License.
   *
   *  Copyright © 2013 Gary Hepting. All rights reserved.
   *
   */

  delayedAdjustText = [];

  responsiveTextIndex = 0;

  ResponsiveText = (function() {
    function ResponsiveText(el) {
      this.index = responsiveTextIndex++;
      this.el = el;
      this.compression = $(this.el).data('compression') || 10;
      this.minFontSize = $(this.el).data('min') || Number.NEGATIVE_INFINITY;
      this.maxFontSize = $(this.el).data('max') || Number.POSITIVE_INFINITY;
      this.scrollable = $(this.el).data('scrollable') || false;
      this.scrollSpeed = $(this.el).data('scrollspeed') || 650;
      this.scrollReset = $(this.el).data('scrollreset') || 200;
      this.init();
    }

    ResponsiveText.prototype.init = function() {
      $(this.el).wrapInner('<span class="responsiveText-wrapper" />');
      this.adjustOnLoad();
      this.adjustOnResize();
      if (this.scrollable) {
        return this.scrollOnHover();
      }
    };

    ResponsiveText.prototype.resizeText = function() {
      var calculatedFontSize, fontSize;
      calculatedFontSize = $(this.el).width() / this.compression;
      fontSize = Math.max(Math.min(calculatedFontSize, this.maxFontSize), this.minFontSize);
      return $(this.el).css({
        "font-size": Math.floor(fontSize)
      });
    };

    ResponsiveText.prototype.adjustOnLoad = function() {
      return $(window).on('load', (function(_this) {
        return function() {
          return _this.resizeText();
        };
      })(this));
    };

    ResponsiveText.prototype.adjustOnResize = function() {
      return $(window).on('resize', (function(_this) {
        return function() {
          clearTimeout(delayedAdjustText[_this.index]);
          return delayedAdjustText[_this.index] = setTimeout(function() {
            return _this.resizeText();
          }, 20);
        };
      })(this));
    };

    ResponsiveText.prototype.scrollOnHover = function() {
      $(this.el).css({
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap'
      });
      return $(this.el).hover((function(_this) {
        return function() {
          _this.difference = _this.el.scrollWidth - $(_this.el).width();
          if (_this.difference > _this.scrollSpeed) {
            _this.scrollSpeed = _this.difference;
          }
          if (_this.difference > 0) {
            $(_this.el).css('cursor', 'e-resize');
            return $(_this.el).stop().animate({
              "text-indent": -_this.difference
            }, _this.scrollSpeed, function() {
              return $(_this.el).css('cursor', 'text');
            });
          }
        };
      })(this), (function(_this) {
        return function() {
          return $(_this.el).stop().animate({
            "text-indent": 0
          }, _this.scrollReset);
        };
      })(this));
    };

    return ResponsiveText;

  })();

  (function($) {
    var responsiveTextElements;
    responsiveTextElements = [];
    return $.fn.responsiveText = function(options) {
      return this.each(function() {
        return responsiveTextElements.push(new ResponsiveText(this));
      });
    };
  })(jQuery);

  $(document).ready(function() {
    return $(".responsive").not('table').responsiveText();
  });


  /*
   *
   *  jQuery TruncateLines by Gary Hepting
   *  https://github.com/ghepting/jquery-truncate-lines
   *
   *  Open source under the MIT License.
   *
   *  Copyright © 2013 Gary Hepting. All rights reserved.
   *
   */

  delayedAdjustTruncation = [];

  truncateIndex = 0;

  TruncateLines = (function() {
    function TruncateLines(el) {
      this.el = el;
      this.index = truncateIndex++;
      this.text = $(this.el).text();
      $(this.el).attr('data-text', this.text);
      this.words = this.text.trim().split(" ");
      this.lines = parseInt($(this.el).attr('data-truncate'));
      this.truncate();
      this.adjustOnResize();
    }

    TruncateLines.prototype.truncate = function() {
      this.measure();
      return this.setContent();
    };

    TruncateLines.prototype.reset = function() {
      return $(this.el).text(this.text).css('max-height', 'none').attr('data-truncated', 'false');
    };

    TruncateLines.prototype.measure = function() {
      var i;
      this.reset();
      $(this.el).html(".");
      this.singleLineHeight = $(this.el).outerHeight();
      i = 1;
      while (i++ < this.lines) {
        $(this.el).append("<br>.");
      }
      return this.maxLinesHeight = $(this.el).outerHeight();
    };

    TruncateLines.prototype.empty = function() {
      return $(this.el).html("");
    };

    TruncateLines.prototype.setContent = function() {
      var truncated;
      this.reset();
      truncated = false;
      this.addWords(this.words.length);
      if (this.tooBig()) {
        this.addNumberWordsThatFit();
        $(this.el).css('max-height', this.maxLinesHeight + 'px');
        return $(this.el).attr('data-truncated', true);
      }
    };

    TruncateLines.prototype.addNumberWordsThatFit = function() {
      var can, cant, mid;
      cant = this.words.length;
      can = 0;
      mid = Math.floor(this.words.length / 2);
      while (can + 1 !== cant) {
        this.addWords(can + mid);
        if (this.tooBig()) {
          cant = can + mid;
        } else {
          can = can + mid;
        }
        mid = Math.floor(mid / 2) || 1;
      }
      this.addWords(can);
      return $(this.el).html(this.trimTrailingPunctuation($(this.el).html()));
    };

    TruncateLines.prototype.addWords = function(num) {
      return $(this.el).html(this.words.slice(0, num).join(" "));
    };

    TruncateLines.prototype.tooBig = function() {
      return $(this.el).outerHeight() > this.maxLinesHeight;
    };

    TruncateLines.prototype.adjustOnResize = function() {
      return $(window).on('resize', (function(_this) {
        return function() {
          clearTimeout(delayedAdjustTruncation[_this.index]);
          return delayedAdjustTruncation[_this.index] = setTimeout(function() {
            return _this.truncate();
          }, 20);
        };
      })(this));
    };

    TruncateLines.prototype.trimTrailingPunctuation = function(str) {
      return str.replace(/(,$)|(\.$)|(\:$)|(\;$)|(\?$)|(\!$)/g, "");
    };

    return TruncateLines;

  })();

  (function($) {
    var truncateInitialized, truncatedLineElements;
    truncateInitialized = false;
    truncatedLineElements = [];
    return $.fn.truncateLines = function() {
      if (!truncateInitialized) {
        $('head').append('<style type="text/css"> [data-truncated="true"] { overflow: hidden; } [data-truncated="true"]:after { content: "..."; position: absolute; } </style>');
      }
      return this.each(function() {
        return truncatedLineElements.push(new TruncateLines(this));
      });
    };
  })(jQuery);

  $(window).load(function() {
    return $("[data-truncate]").truncateLines();
  });

}).call(this);
