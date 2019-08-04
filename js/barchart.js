    function barchart(data , chartName, displayName ){  
  
      var margin = { top: 35, right: 0, bottom: 30, left: 40 };

  var width = 350 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;

  var svg = d3.select(chartName).append("svg")
      .attr("width", 350)
      .attr("height", 500)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        

   /*   const svg =  d3.select(chartName).append("svg").attr("width",350).attr("height",300);
      const width = svg.attr('width');
      const height = svg.attr('height');
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom; 
      const g = svg.append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);
 */
  var x = d3.scale.ordinal()
      .domain(data.map(function(d) { return d['name']; }))
      .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
      .domain([0, d3.max(data, function(d) { return d['value']; }) * 1.1])
      .range([height, 0]);


  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(x)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(y)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Stats");

  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "steelblue")
      .attr("x", function(d) { 
      return x(d.name); 
  })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { 
      return y(d.value); 
  })
      .attr("height", function(d) {
      return height - y(d.value);
  });

     
    };
