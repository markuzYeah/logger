
'use strict';

angular.module('loggerApp')
  .factory('d3$', [function () {
    // this is just a place holder. 
    return window.d3;
  }])
  .factory('pieChart$', ['d3$', function(d3$){


    return function(elem, data){
      var width = d3.select(elem)[0][0].clientWidth,
          height = d3.select(elem)[0][0].clientHeight,
          radius = Math.min(width, height) / 1.5;

      var svg = d3.select(elem)
        .attr("width", width)
        .attr("height", height);

      if (!svg[0][0].firstChild){
        svg.append('g')
      }
      
      d3.select(elem + ' g').attr("transform", "translate(" + width/2 + "," + height/2 + ")");

      var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

      var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

      var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.mem; });

       var g = d3.select(elem + ' g').selectAll('.arc')
         .data(pie(data))
         .enter()
         .append("g")
         .attr("class", "arc");

        //console.log('pppp', g)

       g.append("path")
         .attr("d", arc)
         .style("fill", function(d) { return color(d.data.kind); });

       g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")



      //console.log(svg)

    }



  }])