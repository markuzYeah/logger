'use strict';

var path = require('path')
, fs = require('fs')
, yo = {}
;

yo = {
  destDir: 'a'
, srcDir: 'ng-app'
, files: {
    main: {
      sass: ['']
    }
  }
}

module.exports = function(grunt){
  grunt.loadNpmTasks('grunt-contrib-sass')

  grunt.registerTask('sass', function(){
    console.log('LOG: sass build')
    console.warn('WARN: sass build')
    console.error('ERROR: sass build')
    process.exit(1222)
  })

  grunt.registerTask('default', ['sass'])

  // grunt.initConfig({
  //   yo: yo
  // , sass: {
  //     options: {
  //       trace: true
  //     , compass: true
  //     , lineNumbers: false
  //     , cacheLocation:'<%= yo.destDir %>/.sass-cache'
  //     }
  //   , compile: {
  //       files:[{
  //         expand: true
  //       , dot: true
  //       , cwd: '<%= yo.srcDir %>'
  //       , src: '<%= yo.files.main.sass %>'
  //       , dest: '<%= yo.destDir %>'
  //       , ext: '.css'
  //       }]
  //     }
  //   }
  // })


}