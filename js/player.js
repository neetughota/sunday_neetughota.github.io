
var showPlayerInfo = function(player){ 
  var playerName = player.Name;
d3.json('Roster.json',function (data) {
  
  var filteredData =  data.players.filter(function(d) {  if( d.name == playerName) {return d};});
   
	var div = document.getElementById("playerInfo");
while(div.firstElementChild){
    div.removeChild(div.firstElementChild);
}

	
	
  var html = '<div class="row" style="margin-right: 15px;margin-left: 15px;">'+
            '<div class="col" style="max-width: 30%;"> <img style="height:200px" src = "' + filteredData[0]["imgURL"] +'"></img> </div>'+
            '<div class="col" > <div id="chart"> </div> </div> ' +
      '<div class="col" > <div id="chart2"> </div> </div> ' +
      '<div class="col" > <div id="chart3"> </div> </div> ' +
      '<div class="col" > <div id="linechart"> </div> </div> ' +
      '</div>';
   
 
	
   document.getElementById('playerInfo').insertAdjacentHTML('afterbegin',html);
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
	
	 donut(newData_2, "#chart2", ["FT Made","2 Pt Made", "3 Pt Made"])
				      
				      
	 var newData_3 ={};
	
	newData_3["FGPt"] = parseInt(player["FGPt"]);
	
	newData_3["5TO9FGPt"] = parseInt(player["5TO9FGPt"]);
	newData_3["10TO14FGPt"=parseInt(player["10TO14FGPt"]) ;
	
	newData_3[ "15TO19FGPt"] =parseInt(player["15TO19FGPt"]);
	

	newData_3[ "20TO24FGPt"] = parseInt(player["20TO24FGPt"]);
	
	newData_3[ "25TO29FGPt"] = parseInt(player["25TO29FGPt"]);
	
	donut(newData_3, "#chart3", ["FG Pt","5TO9FGPt", "10TO14FGPt" ,"15TO19FGPt" ,"20TO24FGPt","25TO29FGPt"]);
	
	
	/*var newData_arr =[];
	 var newData_3 ={};
	newData_3.key = "FGPt";
	newData_3.value = parseInt(player["FGPt"]);
	newData_arr.push(newData_3);
	 var newData_3 ={};
	newData_3.key = "5TO9FGPt";
	newData_3.value =parseInt(player["5TO9FGPt"]);
	newData_arr.push(newData_3);
	 var newData_3 ={};
	newData_3.key = "10TO14FGPt";
	newData_3.value =parseInt(player["10TO14FGPt"]);
	newData_arr.push(newData_3);
	 var newData_3 ={};
	newData_3.key = "15TO19FGPt";
	newData_3.value =parseInt(player["15TO19FGPt"]);
	newData_arr.push(newData_3);
	 var newData_3 ={};
	newData_3.key = "20TO24FGPt";
	newData_3.value =parseInt(player["20TO24FGPt"]);
	newData_arr.push(newData_3);
	 var newData_3 ={};
	newData_3.key = "25TO29FGPt";
	newData_3.value =parseInt(player["25TO29FGPt"]);
	newData_arr.push(newData_3);
	barchart(newData_arr, "#chart3", ["FT Made","2 Pt Made", "3 Pt Made"]);
	*/
	
	
   //document.write(html);
})
}
