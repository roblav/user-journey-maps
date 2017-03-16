
function createBtn(name, title, transform, path) {
  //The viewport is set to 100x100 to match the toolbox width of 100
  //This means that the icon will be at it's orig size. 32x32 icons work out of the box.
  //Anything else will need to be scaled
  var symbol_icon = toolbox.symbol(0,0,100,100).attr({id:'icon-'+name, preserveAspectRatio: 'xMinYMin meet'});
  var icon_path = toolbox.path("M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z");
  symbol_icon.add(icon_path);
  var icon_button_title = Snap.parse('<title>title</title>');
  var icon_button = toolbox.use('icon-'+name).attr({class:'line--grid'}).append(icon_button_title);
  icon_button.transform(transform)
  return icon_button
}

