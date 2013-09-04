

'use strict';

angular.module('loggerApp')
  .factory('pieChart$', ['d3$', '$rootScope', function(d3$, $rootScope){
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
      else {
        var el = document.querySelectorAll(elem)[0];
        while  (el.hasChildNodes()){
          el.removeChild(el.lastChild)
        }
        svg.append('g')
      }
      
      d3.select(elem + ' g').attr("transform", "translate(" + width/2 + "," + height/2 + ")");

      var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

      var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

      var pie = d3.layout.pie()
        .sort(function(d){ return d.mem; })
        .value(function(d) { return d.mem; });

       var g = d3.select(elem + ' g').selectAll('.arc')
         .data(pie(data))
         .enter()
         .append("g")
         .attr("class", "arc");

        //console.log('pppp', g)

       g.append("path")
         .attr("d", arc)
         .attr('text-anchor', 'middle')
         .style("fill", function(d) { return color(d.data.kind); });

       g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function(d){ return d.data.kind})


      //console.log(svg)

    }



  }])