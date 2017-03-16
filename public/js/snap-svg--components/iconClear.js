// ICON CLEAR ALL ==========================================================

var icon_clear_path = toolbox.path("M92.779,129.86c-6.431,2.594-13.446,4.038-20.807,4.038c-14.974,0-28.517-5.924-38.572-15.492l4.604-2.73     c3.234-1.913,3.204-4.962-0.066-6.807L15.48,96.183c-3.27-1.848-5.982-0.267-6.059,3.532l-0.534,26.412     c-0.074,3.802,2.481,5.332,5.711,3.415l6.369-3.768c12.777,13.596,30.865,22.145,51,22.145c7.313,0,14.349-1.153,20.961-3.254     C107.014,140.91,100.006,126.894,92.779,129.86z M16.408,70.271c3.066-22.703,19.748-41.049,41.547-46.672V9.154     C30.509,14.725,8.914,36.336,3.327,63.775C-1.619,81.338,15.903,77.833,16.408,70.271z M64.144,35.707L86.96,22.045     c3.316-1.988,3.323-5.226,0.014-7.228L63.95,0.883c-3.311-1.999-5.985-0.49-5.966,3.381l0.121,28.034     C58.121,36.168,60.826,37.695,64.144,35.707z M143.078,102.952l-11.95-7.074l7.265,4.196c2.345-6.995,3.665-14.459,3.665-22.248     c0-21.245-9.465-40.278-24.403-53.129c-7.135-6.437-17.647,0.572-10.916,9.154C119.711,44.122,128.041,60,128.041,77.83     c0,5.198-0.767,10.212-2.088,14.985l-6.167-3.648c-3.213-1.902-5.77-0.335-5.715,3.498l0.407,26.34     c0.059,3.84,2.738,5.448,5.982,3.598l22.562-12.857C146.267,107.897,146.291,104.854,143.078,102.952z")

var symbol_icon_clear = toolbox.symbol(-20,-10,350,350).attr({id:'icon_clear', preserveAspectRatio: 'xMinYMin meet'})
symbol_icon_clear.add(icon_clear_path)
var icon_clear = toolbox.use('#icon_clear')

var icon_clear_button_title = Snap.parse('<title>Clear All</title>');
var icon_clear_button = toolbox.use('#btnBkg').attr({class:'icon-button'}).append(icon_clear_button_title);

var gr_icon_clear_button = toolbox.g(icon_clear,icon_clear_button).transform('t20,290')

gr_icon_clear_button.mouseover(function(e){
  icon_clear_button.toggleClass('active')
}).mouseout(function(e){
  icon_clear_button.toggleClass('active')
}).mousedown(function(e){
  var set = paper.selectAll('.node, .arrow')
  set.remove()
})