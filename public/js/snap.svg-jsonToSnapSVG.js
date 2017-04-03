function jsonToSnapSVG(map) {
  console.log(map)
  //Loop over object
  var count = 0
  var nodeList = []
  for(var ele in map) {
    console.log('map.' + ele, '=', map[ele]);
    //Find all map[ele].type == 'g'
    if(map[ele].type == 'g'){
      var transform = map[ele].attr.transform
      //Create a node
      nodeList.push(createNode(count).transform(transform))
    }
    //Find all map[ele].type == 'g'

  }

  //Add all nodes to a group
  var g = paper.g()
  g.add(nodeList[0], nodeList[1]).attr({id:'g-usermap-1', class:'g-usermap'})

  //Find all rects
}
