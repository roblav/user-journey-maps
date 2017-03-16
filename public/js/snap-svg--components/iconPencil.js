var symbol_icon_pencil = toolbox.symbol(0,0,32,32).attr({id:'icon-pencil'});
var icon_pencil_path = toolbox.path("M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z");
symbol_icon_pencil.add(icon_pencil_path);
var icon_pencil_button_title = Snap.parse('<title>Pencil</title>');
var icon_pencil_button = toolbox.use('icon-pencil').attr({class:'node'}).append(icon_pencil_button_title);
