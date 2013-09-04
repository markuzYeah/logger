'use strict';

function freeMemChart(){

}

angular.module('loggerApp')
  .controller('MainCtrl', ['$scope', 'socket$', 'd3$', 'pieChart$', function ($scope, socket$, d3$, pieChart$) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'sass',
      'Compass',
      'Foundation 4',
      'AngularJS',
      'Karma',
      'express',
      'socket.io',
      'd3.js'
    ];

    //var socket = io.connect('http://' + (location.hostname || 'localhost'));
    socket$.on('datum', function(rawData){
      //console.log(rawData)

      var pieDataRand = [
        { 'mem' : rawData.freemem/Math.pow(10, 9) + (Math.random()*10), kind: 'free'},
        { 'mem' : (rawData.totalmem - rawData.freemem)/Math.pow(10, 9) + (Math.random() * 10), kind: 'used'}
      ]

      // console.log('RRRRR', pieDataRand)

      // pieChart$('#memory svg', pieDataRand)

      var pieData = [
        { 'mem' : rawData.freemem/Math.pow(10, 9), kind: 'free'},
        { 'mem' : (rawData.totalmem - rawData.freemem)/Math.pow(10, 9), kind: 'used'}
      ]

      console.log('RRRRR', pieData)

      pieChart$('#memory svg', pieDataRand)
      //console.log('total mem', rawData.totalmem/Math.pow(10, 9))
      //console.log('free mem', rawData.freemem/Math.pow(10, 9))
      //console.log('used mem', (rawData.totalmem - rawData.freemem)/Math.pow(10, 9))
    })
  }]);
