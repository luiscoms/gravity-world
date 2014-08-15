module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: ["build"],
      dist: ["dist"],
      doc: ["doc"],
    },
    concat: {
      dist: {
        src: ['lib/melonJS-1.0.0.js', 'lib/plugins/*.js', 'js/game.js', 'js/resources.js','js/**/*.js'],
        dest: 'build/js/app.js'
      }
    },
    copy: {
      dist: {
        files: [{
          src: 'css/index.css',
          dest: 'build/css/index.css'
        },{
          src: 'data/**/*',
          dest: 'build/'
        },{
          src: 'css/**/*',
          dest: 'build/'
        }]
      }
    },
    processhtml: {
      dist: {
        options: {
          process: true,
          data: {
            title: 'My app',
            message: 'This is production distribution'
          }
        },
        files: {
          'build/index.html': ['index.html']
        }
      }
    },
    uglify: {
      options: {
        report: 'min',
        preserveComments: 'some'
      },
      dist: {
        files: {
          'build/js/app.min.js': [
            'build/js/app.js'
          ]
        }
      }
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
      buid: {
        options: {
          message: 'Buid completed'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.registerTask('default', ['clean', 'concat', 'uglify', 'copy', 'processhtml', 'notify:buid']);
}
