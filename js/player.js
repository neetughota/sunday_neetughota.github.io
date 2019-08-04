
var showPlayerInfo = function(player){ 
  var playerName = player.name;
d3.json('Roster.json',function (data) {
  
  var filteredData =  data.players.filter(function(d) {  if( d.name == playerName) {return d};});
    

  var html = '<div class="row" style="margin-right: 15px;margin-left: 15px;">'+
            '<div class="col" style="max-width: 30%;"> <img style="height:200px" src = "' + filteredData[0]["imgURL"] +'"></img> </div>'+
            '<div class="col"> <div class="row"> <label>' + playerName +  '</label> </div> ' +
      '<div class="row"> <label> Position: ' + filteredData[0]["pos"] +  '</label> </div> ' +
      '<div class="row"> <label> Height : ' + filteredData[0]["hgt"] +  '</label> </div> ' +
      '<div class="row"> <label> Weight : ' + filteredData[0]["weight"] +  'lbs </label> </div> ' +
       '<div class="row"> <label> Born : ' + filteredData[0].born.loc + "-" + filteredData[0].born.year +  ' </label> </div> ' +
       '<div class="row"> <label> College : ' + filteredData[0]["college"] +  'lbs </label> </div> ' +
      '<div class="row"> <label> Draft : ' + filteredData[0].draft.year + ': Round -' + filteredData[0].draft.round + ': Pick -' + filteredData[0].draft.pick + ' </label> </div> ' +
        '</div>'+
      '<div class="col"> <div class="row"> <label>' + filteredData[0].injury.type +  '</label> </div> ' +
      '<div class="row"> <label> Games Remaining: ' + filteredData[0].injury.gamesRemaining +  '</label> </div> ' +
      '<div class="row"> <label> Contract Amt : $' + filteredData[0].contract.amount +  '</label> </div> ' +
      '<div class="row"> <label> Contract Expire : ' + filteredData[0].contract.exp +  '</label> </div> ' +
       '</div>'+
      '</div>';
   
   document.getElementById('playerInfo').insertAdjacentHTML('afterbegin',html);
  
   //document.write(html);
})
}
