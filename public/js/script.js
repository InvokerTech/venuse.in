 
 //navigaton dropdown-menu
 $(".dropdown-menu li a").click(function(){
  $(this).parents(".dropdown1").find('.btn1').html($(this).text());
  $(this).parents(".dropdown1").find('.btn1').val($(this).data('value'));
});    
// range-slider
/*$( function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 2200,
      values: [ 5, 2200 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "" + ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "" + $( "#slider-range" ).slider( "values", 0 ) +
      " - " + $( "#slider-range" ).slider( "values", 1 ) );
  } );
  
   $( function() {
    $( "#slider-range1" ).slider({
      range: true,
      min: 0,
      max: 5000,
      values: [ 0, 5000 ],
      slide: function( event, ui ) {
        $( "#amount1" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount1" ).val( "$" + $( "#slider-range1" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range1" ).slider( "values", 1 ) );
  } );
  
   $( function() {
    $( "#slider-range3" ).slider({
      range: true,
      min: 100,
      max: 40000,
      values: [ 100, 40000 ],
      slide: function( event, ui ) {
        $( "#amount3" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount3" ).val( "$" + $( "#slider-range3" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range3" ).slider( "values", 1 ) );
  } );

   $( function() {
    $( "#slider-range2" ).slider({
      range: true,
      min: 0,
      max: 7000,
      values: [ 0, 7000 ],
      slide: function( event, ui ) {
        $( "#amount2" ).val( "" + ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      }
    });
    $( "#amount2" ).val( "" + $( "#slider-range2" ).slider( "values", 0 ) +
      " - " + $( "#slider-range2" ).slider( "values", 1 ) );
  } );
*/
  //add class and remove class
    $('.form-toggle-item').on('click', function(){
    $(this).addClass('selected').siblings().removeClass('selected');
});
   $('.pagination li').on('click', function(){
    $(this).addClass('active').siblings().removeClass('active');
});
    $(".action-button .text-left span").click(function () {
            $(this).text(function(i, v){
               return v === 'Show More Filters' ? 'Show Less Filters' : 'Show More Filters'
            })
        });
  
    
/*    $('.search-filters-main span').on('click', function(){
    $('#search-filters').toggleClass('filters-open');
});
   
  $('.search-filters-main span').on('click', function(){
    $('#landing-filters').fadeToggle();
});*/

(function( $ ) {

    //Function to animate slider captions 
  function doAnimations( elems ) {
    //Cache the animationend event in a variable
    var animEndEv = 'webkitAnimationEnd animationend';
    
    elems.each(function () {
      var $this = $(this),
        $animationType = $this.data('animation');
      $this.addClass($animationType).one(animEndEv, function () {
        $this.removeClass($animationType);
      });
    });
  }
  
  //Variables on page load 
  var $myCarousel = $('#carousel-example-generic'),
    $firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");
    
  //Initialize carousel 
  //$myCarousel.carousel();
  
  //Animate captions in first slide on page load 
  doAnimations($firstAnimatingElems);
  
  //Pause carousel  
 // $myCarousel.carousel('pause');
  
  
  //Other slides to be animated on carousel slide event 
/*  $myCarousel.on('slide.bs.carousel', function (e) {
    var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
    doAnimations($animatingElems);
  });  
    $('#carousel-example-generic').carousel({
        interval:3000,
        pause: "false"
    });*/
  
})(jQuery); 
