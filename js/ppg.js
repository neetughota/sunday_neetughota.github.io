var populateTablePPG = function(val) {
var column_names = ["Player Name","Team","Position","Age","Games Played","Minutes Per Game","Usage Percentage","Offensive Rating","Defensive Rating","Points Per Game","Assists Per Game","Rebounds Per Game","Steals Per Game"];
var clicks = {name: 0, team: 0, position: 0,games:0,ppg:0,age:0,mpg:0,uper:0,offrating:0,defrating:0,apg:0,rpg:0,spg:0};
// draw the table
var margin = {top: 10, right: 10, bottom: 10, left: 10}
var width =  1500 - margin.left - margin.right, height = 400 - margin.top - margin.bottom	
var svg = d3.select("body").select(".chartArea").append("svg")
      	.attr("width", width + margin.left + margin.right)
      	.attr("height", height + margin.top + margin.bottom) 
	.style("background","rgba(76, 175, 80, 0.1)")
      	.append("g")
      	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

var forobj = svg.append("foreignObject")
      	.attr("width", width)
      	.attr("height", height)
	.style("background","rgba(76, 175, 80, 0.1)")
      	.append("xhtml:body")

forobj.append("div")
	.attr("id", "container")
  	.attr("class","column")
	
d3.select("#container").append("div")
  	.attr("id", "FilterableTable")
  
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
        return [arr[0],arr[1],arr[2],arr[3],arr[4],arr[5],arr[7],arr[9],arr[10],arr[25],arr[28],arr[26],arr[30]];
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
              return [arr[0],arr[1],arr[2],arr[3],arr[4],arr[5],arr[7],arr[9],arr[10],arr[25],arr[28],arr[26],arr[30]];
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
	if (d == "Points Per Game") {
	    clicks.ppg++;
        // even number of clicks
        if (clicks.ppg % 2 == 0) {
          // sort ascending: numerically
          rows.sort(function(a,b) { 
            if (+a.PPG < +b.PPG) { 
              return -1; 
            } else if (+a.PPG > +b.PPG) { 
              return 1; 
            } else {
              return 0;
            }
          });
        // odd number of clicks  
        } else if (clicks.ppg % 2 != 0) { 
          // sort descending: numerically
          rows.sort(function(a,b) { 
            if (+a.PPG < +b.PPG) { 
              return 1; 
            } else if (+a.PPG > +b.PPG) { 
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
//age
if (d == "Age") {
	    clicks.age++;
        // even number of clicks
        if (clicks.age % 2 == 0) {
          // sort ascending: numerically
          rows.sort(function(a,b) { 
            if (+a.Age < +b.Age) { 
              return -1; 
            } else if (+a.Age > +b.Age) { 
              return 1; 
            } else {
              return 0;
            }
          });
        // odd number of clicks  
        } else if (clicks.age % 2 != 0) { 
          // sort descending: numerically
          rows.sort(function(a,b) { 
            if (+a.Age < +b.Age) { 
              return 1; 
            } else if (+a.Age > +b.Age) { 
              return -1; 
            } else {
              return 0;
            }
          });
        }
      }  
 
//Games Played
if (d == "Games Played") {
	    clicks.games++;
        // even number of clicks
        if (clicks.games % 2 == 0) {
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
        } else if (clicks.games % 2 != 0) { 
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
//MPG
if (d == "Minutes Per Game") {
	    clicks.mpg++;
        // even number of clicks
        if (clicks.mpg % 2 == 0) {
          // sort ascending: numerically
          rows.sort(function(a,b) { 
            if (+a.MPG < +b.MPG) { 
              return -1; 
            } else if (+a.MPG > +b.MPG) { 
              return 1; 
            } else {
              return 0;
            }
          });
        // odd number of clicks  
        } else if (clicks.mpg % 2 != 0) { 
          // sort descending: numerically
          rows.sort(function(a,b) { 
            if (+a.MPG < +b.MPG) { 
              return 1; 
            } else if (+a.MPG > +b.MPG) { 
              return -1; 
            } else {
              return 0;
            }
          });
        }
      }  
//Usage
	  if (d == "Usage Percentage") {
	    clicks.uper++;
        // even number of clicks
        if (clicks.uper % 2 == 0) {
          // sort ascending: numerically
          rows.sort(function(a,b) { 
            if (+a.UsagePt < +b.UsagePt) { 
              return -1; 
            } else if (+a.UsagePt > +b.UsagePt) { 
              return 1; 
            } else {
              return 0;
            }
          });
        // odd number of clicks  
        } else if (clicks.uper % 2 != 0) { 
          // sort descending: numerically
          rows.sort(function(a,b) { 
            if (+a.UsagePt < +b.UsagePt) { 
              return 1; 
            } else if (+a.UsagePt > +b.UsagePt) { 
              return -1; 
            } else {
              return 0;
            }
          });
        }
      }  
//OffRating
	  if (d == "Offensive Rating") {
	    clicks.offrating++;
        // even number of clicks
        if (clicks.offrating % 2 == 0) {
          // sort ascending: numerically
          rows.sort(function(a,b) { 
            if (+a.OffRating < +b.OffRating) { 
              return -1; 
            } else if (+a.OffRating > +b.OffRating) { 
              return 1; 
            } else {
              return 0;
            }
          });
        // odd number of clicks  
        } else if (clicks.offrating % 2 != 0) { 
          // sort descending: numerically
          rows.sort(function(a,b) { 
            if (+a.OffRating < +b.OffRating) { 
              return 1; 
            } else if (+a.OffRating > +b.OffRating) { 
              return -1; 
            } else {
              return 0;
            }
          });
        }
      }  
	  
//Def Rating
if (d == "Defensive Rating") {
	    clicks.defrating++;
        // even number of clicks
        if (clicks.defrating % 2 == 0) {
          // sort ascending: numerically
          rows.sort(function(a,b) { 
            if (+a.DefRating < +b.DefRating) { 
              return -1; 
            } else if (+a.DefRating > +b.DefRating) { 
              return 1; 
            } else {
              return 0;
            }
          });
        // odd number of clicks  
        } else if (clicks.defrating % 2 != 0) { 
          // sort descending: numerically
          rows.sort(function(a,b) { 
            if (+a.DefRating < +b.DefRating) { 
              return 1; 
            } else if (+a.DefRating > +b.DefRating) { 
              return -1; 
            } else {
              return 0;
            }
          });
        }
      }  
//APG
if (d == "Assists Per Game") {
	    clicks.apg++;
        // even number of clicks
        if (clicks.apg % 2 == 0) {
          // sort ascending: numerically
          rows.sort(function(a,b) { 
            if (+a.APG < +b.APG) { 
              return -1; 
            } else if (+a.APG > +b.APG) { 
              return 1; 
            } else {
              return 0;
            }
          });
        // odd number of clicks  
        } else if (clicks.apg % 2 != 0) { 
          // sort descending: numerically
          rows.sort(function(a,b) { 
            if (+a.APG < +b.APG) { 
              return 1; 
            } else if (+a.APG > +b.APG) { 
              return -1; 
            } else {
              return 0;
            }
          });
        }
      }  
//RPG
if (d == "Rebounds Per Game") {
	    clicks.rpg++;
        // even number of clicks
        if (clicks.rpg % 2 == 0) {
          // sort ascending: numerically
          rows.sort(function(a,b) { 
            if (+a.RPG < +b.RPG) { 
              return -1; 
            } else if (+a.RPG > +b.RPG) { 
              return 1; 
            } else {
              return 0;
            }
          });
        // odd number of clicks  
        } else if (clicks.rpg % 2 != 0) { 
          // sort descending: numerically
          rows.sort(function(a,b) { 
            if (+a.RPG < +b.RPG) { 
              return 1; 
            } else if (+a.RPG > +b.RPG) { 
              return -1; 
            } else {
              return 0;
            }
          });
        }
      }  
//SPG
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
    }) // end of click listeners
// table row click

table.selectAll("tr").on("click",function(d,i){	
	 showPlayerInfo(d);
	 displayLineChart (d);
	return;
    	});

});
}

