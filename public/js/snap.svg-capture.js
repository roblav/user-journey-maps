var socket = io();

// When submit button is clicked

$('#submit').on('click', function(){
  var data = paper.toJSON()
  // Capture all svgSnap data
  socket.emit('usermaps--svg', data);
})
