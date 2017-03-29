// CREATE A MARKER ARROW ==========================================================

var arrowMarker = paper.path("M10,10 l-10,-10 l12,10 l-12,10").attr({class: "arrow"}).transform("scale(0.2)")
var marker = arrowMarker.marker(0,0, 15,15, 2,2)

paper.mousedown(function(obj){
  //console.log(obj)
  if(makeArrow.active) {
    //Get start point for path
    var xStart = obj.offsetX
    var yStart = obj.offsetY
    //console.log(xStart, yStart)
    instruction = "M"+xStart+" "+yStart+"L90 90"

    //Create arrow
    //p1 = makeArrow.draw(instruction)
    //var cords = obj.offsetX +","+ obj.offsetY
    startDrawing(obj)
    //p2 = paper.line(cords).attr({class:"arrow"});
  }
})

//Create an arrow using the mouse
paper.mousemove(function(obj){
  //console.log(obj)
  //Change the end point of the arrow
  //Get start point for path
  var xEnd = obj.offsetX
  var yEnd = obj.offsetY
  //Get p1
  if(typeof p2 !== 'undefined'){
    console.log(p2)
    p2.attr({
      x2:xEnd,
      y2:yEnd
    });
  }
})

function startDrawing(event) {
  //var cords = obj.offsetX +","+ obj.offsetY
  //console.log(event.offsetX, event.offsetY)
  path = paper.line(event.offsetX, event.offsetY, event.offsetX, event.offsetY).attr({class:"arrow", markerEnd:marker});
  paper.mousemove(function(obj){ updateDrawing(obj) })
  paper.mouseup(function(obj){ stopDrawing(obj) })
  //paper.mouseout(function(obj){ stopDrawing(obj) })
}
// UPDATE DRAWING ========================================================
function updateDrawing(obj) {
  //path.addPoint(Point.parse(event));
  //Get end point for path
  var xEnd = obj.offsetX
  var yEnd = obj.offsetY
  path.attr({ x2:xEnd, y2:yEnd });
}

// STOP DRAWING ==========================================================
function stopDrawing(event) {
  //Get end point for path
  //remove event listner
  paper.unmousemove()
  paper.unmouseup()
  //paper.unmouseout()
  //console.log(event.offsetX, event.offsetY)
  var xEnd = event.offsetX
  var yEnd = event.offsetY
  path.attr({ x2:xEnd, y2:yEnd });
}
