function jsonToSnapSVG(map) {
  //console.log(map)
  //Loop over object
  var count = 0
  var nodeList = []
  for(var ele in map) {
    //console.log('map.' + ele, '=', map[ele]);
    //Find all map[ele].type == 'g'
    if(map[ele].type == 'g'){
      var transform = map[ele].attr.transform
      //Create a node
      nodeList.push(createNode(count).transform(transform))
    }
    else if(map[ele].type == 'path') {
      var directions = map[ele].attr.d
      nodeList.push(createArrow(directions))
    }
  }

  //Add all nodes to a group
  var g = paper.g()
  g.add(nodeList[0], nodeList[1], nodeList[2]).attr({id:'g-usermap-1'})
  g.drag()

  var bbox = g.getBBox();
  var attr = {
    "x": bbox.x,
    "y": bbox.y -5,
    "width": bbox.width,
    "height": bbox.height + 10,
    "class": 'g-usermap'
  }

  var headerAttr = {
    "x": bbox.x,
    "y": bbox.y-36,
    "width": bbox.width,
    "height": 30,
    "class": 'g-usermap--header'
  }

  console.log(headerAttr)

  var rect = paper.rect().attr(attr)
  nodeList[0].before(rect)
  var header = paper.rect().attr(headerAttr)

  var title = paper.text(bbox.x+5,bbox.y-16,'Overpayment').attr({class: 'g-usermap--title'})

  //Create drag handle icon
  var symbol_dragHandle = paper.symbol().attr({id:'dragHandle'});
  var GR_paths =  paper.g()
  var dragHandle = paper.path("M54,50 C54,47.790861 52.209139,46 50,46 C47.790861,46 46,47.790861 46,50 C46,52.209139 47.790861,54 50,54 C52.209139,54 54,52.209139 54,50 Z M54,30 C54,27.790861 52.209139,26 50,26 C47.790861,26 46,27.790861 46,30 C46,32.209139 47.790861,34 50,34 C52.209139,34 54,32.209139 54,30 Z M54,70 C54,67.790861 52.209139,66 50,66 C47.790861,66 46,67.790861 46,70 C46,72.209139 47.790861,74 50,74 C52.209139,74 54,72.209139 54,70 Z");
  GR_paths.add(dragHandle)
  symbol_dragHandle.add(GR_paths);
  var xPos = Math.round(bbox.x)+Math.round(bbox.width)-20
  var xPos2 = xPos-7
  var xPos3 = xPos2-7
  var yPos = bbox.y-36
  var iconTransform1 = 't'+xPos+','+yPos+' s0.3'
  var iconTransform2 = 't'+xPos2+','+yPos+' s0.3'
  var iconTransform3 = 't'+xPos3+','+yPos+' s0.3'

  var icon_dragHandle1 = paper.use('dragHandle').attr({"class": 'icon'}).transform(iconTransform1)
  var icon_dragHandle2 = paper.use('dragHandle').attr({"class": 'icon'}).transform(iconTransform2)
  var icon_dragHandle3 = paper.use('dragHandle').attr({"class": 'icon'}).transform(iconTransform3)
  var GR_icon =  paper.g()
  GR_icon.add(icon_dragHandle1, icon_dragHandle2, icon_dragHandle3)

  g.add(header, title, GR_icon)
}
