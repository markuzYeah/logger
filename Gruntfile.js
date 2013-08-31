'use strict';

var path = require('path')
, fs = require('fs')
, minimatch = require('minimatch')
, yo = {}
, _
;

yo.rootDir = __dirname
yo.logDir = path.join(__dirname, 'logs')







function walkDirSync (rootDir){
  // 
  // _ it's working here because of scoping rules, 
  // the _ is actually defined inside the module.exports function
  // nice trick, hum?
  //
  return _.flatten(fs.readdirSync(rootDir).map(function(file){
    file = path.join(rootDir, file);
    var stat = fs.statSync(file);
    if (stat.isDirectory()) {return walkDirSync(file);}
    return file;
  }));
}

module.exports = function(grunt){
  // 
  // this task symbolic link all assets to a specific location
  //
  
  _ = grunt.util._
  grunt.loadNpmTasks('grunt-shell')

  var rootDir = yo.rootDir
  , tasks = minimatch.match(walkDirSync(rootDir), rootDir +"/grunt-tasks/Gruntfile*", {matchBase: true})
  ;

  yo.tasks = minimatch.match(walkDirSync(rootDir), rootDir +"/grunt-tasks/Gruntfile*", {matchBase: true})


  grunt.initConfig({

    // shell: {
    //   options: {stdout: true}
    // , foreverStopall: {command: 'forever stopall'}
    // , lsDir: { command: 'ls' }
    // }

    shell: (function(){
      // 
      // this is a closure, normaly some crazy code follows ...
      //
      var retObj = {}
      ;
      retObj.options = {stdout: true}

      yo.tasks.forEach(function(task){
        var name = path.basename(task).split('.')[0]
//        retObj[name] = {command: 'forever start --minTime 1 --spinSleepTime 1000  -c sh sh/grunt.bash ' + task }
        // 
        // When grunt.task.run(['shell']) is executed, all forever jobs 
        retObj[name] = {
          command: [ 
            'forever'
          , 'start'
          , '--minUptime 1'
          , '--spinSleepTime 1000'
          , '-p '+ yo.logDir
          , '-l '+ path.join(yo.logDir, name) +'.for.log' 
          , '-o '+ path.join(yo.logDir, name) +'.out.log' 
          , '-e '+ path.join(yo.logDir, name) +'.err.log' 
          ,  '-c sh sh/grunt.sh'
          , task
          ].join(' ') 
        }

      })
      console.log(retObj)
      return retObj
    }())

  })


  grunt.registerTask('init', function(){
    console.log('just init cronjob grunt tasks')
  })

  grunt.registerTask('forever-jobs', function(){

    grunt.task.run([
      'shell'
    ])
  })

}