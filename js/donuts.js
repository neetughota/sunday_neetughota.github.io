function donut(player){  
  
  var playerName = player.Name;

  var newData ={};
	newData.FTA =  parseInt(player["FTA"]);
	newData["2PA"] = parseInt(player["2PA"]);
	newData["3PA"] = parseInt(player["3PA"]);
	
	
	
  // Default settings
  var $el = d3.select("body")
 
  // var showTitle = true;
  var width = 200,
      height = 400,
      radius = Math.min(width, height) / 2;

  var currentVal;
  var color = d3.scale.category20();
  var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.value; });

  var svg, g, arc; 


  var object = {};
    if(!svg){
      arc = d3.svg.arc()
      .outerRadius(radius)
      .innerRadius(radius - (radius/2.5));

      svg = $el.append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      g = svg.selectAll(".arc")
        .data(pie(d3.entries(newData)))
      .enter().append("g")
      .attr("class", "arc");

      g.append("path")
        // Attach current value to g so that we can use it for animation
        .each(function(d) { this._current = d; })
        .attr("d", arc)
        .style("fill", function(d) { return color(d.key); });
      g.append("text")
          .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .style("text-anchor", "middle");
      g.select("text").text(function(d) { return d.key; });

      svg.append("text")
          .datum(newData)
          .attr("x", 0 )
          .attr("y", 0 + radius/10 )
          .attr("class", "text-tooltip")        
          .style("text-anchor", "middle")
          .attr("font-weight", "bold")
          .style("font-size", radius/2.5+"px");

      g.on("mouseover", function(obj){
        console.log(obj)
        svg.select("text.text-tooltip")
        .attr("fill", function(d) { return color(obj.key); })
        .text(function(d){
          return d[obj.newData.key];
        });
      });

      g.on("mouseout", function(obj){
        svg.select("text.text-tooltip").text("");
      });

    }else{
      g.data(pie(d3.entries(newData))).exit().remove();

      g.select("path")
      .transition().duration(200)
      .attrTween("d", function(a){
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function(t) {
            return arc(i(t));
        };
      })

      g.select("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; });

      svg.select("text.text-tooltip").datum(newData);
    }      
 

  // Getter and setter methods
  object.newData = function(value){
    if (!arguments.length) return newData;
    newData = value;
    return object;
  };

  object.$el = function(value){
    if (!arguments.length) return $el;
    $el = value;
    return object;
  };

  object.width = function(value){
    if (!arguments.length) return width;
    width = value;
    radius = Math.min(width, height) / 2;
    return object;
  };

  object.height = function(value){
    if (!arguments.length) return height;
    height = value;
    radius = Math.min(width, height) / 2;
    return object;
  };

  return object;

        };
