// Use this file to change prototype configuration.

// Note: prototype config can be overridden using environment variables (eg on heroku)

module.exports = {

  generateGrid : function (rows, cols, width, height) {

    var grid = []
    // Horizontal lines
    var xEnd = width*rows
    for (var i = 0; i <= rows; i++){
      var obj = {
        type: "line",
        name: "line_0_"+i,
        xStart: 0,
        yStart: width*i,
        xEnd: xEnd,
        yEnd: width*i,
        attr: { class:"line--grid" }
      }
      grid.push(obj)
    }
    // Vertical lines
    //var xEnd = width*rows
    for (var i = 0; i <= cols; i++){
      var obj = {
        type: "line",
        name: "line_"+i+"_0",
        xStart: width*i,
        yStart: 0,
        xEnd: width*i,
        yEnd: xEnd,
        attr: { class:"line--grid" }
      }
      grid.push(obj)
    }
    return grid

  }

}
