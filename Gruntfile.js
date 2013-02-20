/*global module:false*/
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      jsfiles: [
        'www/static/js/q.js',
        'www/static/js/ic/index.js',
        'www/static/js/ic/utils.js',
        'www/static/js/ic/models/index.js',
        'www/static/js/ic/models/Compressor.js',
        'www/static/js/ic/models/NullCompressor.js',
        'www/static/js/ic/models/WebpCompressor.js',
        'www/static/js/ic/models/InputImage.js',
        'www/static/js/ic/EventEmitter.js',
        'www/static/js/ic/views/index.js',
        'www/static/js/ic/views/View.js',
        'www/static/js/ic/views/ImageInput.js',
        'www/static/js/ic/views/ImageOutput.js',
        'www/static/js/ic/views/WebpOptions.js',
        'www/static/js/main.js'
      ]
    },
    concat: {
      options: {
        separator: '\n;\n'
      },
      all: {
        files: {
          'www/static/js/all.js': '<%= meta.jsfiles %>'
        }
      }
    },
    jshint: {
      all: '<%= meta.jsfiles %>',
      options: {
        curly: true,
        forin: true,
        immed: true,
        indent: 2,
        latedef: true,
        newcap: true,
        noarg: true,
        nonew: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        devel: true,
        globals: []
      }
    },
    uglify: {
      options: {
        mangle: {
          except: []
        }
      },
      all: {
        files: {
          'www/static/js/all.js': 'www/static/js/all.js'
        }
      }
    },
    sass: {
      dev: {
        options: {
          lineNumbers: true,
          debugInfo: true
        },
        files: {
          'www/static/css/all.css': 'www/static/css/all.scss'
        }
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'www/static/css/all.css': 'www/static/css/all.scss'
        }
      }
    },
    watch: {
      scripts: {
        files: '<%= meta.jsfiles %>',
        tasks: ['concat']
      },
      styles: {
        files: 'www/static/css/*.scss',
        tasks: ['sass:dev']
      }
    }
  });

  grunt.registerTask('server', function() {
    require('./index.js');
  });

  grunt.registerTask('buildStatic', function() {
    var done = this.async();
    require('./build-static.js')(done);
  });

  grunt.registerTask('dev', ['concat', 'sass:dev', 'server', 'watch']);
  grunt.registerTask('build', ['concat', 'uglify', 'sass:dist', 'server', 'buildStatic']);

};
