
//For Steals
var populateTableSPG = function(val) {
var column_names = ["Player Name","Team","Position","Games Played","Steals Per Game"];
var clicks = {name: 0, team: 0, position: 0,games_played: 0,spg:0};

// draw the table
var margin = {top: 40, right: 20, bottom: 10, left: 10}
var width = 500 - margin.left - margin.right, height = 800 - margin.top - margin.bottom	
var svg = d3.select("body").select(".chartArea").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)      
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

var forobj = svg.append("foreignObject")
      .attr("width", 430)
      .attr("height", 740)
      .append("xhtml:body")

forobj.append("div")
	.attr("id", "container")
  	.attr("class","column")

d3.select("#container").append("div")
  .attr("id", "FilterableTable");

d3.select("#FilterableTable").append("div")
  .attr("class", "SearchBar")
  .append("p")
    .attr("class", "SearchBar")
    .text("Search By Player Name:");

d3.select(".SearchBar")
  .append("input")
    .attr("class", "SearchBar")
    .attr("id", "search")
    .attr("type", "text")
    .attr("placeholder", "Search...");
  
var table = d3.select("#FilterableTable").append("table");
table.append("thead").append("tr"); 

var headers = table.select("tr").selectAll("th")
    .data(column_names)
  .enter()
    .append("th")
    .text(function(d) { return d; });

var rows, row_entries, row_entries_no_anchor, row_entries_with_anchor;
  
