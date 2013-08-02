module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")

    watch:
      coffee:
        files: '**/*.coffee'
        tasks: ['coffee', 'concat:groundwork']
      jade:
        files: '**/*.jade'
        tasks: ['jade:groundwork']
      compass:
        files: '**/*.scss'
        tasks: ['compass:groundwork']
      concat:
       files: ['js/plugins/jquery.cycle2.js',
               'js/plugins/jquery.magnific-popup.js']
       tasks: ['concat:groundwork']

    coffee:
      individual:
        expand: true
        cwd: 'src/coffee'
        src: ['components/*.coffee', 'plugins/*.coffee']
        dest: 'js'
        ext: '.js'
      concatenated:
        options:
          join: true
        files:
          "js/groundwork.all.js":         ["src/coffee/components/*.coffee", "src/coffee/plugins/*.coffee"]

    concat:
      groundwork:
        src: ['js/groundwork.all.js', 'js/plugins/jquery.cycle2.js', 'js/plugins/jquery.magnific-popup.js']
        dest: 'js/groundwork.all.js'

    jade:
      groundwork:
        # files:
        #   'pages/': ['src/jade/*.jade']
        files:
          'pages/home.html':              ['src/jade/home.jade']
          'pages/layout-1.html':          ['src/jade/layout-1.jade']
          'pages/layout-2.html':          ['src/jade/layout-2.jade']
          'pages/layout-3.html':          ['src/jade/layout-3.jade']
          'pages/layout-4.html':          ['src/jade/layout-4.jade']
          'pages/layout-5.html':          ['src/jade/layout-5.jade']
          'pages/layout-6.html':          ['src/jade/layout-6.jade']
          'pages/layout-7.html':          ['src/jade/layout-7.jade']
          'pages/grid.html':              ['src/jade/grid.jade']
          'pages/helpers.html':           ['src/jade/helpers.jade']
          'pages/typography.html':        ['src/jade/typography.jade']
          'pages/buttons.html':           ['src/jade/buttons.jade']
          'pages/navigation.html':        ['src/jade/navigation.jade']
          'pages/ui-elements.html':       ['src/jade/ui-elements.jade']
          'pages/tables.html':            ['src/jade/tables.jade']
          'pages/tabs.html':              ['src/jade/tabs.jade']
          'pages/tooltips.html':          ['src/jade/tooltips.jade']
          'pages/forms.html':             ['src/jade/forms.jade']
          'pages/tiles.html':             ['src/jade/tiles.jade']
          'pages/icons.html':             ['src/jade/icons.jade']
          'pages/social-icons.html':      ['src/jade/social-icons.jade']
          'pages/responsive-text.html':   ['src/jade/responsive-text.jade']
          'pages/modals.html':            ['src/jade/modals.jade']
          'pages/cycle2.html':            ['src/jade/cycle2.jade']
        options:
          pretty: true
      tests:
        files:
          'tests/test-buttons.html'                 : ['tests/src/jade/test-buttons.jade']
          'tests/test-grid.html'                    : ['tests/src/jade/test-grid.jade']
          'tests/test-helpers.html'                 : ['tests/src/jade/test-helpers.jade']
          'tests/test-typography.html'              : ['tests/src/jade/test-typography.jade']
          'tests/test-ui-elements.html'             : ['tests/src/jade/test-ui-elements.jade']
          'tests/test-unresponsive-grid.html'       : ['tests/src/jade/test-unresponsive-grid.jade']
          'tests/test-unresponsive-ui-elements.html': ['tests/src/jade/test-unresponsive-ui-elements.jade']
          'tests/test-unresponsive-typography.html' : ['tests/src/jade/test-unresponsive-typography.jade']
          'tests/test-unresponsive-buttons.html'    : ['tests/src/jade/test-unresponsive-buttons.jade']

    compass:
      groundwork:
        options:
          config: 'config.rb'
          trace: true
      tests:
        options:
          config: 'tests/config.rb'

    cssmin:
      minify:
        expand: true,
        cwd: 'css/',
        src: ['*.css', '!*.min.css'],
        dest: 'css/',
        ext: '.min.css'

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-jade'
  grunt.loadNpmTasks 'grunt-contrib-compass'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'

  grunt.registerTask 'default',           ['watch']
  grunt.registerTask 'build',             ['coffee', 'concat:groundwork', 'jade:groundwork', 'compass:groundwork', 'cssmin']
  grunt.registerTask "tests",             ['jade:tests', 'compass:tests']
