'use strict';

var path = require('path')
, fs = require('fs')
, yo = {}
;

yo.srcDir = 'ng-app/'
yo.files = {}
yo.files.jade = ['**/*.jade']
yo.files.destDir = '.tmp/assets/html/'

module.exports = function(grunt){
  grunt.loadNpmTasks('grunt-contrib-jade')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-copy')

  grunt.initConfig({
    yo: yo
  , jade: {
      options:{
        debugInfo: true
      , pretty: true
      }
    , compile: {
        files: [{
          expand: true
        , dot: true
        , cwd: '<%= yo.srcDir %>'
        , src: '<%= yo.files.jade %>'
        , dest: '<%= yo.destDir %>'
        , ext: '.html'
        //, rename: flattenPathUniq
      }]
    }
   }
  , watch: {
      options: {
        nospawn: true
      , livereload: true
      }
    , jade: {
        files: ['<%= yo.srcDir %>/<%= yo.files.jade %>']
      , tasks: ['jade:compile']
      }
    }



  })
  // grunt.registerTask('jade', function(){

  //   console.log('jade build')
    
  // })

console.log(Object.keys(grunt))
console.log(grunt.config)

  grunt.registerTask('default', [
    'jade'
  , 'watch'
  ])

}