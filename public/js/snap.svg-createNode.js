// NODE WITH DETAILS ==========================================================

function createNode(uid) {

  var rect = paper.rect(0, 50, 50, 50, 5).attr({class: 'node'})
  var title = paper.text(0,20,'{title here}').attr({class: 'node-text', id:'text-title-'+uid})
  var url = paper.text(0,40,'URL: {url here}').attr({class: 'node-text', id:'text-url-'+uid})
  var g_details = paper.g(title, url).attr({id:'g-node_details-'+uid, class:'hide-text'})
  var g = paper.g()
  g.add(rect, g_details).attr({id:'g-node-'+uid, class:'g-node'})
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
