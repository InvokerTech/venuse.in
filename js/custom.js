(function ($) {
    
    // Init Wow
    'use strict';
   var wow = new WOW( {
        animateClass: 'animated',
        offset:       100
    });
    wow.init();
    
    // Navigation scrolls
    $('.navbar-nav li a').bind('click', function(event) {
        $('.navbar-nav li').removeClass('active');
        $(this).closest('li').addClass('active');
        var $anchor = $(this);
        var nav = $($anchor.attr('href'));
        if (nav.length) {
        $('html, body').stop().animate({				
            scrollTop: $($anchor.attr('href')).offset().top				
        }, 1500, 'easeInOutExpo');
        
        event.preventDefault();
        }
    });
    
    // About section scroll
    $(".overlay-detail a").on('click', function(event) {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 900, function(){
            window.location.hash = hash;
        });
    });
    
    //jQuery to collapse the navbar on scroll
    $(window).scroll(function() {
        if ($(".navbar-default").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }

    });
        $(window).scroll(function () {
        if ($(window).scrollTop() > 50) {
            $(".navbar-default").css("background-color","#fff");
            $(".navbar").css("box-shadow","0px 0px 6px #222");
            $(".nav-ul-a").css("color","#000");
            $(".text-color").css("border","1px solid #000");
            $("form span").css("color","#000");
            $(".text-color").css("color","#000");
            $(".glyphicon-search").css("color","#000");
            $(".navbar-toggle i").css("color","#000");
            $(".top-nav-collapse").css("background-color","#fff");
            
        } else {
            $(".navbar-default").css("background-color","transparent");
            $(".navbar").css("box-shadow","none");
            $(".nav-ul-a").css("color","#fff");
            $(".text-color").css("border","1px solid #fff");
            $(".text-color").css("color","#fff");
            $(".glyphicon-search").css("color","#fff");
            $("form span").css("color","#fff");
            $(".navbar-toggle i").css("color","#fff");
            $(".navbar-brand a img").css("background-img","url('img/Venuse-HighRes2.png')");
			 
        }
    });
  
   
    
})(jQuery);


