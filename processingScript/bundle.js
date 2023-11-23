(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function(){
    var req = new XMLHttpRequest();
    req.open("GET",'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json', true);
    req.send();
    req.onload=function(){
       var dataset = JSON.parse(req.responseText);
      //d3.js code start
  var width = window.innerWidth;
  var height = window.innerHeight;
  var marginTop = 50;
  var marginRight =40;
  var marginBottom = 40;
  var marginLeft = 80;

    var x = d3.scaleTime()
                .domain(d3.extent(dataset,function (d){ return new Date(("" + (d.Year))); }))
                .range([marginLeft+15, width-marginRight]).nice();
      
      var formatTime  = d3.timeFormat("%M:%S");
      var yTime =  function (d) { return new Date(("2023-05-31T18:" + (d.Time) + ".788Z")); };
      
      var y = d3.scaleTime()
       .domain([d3.max(dataset,yTime),d3.min(dataset,yTime)])
       .range([height - marginBottom, marginTop]); 
      
      
      var svg = d3.create('svg')
      .attr("width", width)
      .attr("height", height);
      
       svg.append("g")
    .attr("transform", ("translate(0," + (height - marginBottom) + ")"))
    .call(d3.axisBottom(x));
      
      svg.append("g")
    .attr("transform", ("translate(" + marginLeft + ",0)"))
    .call(d3.axisLeft(y).tickFormat(formatTime));

     svg.selectAll('circle')
        .data(dataset)
        .join('circle')
        .attr('cx', function (d) { return x(new Date(("" + (d.Year)))); })
        .attr('cy', function (d) { return y(yTime(d)); })
        .attr('r', 6)
        .style("fill", function (d) { return d.Doping.valueOf() == "" ? 'green':'red'; })
        .style("opacity", "0.5")
        .attr("stroke", "blue")
        .append("title")
    .text(function (d) { return ((d.Name) + ":" + (d.Nationality) + "\n  Year:" + (d.Year) + ", Time:" + (d.Time) + "\n  " + (d.Doping)); });
      
  var newgroups = ["No doping allegations", "Riders with doping allegations"];

  svg.selectAll("rect")
  .data(newgroups)
  .join("rect")
  .attr("height", 20)
  .attr("width", 20)
  .attr("x", function (d,i) { return 1100; })
  .attr("y",function (d,i) { return 200+24*i; })
  .style("fill", function (d) { return d.valueOf() == "No doping allegations" ? 'green':'red'; }) 
  .style("opacity", "0.7")
  .attr("stroke", "black");
      
   svg.selectAll("labels")
  .data(newgroups)
  .enter()
  .append("text")
  .attr("x", function (d, i) { return 900-50*(i-1); })
  .attr("y", function (d, i) { return 212+24*i; })
  .style("fill", function (d) { return "black"; })
  .text(function (d) { return d; })
  .attr("text-anchor", "right")
  .style("font-size", "70%");
      
  // add x axis label
  svg.append("text")
  .attr("text-anchor", "middle")
  .attr("x", width/2)
  .attr("y", height -10)
  .style("font-size", "15px")
  .text("Years");
      
  // add y axis label:
  svg.append("text")
  .attr("text-anchor", "middle")
  .attr("x", -height / 2)
  .attr("y", 35)
  .text("Time in minutes")
  .style("font-size", "15px")
  .attr("transform", "rotate(-90)");

  //Graph Title
  svg.append("text")
  .attr("x", width / 2+20)
  .attr("y", 30)
  .attr("text-anchor", "middle")
  .text("Doping in Professional Bicycle Racing")
  .style("font-size", "25px");
      
  svg.append("text")
  .attr("x", width / 2+20)
  .attr("y", 50)
  .attr("text-anchor", "middle")
  .text("35 Fastest times up Alpe d'Huez")
  .style("font-size", "15px");
      //d3.js code end
         container.append(svg.node());
    };
  });

})();
//# sourceMappingURL=bundle.js.map
