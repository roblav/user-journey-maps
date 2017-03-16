// Node Styles ======================================================

var label_style__bkg = toolbox.rect(0, 0, 100, 30, 0).attr({class: 'toolbox-label--bkg'})
var label_style__text = toolbox.text("50%", 15,'Styles').attr({class: 'toolbox-label--text'})

var style1 = toolbox.use("nodeTemplate").transform('t15,45 s0.5').attr({"data-style":"node--teal", class:"btn-style node node--teal"});
var style2 = toolbox.use("nodeTemplate").transform('t50,45 s0.5').attr({"data-style":"node--red", class:"btn-style node node--red"});
var style3 = toolbox.use("nodeTemplate").transform('t15,85 s0.5').attr({"data-style":"node--purple", class:"btn-style node node--purple"});
var style4 = toolbox.use("nodeTemplate").transform('t50,85 s0.5').attr({"data-style":"node--orange", class:"btn-style node node--orange"});

var styles = []
styles.push(style1, style2, style3, style4)
var colors = []
colors.push('teal','red','purple','orange')
var color
for(var i=0; i < 4; i++){
  var btn = styles[i]
  color = colors[i]
  console.log('Button is '+ btn)
  console.log('Color is '+ color)
  btn.mousedown(function(e){
    //What is current selected state
    this.color = color
    console.log(color)
    this.selected = this.selected ? true : false
    this.tempState = this.selected
    //Remove selected states for all buttons
    toolbox.selectAll(".btn-style").forEach(function(el) {
      el.removeClass('selected')
      el.selected = false
    })
    //Set this node to active
    this.selected = !this.tempState
    this.addClass('selected')
    //Set a mousedown event listener on all nodes
    //Grab set of all nodes
    var allNodes = paper.selectAll(".node")
    //Remove all current mousedownlisteners
    allNodes.forEach(function(el) {
      el.unmousedown()
    })

    //console.log(this)

    // Add mousedown event listener to all nodes
    allNodes.forEach(function(el) {
      el.mousedown(function(event){
        //console.log(this)
        this.attr({class:'node node--'+this.color})
      })
    })

  }).mouseover(function(){
    this.addClass('active')
  }).mouseout(function(){
    this.removeClass('active')
  })
}

var g_toggleBtn = toolbox.g()
g_toggleBtn.add(label_style__bkg, label_style__text, style1, style2, style3, style4).attr({id:'g-styleOptions'})

g_toggleBtn.transform('t0,460')