d3.json("data.json", function(data) { // loading data from server
  
  // draw table body with rows
  table.append("tbody")

  // data bind
  rows = table.select("tbody").selectAll("tr")
    .data(data, function(d){ return d.Name; });
  
  // enter the rows
  rows.enter()
    .append("tr")
  
  // enter td's in each row
  row_entries = rows.selectAll("td")
      .data(function(d) { 
        var arr = [];
        for (var k in d) {
          if (d.hasOwnProperty(k)) {
		    arr.push(d[k]);
          }
        }
        return [arr[0],arr[1],arr[2],arr[4],arr[30]];
      })
    .enter()
      .append("td") 

  // draw row entries with no anchor 
  row_entries_no_anchor = row_entries.filter(function(d) {
    return (/https?:\/\//.test(d) == false)
  })
  row_entries_no_anchor.text(function(d) { return d; })

  // draw row entries with anchor
  row_entries_with_anchor = row_entries.filter(function(d) {
    return (/https?:\/\//.test(d) == true)  
  })
  row_entries_with_anchor
    .append("a")
    .attr("href", function(d) { return d; })
    .attr("target", "_blank")
  .text(function(d) { return d; })
    
    
  /**  search functionality **/
    d3.select("#search")
      .on("keyup", function() { // filter according to key pressed 
        var searched_data = data,
            text = this.value.trim();
        
        var searchResults = searched_data.map(function(r) {
          var regex = new RegExp("^" + text + ".*", "i");
          if (regex.test(r.Name)) { // if there are any results
            return regex.exec(r.Name)[0]; // return them to searchResults
          } 
        })
	    
	    // filter blank entries from searchResults
        searchResults = searchResults.filter(function(r){ 
          return r != undefined;
        })
        
        // filter dataset with searchResults
        searched_data = searchResults.map(function(r) {
           return data.filter(function(p) {
            return p.Name.indexOf(r) != -1;
          })
        })

        // flatten array 
		searched_data = [].concat.apply([], searched_data)
        
        // data bind with new data
		rows = table.select("tbody").selectAll("tr")
		  .data(searched_data, function(d){ return d.Name; })
		
        // enter the rows
        rows.enter()
         .append("tr");
         
        // enter td's in each row
        row_entries = rows.selectAll("td")
            .data(function(d) { 
              var arr = [];
              for (var k in d) {
                if (d.hasOwnProperty(k)) {
		          arr.push(d[k]);
                }
              }
              return [arr[0],arr[1],arr[2],arr[4],arr[30]];
            })
          .enter()
            .append("td") 

        // draw row entries with no anchor 
        row_entries_no_anchor = row_entries.filter(function(d) {
          return (/https?:\/\//.test(d) == false)
        })
        row_entries_no_anchor.text(function(d) { return d; })

        // draw row entries with anchor
        row_entries_with_anchor = row_entries.filter(function(d) {
          return (/https?:\/\//.test(d) == true)  
        })
        row_entries_with_anchor
          .append("a")
          .attr("href", function(d) { return d; })
          .attr("target", "_blank")
        .text(function(d) { return d; })
        
        // exit
        rows.exit().remove();
      })
	
  /**  sort functionality **/
  headers
    .on("click", function(d) {
      if (d == "Player Name") {
        clicks.name++;
        // even number of clicks
        if (clicks.name % 2 == 0) {
          // sort ascending: alphabetically
          rows.sort(function(a,b) { 
            if (a.Name.toUpperCase() < b.Name.toUpperCase()) { 
              return -1; 
            } else if (a.Name.toUpperCase() > b.Name.toUpperCase()) { 
              return 1; 
            } else {
              return 0;
            }
          });
        // odd number of clicks  
        } else if (clicks.name % 2 != 0) { 
          // sort descending: alphabetically
          rows.sort(function(a,b) { 
            if (a.Name.toUpperCase() < b.Name.toUpperCase()) { 
              return 1; 
            } else if (a.Name.toUpperCase() > b.Name.toUpperCase()) { 
              return -1; 
            } else {
              return 0;
            }
          });
        }
      } 
      if (d == "Position") {
        clicks.position++;
        // even number of clicks
        if (clicks.position % 2 == 0) {
          // sort ascending: alphabetically
          rows.sort(function(a,b) { 
            if (a.Position.toUpperCase() < b.Position.toUpperCase()) { 
              return -1; 
            } else if (a.Position.toUpperCase() > b.Position.toUpperCase()) { 
              return 1; 
            } else {
              return 0;
            }
          });
        // odd number of clicks  
        } else if (clicks.position % 2 != 0) { 
          // sort descending: alphabetically
          rows.sort(function(a,b) { 
            if (a.Position.toUpperCase() < b.Position.toUpperCase()) { 
              return 1; 
            } else if (a.Position.toUpperCase() > b.Position.toUpperCase()) { 
              return -1; 
            } else {
              return 0;
            }
          });
        }
      } 
    
      if (d == "Games Played") {
	    clicks.games_played++;
        // even number of clicks
        if (clicks.games_played % 2 == 0) {
          // sort ascending: numerically
          rows.sort(function(a,b) { 
            if (+a.GP < +b.GP) { 
              return -1; 
            } else if (+a.GP > +b.GP) { 
              return 1; 
            } else {
              return 0;
            }
          });
        // odd number of clicks  
        } else if (clicks.games_played % 2 != 0) { 
          // sort descending: numerically
          rows.sort(function(a,b) { 
            if (+a.GP < +b.GP) { 
              return 1; 
            } else if (+a.GP > +b.GP) { 
              return -1; 
            } else {
              return 0;
            }
          });
        }
      } 
	if (d == "Steals Per Game") {
	    clicks.spg++;
        // even number of clicks
        if (clicks.spg % 2 == 0) {
          // sort ascending: numerically
          rows.sort(function(a,b) { 
            if (+a.SPG < +b.SPG) { 
              return -1; 
            } else if (+a.SPG > +b.SPG) { 
              return 1; 
            } else {
              return 0;
            }
          });
        // odd number of clicks  
        } else if (clicks.spg % 2 != 0) { 
          // sort descending: numerically
          rows.sort(function(a,b) { 
            if (+a.SPG < +b.SPG) { 
              return 1; 
            } else if (+a.SPG > +b.SPG) { 
              return -1; 
            } else {
              return 0;
            }
          });
        }
      }  
          if (d == "Team") {
        clicks.team++;
        // even number of clicks
        if (clicks.team % 2 == 0) {
          // sort ascending: alphabetically
          rows.sort(function(a,b) { 
            if (a.Team.toUpperCase() < b.Team.toUpperCase()) { 
              return -1; 
            } else if (a.Team.toUpperCase() > b.Team.toUpperCase()) { 
              return 1; 
            } else {
              return 0;
            }
          });
        // odd number of clicks  
        } else if (clicks.team % 2 != 0) { 
          // sort descending: alphabetically
          rows.sort(function(a,b) { 
            if (a.Team.toUpperCase() < b.Team.toUpperCase()) { 
              return 1; 
            } else if (a.Team.toUpperCase() > b.Team.toUpperCase()) { 
              return -1; 
            } else {
              return 0;
            }
          });
        }
      }  
          
    }) // end of click listeners
});
}
