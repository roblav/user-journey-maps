var socket = io();


// ## User Map Selection
// -----------------------

$('#checkbox--usermaps input').change(function(){
  var data = $('#checkbox--usermaps input:checked').serializeJSON();
  // Only call manulUpdateMsg if something is checked
  //if( radios.hasOwnProperty('manual') ) {
  //  socket.emit('checkboxOptions--usermaps', dataMaps);
  //}
  //console.log(data)
  socket.emit('checkboxOptions--usermaps', data);

  $('.svg--panel').addClass('hide')
  for(var str in data) {
    //remove hide
    var id = '#'+ str
    console.log(id)
    $('#'+ str).toggleClass('hide')
  }
});


// ## Display image slider
// -----------------------------------------
socket.on('checkboxOptions--usermaps-PUB', function(imgSet){
  //console.log(imgSet)
  //loop over obj to output values
  var ul = document.getElementById("slider-list");
  // Remove current slides
  //console.log($('ul#slider-list li').length)
  $('ul#slider-list li').remove();
  //console.log($('ul#slider-list li').length)

  for (var val in imgSet) {
    // skip loop if the property is from prototype
    if(!imgSet.hasOwnProperty(val)) continue;
    //add to .my-slider as an li element
    //console.log(imgSet[val])
    var li = document.createElement("li");
    var img = document.createElement("img");
    img.setAttribute("src", "/public/images/"+imgSet[val]);
    li.appendChild(img);
    ul.appendChild(li);
  }
  //$('#userName').attr('value', userTes.userName);
  // Let's recalculate Unslider so it knows what's going on
  //window.slider = $('.my-slider').unslider({
    //    animateHeight: true
    //  })
  //$('.my-slider').unslider('destroy')
  //$('.my-slider').unslider({animateHeight: true})
  //$('.my-slider').unslider();
  sliderInit('.my-slider');
  //Move nav elements to the top
  $('.my-slider ~ a, .my-slider ~ nav').insertBefore( ".my-slider" );
});

/* Unslider */
function sliderInit(divClass) {

  // destroy if exists first
  if ($(divClass).hasClass('unslider-horizontal')){
    $(divClass).unwrap();
    $(divClass).removeClass('unslider-horizontal');
    $('.unslider-nav, .unslider-arrow').remove();
  }

  // init the slider
  window.slider = $(divClass).unslider({
    animateHeight   : true
  });
}
