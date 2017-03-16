
function createBtn(name, title, iconTransform, transform, pathArray, onMouseDown) {
  //The viewport is set to 100x100 to match the toolbox width of 100
  //This means that the icon will be at it's orig size. 32x32 icons work out of the box.
  //Anything else will need to be scaled
  var symbol_icon = toolbox.symbol().attr({id:'icon-'+name});
  // Loop over the paths array and add each path to the group
  var GR_paths = toolbox.g()
  icon_path = []
  function groupPaths(element, index, array) {
    icon_path[index] = toolbox.path(element);
    GR_paths.add(icon_path[index])
  }
  pathArray.forEach(groupPaths);

  symbol_icon.add(GR_paths);

  var icon = toolbox.use('icon-'+name).attr({class:'line--grid'}).transform(iconTransform)
  var icon_title = Snap.parse('<title>'+title+'</title>');
  var icon_bkg =toolbox.rect(0, 0, 50, 50, 5, 5).attr({class: "icon-button"}).append(icon_title)

  var GR_icon_button = toolbox.g(icon, icon_bkg).attr({id: 'button-icon-'+name})
  GR_icon_button.transform(transform)

  GR_icon_button.mouseover(function(e){
    icon_bkg.toggleClass('active')
    icon.attr({ fill: "#FFBA49" })
  }).mouseout(function(e){
    icon_bkg.toggleClass('active')
    icon.attr({ fill: "#000" })
  })

  if(typeof onMouseDown !== 'undefined'){
    GR_icon_button.mousedown(function(e){
      onMouseDown()
    })
  }

  return GR_icon_button
}
