
var showPlayerInfo = function(player){ 
  var playerName = player.Name;
d3.json('Roster.json',function (data) {
  
  var filteredData =  data.players.filter(function(d) {  if( d.name == playerName) {return d};});
    

  var html = '<div class="row" style="margin-right: 15px;margin-left: 15px;">'+
            '<div class="col" style="max-width: 30%;"> <img style="height:200px" src = "' + filteredData[0]["imgURL"] +'"></img> </div>'+
            '<div class="col" > <div id="linechart"> </div> </div> ' 
            '<div class="col" > <div id="chart"> </div> </div> ' 
      '</div>';
   
  var div = document.getElementById('playerInfo');
while(div.firstElementChild){
    div.removeChild(div.firstElementChild);
}
   document.getElementById('playerInfo').insertAdjacentHTML('afterbegin',html);
  
   //document.write(html);
})
}
