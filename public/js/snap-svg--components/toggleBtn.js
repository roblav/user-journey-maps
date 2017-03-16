// GRID TOGGLE BUTTON ======================================================

var label_toggleBtn__bkg = toolbox.rect(0, 0, 100, 30, 0).attr({class: 'toolbox-label--bkg'})
var label_toggleBtn__text = toolbox.text("50%", 15,'Toggle Grid').attr({class: 'toolbox-label--text'})

var toggleBtn_bkg = toolbox.rect(18, 40, 64, 34, 15).attr({class: 'toggleBtn_bkg'})
var toggleBtn = toolbox.circle(35, 57, 15).attr({class: 'toggleBtn'})

toggleBtn.click(function(e){
  this.toggle = !this.toggle
  this.animate({cx:!this.toggle ? 35 : 65}, 500)
  grid.toggleClass('show')
  grid.toggleClass('hide')
  if(this.toggle){
    toggleBtn_bkg.addClass('toggle')
  } else {
    toggleBtn_bkg.removeClass('toggle')
  }
})

var g_toggleBtn = toolbox.g()
g_toggleBtn.add(label_toggleBtn__bkg, label_toggleBtn__text, toggleBtn_bkg, toggleBtn).attr({id:'g-toggleBtn'})

g_toggleBtn.transform('t0,370')
