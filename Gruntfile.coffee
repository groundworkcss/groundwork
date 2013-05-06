module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")

    watch:
      coffee:
        files: '**/*.coffee'
        tasks: ['coffee']
      jade:
        files: '**/*.jade'
        tasks: ['jade:groundwork']
      compass:
        files: '**/*.scss'
        tasks: ['compass:groundwork']

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
          "js/groundwork.all.js":       ["src/coffee/components/*.coffee", "src/coffee/plugins/*.coffee"]

    jade:
      groundwork:
        files:
          'templates/home.html':          ['src/jade/home.jade']
          'templates/kitchen-sink.html':  ['src/jade/kitchen-sink.jade']
          'templates/layout-1.html':      ['src/jade/layout-1.jade']
          'templates/layout-2.html':      ['src/jade/layout-2.jade']
          'templates/layout-3.html':      ['src/jade/layout-3.jade']
          'templates/layout-4.html':      ['src/jade/layout-4.jade']
          'templates/layout-5.html':      ['src/jade/layout-5.jade']
      tests:
        files:
          'tests/test-buttons.html':      ['tests/src/jade/test-buttons.jade']
          'tests/test-grid.html':         ['tests/src/jade/test-grid.jade']
          'tests/test-helpers.html':      ['tests/src/jade/test-helpers.jade']
          'tests/test-typography.html':   ['tests/src/jade/test-typography.jade']
          'tests/test-ui-elements.html':  ['tests/src/jade/test-ui-elements.jade']

    compass:
      groundwork:
        options:
          config: 'config.rb'
          trace: true
      tests:
        options:
          config: 'tests/config.rb'

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-jade'
  grunt.loadNpmTasks 'grunt-contrib-compass'

  grunt.registerTask 'default',           ['watch']
  grunt.registerTask 'build',             ['coffee', 'jade:groundwork', 'compass:groundwork']
  grunt.registerTask "tests",             ['jade:tests', 'compass:tests']
