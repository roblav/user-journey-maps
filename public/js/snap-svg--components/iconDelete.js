// ICON DELETE ==========================================================

var delete_path = toolbox.path("M640.35,91.169H536.971V23.991C536.971,10.469,526.064,0,512.543,0c-1.312,0-2.187,0.438-2.614,0.875    C509.491,0.438,508.616,0,508.179,0H265.212h-1.74h-1.75c-13.521,0-23.99,10.469-23.99,23.991v67.179H133.916    c-29.667,0-52.783,23.116-52.783,52.783v38.387v47.981h45.803v491.6c0,29.668,22.679,52.346,52.346,52.346h415.703    c29.667,0,52.782-22.678,52.782-52.346v-491.6h45.366v-47.981v-38.387C693.133,114.286,670.008,91.169,640.35,91.169z     M285.713,47.981h202.84v43.188h-202.84V47.981z M599.349,721.922c0,3.061-1.312,4.363-4.364,4.363H179.282    c-3.052,0-4.364-1.303-4.364-4.363V230.32h424.431V721.922z M644.715,182.339H129.551v-38.387c0-3.053,1.312-4.802,4.364-4.802    H640.35c3.053,0,4.365,1.749,4.365,4.802V182.339z")
var delete_rect1 = toolbox.rect(475.031, 286.593, 48.418, 396.942)
var delete_rect2 = toolbox.rect(363.361, 286.593, 48.418, 396.942)
var delete_rect3 = toolbox.rect(251.69, 286.593, 48.418, 396.942)

var gr_icon_delete = toolbox.g(delete_path,delete_rect1,delete_rect2,delete_rect3);

//orig size 600 800
var symbol_icon_delete = toolbox.symbol(0,0, 1500, 2000).attr({id:'icon_delete', preserveAspectRatio: 'xMinYMin meet'})

symbol_icon_delete.add(gr_icon_delete)

var icon_delete = toolbox.use('#icon_delete')
var icon_delete_button_title = Snap.parse('<title>Delete Node</title>');
var icon_delete_button = toolbox.use('#btnBkg').attr({class:'icon-button'}).append(icon_delete_button_title);

var gr_icon_delete_button = toolbox.g(icon_delete,icon_delete_button).transform('t20,220')

gr_icon_delete_button.mouseover(function(e){
  icon_delete_button.toggleClass('active')
  gr_icon_delete.attr({ fill: "#FFBA49" })
}).mouseout(function(e){
  icon_delete_button.toggleClass('active')
  gr_icon_delete.attr({ fill: "#000" })
})
