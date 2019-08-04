
var showPlayerInfo = function(player){ 
  var playerName = player.Name;
d3.json('Roster.json',function (data) {
  
  var filteredData =  data.players.filter(function(d) {  if( d.name == playerName) {return d};});
    
d3.select("body").select("#playerInfo")  
 .append("svg")
 .attr("width", width + margin.left + margin.right)
 .attr("height", height + 100 + margin.top + margin.bottom)
 .append("g").attr("id","svg2")
 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");	

	
  var html = '<div class="row" style="margin-right: 15px;margin-left: 15px;">'+
            '<div class="col" style="max-width: 30%;"> <img style="height:200px" src = "' + filteredData[0]["imgURL"] +'"></img> </div>'+
            '<div class="col" > <div id="chart"> </div> </div> ' +
      '<div class="col" > <div id="chart2"> </div> </div> ' +
      '<div class="col" > <div id="chart3"> </div> </div> ' +
            '<div class="col" > <div id="linechart"> </div> </div> ' 
      '</div>';
   
  var div = document.getElementById('playerInfo');
while(div.firstElementChild){
    div.removeChild(div.firstElementChild);
}
	var svgid = document.getElementById("svg2")
    svgid.insertAdjacentHTML('afterbegin',html);
	
 //  document.getElementById('playerInfo').insertAdjacentHTML('afterbegin',html);
   displayLineChart (player);
	 var newData ={};
	newData.FTA =  parseInt(player["FTA"]);
	newData["2PA"] = parseInt(player["2PA"]);
	newData["3PA"] = parseInt(player["3PA"]);
	
	 donut(newData, "#chart", ["FT Attemps","2 Pt Attemps", "3 Pt Attemps"]);
	
	 var newData_2 ={};
	newData_2.FTM =  parseInt(player["FTM"]);
	newData_2["2PM"] = parseInt(player["2PM"]);
	newData_2["3PM"] = parseInt(player["3PM"]);
	
	 donut(newData_2, "#chart2", ["FT Made","2 Pt Made", "3 Pt Made"]);
	var newData_arr =[];
	 var newData_3 ={};
	newData_3.name = ["FGPt"];
	newData_3.value = parseInt(player["FGPt"]);
	newData_arr.push(newData_3);
	 var newData_3 ={};
	newData_3.name = "5TO9FGPt";
	newData_3.value =parseInt(player["5TO9FGPt"]);
	newData_arr.push(newData_3);
	 var newData_3 ={};
	newData_3.name = "10TO14FGPt";
	newData_3.value =parseInt(player["10TO14FGPt"]);
	newData_arr.push(newData_3);
	 var newData_3 ={};
	newData_3.name = "15TO19FGPt";
	newData_3.value =parseInt(player["15TO19FGPt"]);
	newData_arr.push(newData_3);
	 var newData_3 ={};
	newData_3.name = "20TO24FGPt";
	newData_3.value =parseInt(player["20TO24FGPt"]);
	newData_arr.push(newData_3);
	 var newData_3 ={};
	newData_3.name = "25TO29FGPt";
	newData_3.value =parseInt(player["25TO29FGPt"]);
	newData_arr.push(newData_3);
	barchart(newData_arr, "#chart3", ["FT Made","2 Pt Made", "3 Pt Made"]);
	
	
	
   //document.write(html);
})
}
