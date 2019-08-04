 function barchart(newData , chartName, displayName ){
	newData = newData.sort(function (a, b) {
            return d3.ascending(a.RatingValue, b.RatingValue);
        })
  	//data.sort(function(a, b) { return a.value - b.value; });
	var svg =  d3.select(chartName).append("svg").attr("width",560).attr("height",300),
    	margin = {top: 40, right: 20, bottom: 30, left: 80},
    	width = +svg.attr("width") - margin.left - margin.right,
   	 height = +svg.attr("height") - margin.top - margin.bottom;
  
	var tooltip = d3.select(chartName).append("div").attr("class", "toolTip");
 

	var g = svg.append("g")
		.attr("transform", "translate("+ margin.top + "," + margin.top  + ")");
  
 	 //var x = d3.scaleLinear().range([0, width]);
	//var y = d3.scaleBand().range([height, 0]).padding(.1);
	//var color = d3.scaleOrdinal(d3.schemeCategory10);
	
	 var x = d3.scale.linear()
            .range([0, width])
            .domain([0, d3.max(newData, function (d) {
                return d.value;
            })]);

        var y = d3.scale.ordinal()
            .rangeRoundBands([height, 0], .1)
            .domain(newData.map(function (d) {
                return d.key;
            }));


	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	  var yAxis = d3.svg.axis()
            .scale(y)
            //no tick marks
            .tickSize(0)
            .orient("left");
	
	
  	x.domain([0, d3.max(newData, function(d){ return  d.value ; })])
        y.domain(newData.map(function(d) { return d.key }));
 	//color.domain(newData.map(function(d) { return d.Rating }));
    
	g.append("g")
        .attr("class", "x axis")
       	.attr("transform", "translate(0," + height + ")")
      	.call(xAxis);

    	g.append("g")
        .attr("class", "y axis")
        .call(yAxis);

	 var bars = g.selectAll(".bar")
            .data(newData)
            .enter()
            .append("g");

	
   // g.selectAll(".bar")
    //        .data(newData)
     //       .enter()
      //      .append("g")
	 
      bars.append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("height", y.rangeBand())
        .attr("y", function(d) { return y(d.key); })
        .attr("width", function(d) { return x(d.value); })
	// .style('fill',function(d,i) {return color(i);})
        
	
	bars.append("text")
            .attr("class", "label")
            //y position of the label is halfway down the bar
            .attr("y", function (d) {
                return y(d.value) + y.rangeBand() / 2 + 4;
            })
            //x position is 3 pixels to the right of the bar
            .attr("x", function (d) {
                return x(d.value) + 3;
            })
            .text(function (d) {
                return d.value;
            })

}
