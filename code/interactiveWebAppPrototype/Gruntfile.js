module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      custom: {
        expand: true,
        cwd: 'js/',
        src: [
          '**/*.js'
        ],
        dest: 'build/js'
      },
      jquery: {
        expand: true,
        cwd: 'node_modules/jquery/dist/',
        src: [
          'jquery.min.js'
        ],
        dest: 'build/js'
      },
      bootstrapJs: {
        expand: true,
        cwd: 'node_modules/bootstrap/',
        src: [
          'js/collapse.js',
          'js/transition.js'
        ],
        dest: 'build/'
      },
      bootstrapCss: {
        expand: true,
        cwd: 'node_modules/bootstrap/dist/',
        src: [
          'css/bootstrap.min.css'
        ],
        dest: 'build/'
      }
    },

    connect: {
      server: {
        options: {
          port: 3000,
          base: 'build/'
        }
      }
    },

    pug: {
      compile: {
        options: {
          pretty: true,
          data: {
            debug: false
          }
        },
        files: [{
          expand: true,
          ext: '.html',
          cwd: 'pug/',
          src: [
            '**/*.pug'
          ],
          dest: 'build/'
        }]
      }
    },

    sass: {
      options: {
        sourceMap: false,
        sourceComments: true
      },
      compile: {
        files: {
            'build/css/main.css': 'sass/main.scss'
        }
      }
    },

    watch: {
      src: {
        files: ['*.pug', 'js/main.js', 'sass/**/*.scss'],
        tasks: ['sass', 'pug'],
        options: {
          livereload: true
        }
      }
    },

  });


  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

  grunt.registerTask('default', ['sass', 'copy', 'pug', 'connect', 'watch']);
};
