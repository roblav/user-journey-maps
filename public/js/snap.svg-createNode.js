// NODE WITH DETAILS ==========================================================

function createNode(uid) {

  var rect = paper.rect(0, 50, 50, 50, 5).attr({class: 'node'})
  var title = paper.text(0,20,'{title here}').attr({class: 'node-text', id:'text-title-'+uid})
  var url = paper.text(0,40,'URL: {url here}').attr({class: 'node-text', id:'text-url-'+uid})
  var g_details = paper.g(title, url).attr({id:'g-node_details-'+uid, class:'hide-text'})
  var g = paper.g()
  g.add(rect, g_details).attr({id:'g-node-'+uid, class:'g-node'})

  var nodeJoinsNamesList = ["nodejoin1","nodejoin2","nodejoin3","nodejoin4"]
  var nodeJoinsDirection = ["up","right","down","left"]
  var nodeJoinsCoordsList = [
    {x:25,y:0},
    {x:50,y:25},
    {x:25,y:50},
    {x:0,y:25}
  ]

  // Create 4 node-joins
  for(var i=0; i<4;i++){
    nodeJoinsNamesList[i] = paper.use('nodeJoin').attr({class: 'node-join'});
    nodeJoinsNamesList[i].attr({'data-dir': nodeJoinsDirection[i] });
    //console.log(nodeJoinsNamesList[i])
    var xPos = nodeJoinsCoordsList[i].x + rect.node.x.baseVal.value
    var yPos = nodeJoinsCoordsList[i].y + rect.node.y.baseVal.value
    nodeJoinsNamesList[i].transform('t'+xPos+','+yPos)
    g.add(nodeJoinsNamesList[i])
    setMouseEvents(nodeJoinsNamesList[i])
  }

  function setMouseEvents(node){
    //Find the coords of the node
    //This will be a combination of the transform on the group
    // and the transform on the node
    node.mousedown(function(e){
      //console.log(node.node.dataset.dir)
      var dir = node.node.dataset.dir
      var targetX = e.target.transform.baseVal[0].matrix.e
      var targetY = e.target.transform.baseVal[0].matrix.f
      var groupX = e.target.parentNode.transform.baseVal[0].matrix.e
      var groupY = e.target.parentNode.transform.baseVal[0].matrix.f
      var startPos = {
        x: targetX + groupX,
        y: targetY + groupY
      }
      //This is the starting point of our node
      //console.log(targetX, groupX, targetY, groupY)
      startArrow(e, startPos, dir)
    });
  }

  var gridSize = 25
  g_tObj = g.transform()

  var orig = {
    x:g_tObj.globalMatrix.e,
    y:g_tObj.globalMatrix.f
  }
  g.drag(
    function (dx, dy, x, y, e) {
      //console.log(dx, dy, x, y, e)
      var xSnap = Snap.snapTo(gridSize, orig.x + dx, 100000000);
      var ySnap = Snap.snapTo(gridSize, orig.y + dy, 100000000);
      //Get the group
      g.transform('t'+xSnap+','+ySnap)
      //console.log(xSnap,ySnap)
    },
    function (x, y, e) {
      //console.log(e)
      orig.x = e.target.parentElement.transform.baseVal[0].matrix.e;
      orig.y = e.target.parentElement.transform.baseVal[0].matrix.f;
    }
  )

  g.mouseover(function(e){
    //console.log(orig.x,orig.y)
    g_details.toggleClass("hide-text")
    g_details.toggleClass("show-text")
  }).mouseout(function(e){
    g_details.toggleClass("show-text")
    g_details.toggleClass("hide-text")
  })

  g.uid = uid

  return g

}

function startArrow(e, startPos, dir){
  //console.log(startPos, dir)
  //var instructions = posX, posY, posX, posY
  //console.log(instruction)
  var arrow = paper.line(startPos.x, startPos.y, startPos.x, startPos.y).attr({class:"dashed", markerEnd:markerRed});
  paper.mousemove(function(ev){ updateArrow(ev, arrow) })
  paper.mouseup(function(ev){ stopArrow(ev, arrow, startPos, dir) })
}
// UPDATE DRAWING ========================================================
function updateArrow(ev, arrow) {
  //path.addPoint(Point.parse(event));
  //Get end point for path
  var xEnd = ev.offsetX
  var yEnd = ev.offsetY
  arrow.attr({ x2:xEnd, y2:yEnd });
}
// STOP DRAWING ==========================================================
function stopArrow(ev, arrow, startPos, dir) {
  //Is the mouse over a node?
  //console.log(node2.getBBox())
  var isOverNode = overNode({ x:ev.offsetX, y:ev.offsetY })
  console.log(isOverNode)
  //Get end point for path
  //remove event listner
  if(isOverNode){
    var endPos = {
      x: ev.offsetX,
      y: ev.offsetY
    }
    arrow.attr({ x2:endPos.x, y2:endPos.y });
    //Make path to join nodes
    //function getDirections(dir)
    var directions = getDirections(dir,startPos,endPos)
    var p1 = paper.path(directions).attr({class:"arrow", markerEnd:marker});
    arrow.remove()
  }
  else {
    arrow.remove()
  }
  paper.unmousemove()
  paper.unmouseup()
}

function overNode(mosPos){
  //Get a list of all node bounding boxes
  //Loop over nodeList and display the BB values
  nodeList = paper.selectAll(".g-node")
  var result = false
  nodeList.forEach(function(node){
    //console.log(node.getBBox(), mosPos.x, mosPos.y)
    //For each node check if the mousePos is within the BB
    if( between(mosPos.x, node.getBBox().x, node.getBBox().x2) && between(mosPos.y, node.getBBox().y, node.getBBox().y2)){
      result = true
    }
  })
  return result
}

function between(x, min, max) {
  console.log(x, min, max)
  return x >= min && x <= max;
}

function getDirections(startDirection,startPos,endPos) {
  //Only use the mid point if the startPos and endPos
  //If startPos.x is === to endPos.x the line is vertical
  //If startPos.y is === to endPos.y the line is horizontal
  var i = 0
  var padding
  //Set the padding dependant on the direction
  switch(startDirection){
    case 'up':
      padding = i
      break;
    case 'right':
      padding = i
      break;
    case 'down':
      padding = -i
      break;
    case 'left':
      padding = i
      break;
    deafult:
      padding = i
  }
  var midPoint = ""
  var startPoint = "M"+startPos.x+" "+startPos.y
  var endPoint = "L"+endPos.x+" "+endPos.y
  if( Math.abs(startPos.x - endPos.x) < 10 ){
    //Vertical
    endPoint = "V"+(+endPos.y+padding)
  } else if( Math.abs(startPos.y - endPos.y) < 10 ){
    //Horizontal
    endPoint = "H"+(+endPos.x+padding)
  } else if(startDirection=='up' || startDirection=='down'){
    midPoint = "V"+(+endPos.y+padding)
    endPoint = "H"+endPos.x
  } else{
    midPoint = "H"+endPos.x
    endPoint = "V"+(+endPos.y+padding)
  }
  return startPoint+midPoint+endPoint
}
