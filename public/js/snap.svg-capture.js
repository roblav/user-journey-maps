var socket = io();

$('#saveSVG #submit').on('click', function(){
  //Grab value from input
  var filename = $('#saveSVG input').val()
  // When submit button is clicked, save the canvas as a JSON file
  var data = paper.selectAll('.g-node, .arrow')
  //var data = paper.innerSVG()
  console.log(data)
  // Capture all svgSnap data
  socket.emit('saveUsermap--svg', data, filename);
})

$('#loadSVG #submit').on('click', function(){
  //Grab value from input
  var filename = $('#loadSVG input').val()
  // Capture all svgSnap data
  socket.emit('getUsermap--svg', filename);
})

socket.on('loadUsermap--svg', function (map) {
  //console.log(map);
  jsonToSnapSVG(map)
  //Convert the JSON data back into a Snap object
  //Load this back to the canvas
  //var g = paper.g()
  //g.add(data).attr({id:'g-usermap-1', class:'g-usermap'})
  //paper.append(data)
});
