// Node Styles ======================================================

var label_style__bkg = toolbox.rect(0, 0, 100, 30, 0).attr({class: 'toolbox-label--bkg'})
var label_style__text = toolbox.text("50%", 15,'Styles').attr({class: 'toolbox-label--text'})

var style1 = createStyleButton('t15,45 s0.5', 'teal');
var style2 = createStyleButton('t50,45 s0.5', 'red');
var style3 = createStyleButton('t15,85 s0.5', 'purple');
var style4 = createStyleButton('t50,85 s0.5', 'orange');

function createStyleButton(matrix, color){
  var btn = toolbox.use("nodeTemplate").transform(matrix).attr({class:"btn-style node node--"+color});

  btn.mousedown(function(e){
    //What is current selected state
    this.selected = this.selected ? true : false
    this.tempState = this.selected
    //Remove selected states for all buttons
    toolbox.selectAll(".btn-style").forEach(function(el) {
      el.removeClass('selected')
      el.selected = false
    })
    //Set this node to it's opposite state
    this.selected = !this.tempState
    //Grab set of all nodes
    var allNodes = paper.selectAll(".node")
    //Remove all current mousedown event listeners
    allNodes.forEach(function(el) {
      el.unmousedown()
    })
    if(this.selected){
      this.addClass('selected')
      //Set a mousedown event listener on all nodes
      allNodes.forEach(function(el) {
        el.mousedown(function(event){
          this.attr({class:'node node--'+color})
        })
      })
    }
  }).mouseover(function(){
    this.addClass('active')
  }).mouseout(function(){
    this.removeClass('active')
  })

  return btn
}

var g_toggleBtn = toolbox.g()
g_toggleBtn.add(label_style__bkg, label_style__text, style1, style2, style3, style4).attr({id:'g-styleOptions'})

g_toggleBtn.transform('t0,360')
