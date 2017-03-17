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

  g.editActive = false

//On click get the coords of the rect
  g.mousedown(function(e){
    console.log(this.editActive)
    //this.matrix.e this.matrix.f
    //console.log(e)
    //this.toggle = !this.toggle
    //Select form
    var el = document.getElementById("node-details")
    //Get the current node-detail values and populate the form
    var url_val = url.node.innerHTML
    var title_val = title.node.innerHTML
    //console.log(el)
    var page_title = document.querySelector('input#js-page_title')
    page_title.value = title_val
    var page_url = document.querySelector('input#js-url')
    page_url.value = url_val.substr(5)
    //Get coords
    //var posX = e.target.x.baseVal.value + e.target.width.baseVal.value + 120
    //var posY = e.target.y.baseVal.value + 50
    //The CSS

    var posX = this.matrix.e + e.target.width.baseVal.value + 110
    var posY = this.matrix.f + 110

    //console.log(posX, posY)
    //Move form to start position
    el.style.left = posX+"px"
    el.style.top = posY+"px"
    el.classList.toggle("show-form")
    el.classList.toggle("hide-form")
    el.dataUID = uid
  })

  return g

}
