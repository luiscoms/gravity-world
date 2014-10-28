module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: ['build'],
      fb: ['fb'],
      xdk: ['xdk'],
      dist: ['dist'],
      doc: ['doc'],
    },
    concat: {
      dist: {
        src: ['lib/melonJS-1.0.2.js', 'lib/plugins/*.js', 'js/game.js', 'js/resources.js','js/**/*.js','!js/social.js'],
        dest: 'build/js/app.js'
      },
      fb: {
        src: [
          'lib/melonJS-1.0.2.js', 'lib/plugins/*.js',
          'js/game.js', 'js/resources.js', 'js/**/*.js', 'js/social.js'
        ],
        dest: 'fb/js/app.js'
      }
    },
    copy: {
      build: {
        files: [{
          src: 'favicon.ico',
          dest: 'build/'
        },{
          src: 'css/index.css',
          dest: 'build/css/index.css'
        },{
          src: 'data/**/*',
          dest: 'build/'
        },{
          src: 'css/**/*',
          dest: 'build/'
        }]
      },
      fb: {
        files: [{
          expand: true,
          cwd: 'build/',
          src: ['favicon.ico', 'index.html', 'css/**/*', 'data/**/*', 'js/**/*'],
          dest: 'fb/'
        }]
      },
      xdk: {
        files: [{
          expand: true,
          cwd: './build/',
          src: ['css/**/*', 'data/**/*', 'js/**/*'],
          dest: 'xdk/',
          // filter: 'isFile',
        },{
          expand: true,
          flatten: true,
          src: ['cordova/android/**'],
          dest: 'xdk/assets/',
          filter: 'isFile',
        }]
      }
    },
    processhtml: {
      options: {
        strip: true,
        // process: true,
      },
      build: {
        options: {
          data: {
            title: 'My app',
            message: 'This is production distribution'
          }
        },
        files: {
          'build/index.html': ['index.html'],
          'build/validate/index.html': ['validate/index.html']
        }
      },
      xdk: {
        options: {
          strip: true,
        },
        files: {
          'xdk/index.html': ['index.html'],
        }
      }
    },
    uglify: {
      options: {
        report: 'min',
        preserveComments: 'some'
      },
      build: {
        files: {
          'build/js/app.min.js': [
            'build/js/app.js'
          ]
        }
      },
      fb: {
        files: {
          'fb/js/app.min.js': [
            'fb/js/app.js'
          ]
        }
      }
    },
    watch: {
      scripts: {
        files: ['js/*.js', 'js/**/*.js'],
        tasks: ['default'],
        options: {
          spawn: false,
        },
      },
    },
    jsdoc: {
        dist : {
            src: ['js/*.js', 'js/**/*.js', 'lib/melonJS-1.0.0.js'],
            options: {
                destination: 'doc'
            }
        }
    },
    notify: {
      build: {
        options: {
          message: 'Build completed'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.registerTask('fb', ['copy:fb', 'concat:fb', 'uglify:fb']);
  grunt.registerTask('xdk', ['copy:xdk', 'processhtml:xdk']);
  grunt.registerTask('build', ['clean', 'concat:dist', 'uglify:build', 'copy:build', 'processhtml:build', 'notify:build']);
  grunt.registerTask('default', ['build', 'xdk', 'fb']);
}
