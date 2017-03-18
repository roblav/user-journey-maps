// NODE WITH DETAILS ==========================================================

function createNode(uid) {

  var rect = paper.rect(0, 50, 50, 50, 5).attr({class: 'node'})
  var title = paper.text(0,20,'{title here}').attr({class: 'node-text', id:'text-title-'+uid})
  var url = paper.text(0,40,'URL: {url here}').attr({class: 'node-text', id:'text-url-'+uid})
  var g_details = paper.g(title, url).attr({id:'g-node_details-'+uid, class:'hide-text'})
  var g = paper.g()
  g.add(rect, g_details).attr({id:'g-node-'+uid, class:'g-node'}).drag()

  g.mouseover(function(e){
    //console.log(this)
    g_details.toggleClass("hide-text")
    g_details.toggleClass("show-text")
  }).mouseout(function(e){
    g_details.toggleClass("show-text")
    g_details.toggleClass("hide-text")
  })

  g.uid = uid

  return g

}
