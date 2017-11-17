$(document).ready(function(){

    var isRetina = retina();

    function resize(){
       if( typeof( window.innerWidth ) == 'number' ) {
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || 
        document.documentElement.clientHeight ) ) {
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }
    }

    function retina(){
        var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
            (min--moz-device-pixel-ratio: 1.5),\
            (-o-min-device-pixel-ratio: 3/2),\
            (min-resolution: 1.5dppx)";
        if (window.devicePixelRatio > 1)
            return true;
        if (window.matchMedia && window.matchMedia(mediaQuery).matches)
            return true;
        return false;
    }

    $(window).resize(resize);
    resize();

    $.fn.placeholder = function() {
        if(typeof document.createElement("input").placeholder == 'undefined') {
            $('[placeholder]').focus(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                    input.removeClass('placeholder');
                }
            }).blur(function() {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur().parents('form').submit(function() {
                $(this).find('[placeholder]').each(function() {
                    var input = $(this);
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });
            });
        }
    }
    $.fn.placeholder();

    $('.cabinet').on('click', function(){
        $('.cabinet-bubble').toggleClass("bubble-active");
    });

    /*$(document).on('click', function(e){
        var container = $('.cabinet-bubble');
        if (container.has(e.target).length === 0){
            container.removeClass("bubble-active");
        }
    });*/

    $("img").each(function(){
        if( $(this).attr("data-retina-src") && isRetina){
            var img = new Image(),
                $this = $(this);
            img.src = $(this).attr("data-retina-src");
            img.onload = function(){
                $this.attr("src", $this.attr("data-retina-src"));
            }
        }
    });

     $('.b-client-slider').slick({
        dots: false,
        arrows: true,
        nextArrow: '<div class="icon-arrow-right b-client-arrows" aria-hidden="true"></div>',
        prevArrow: '<div class="icon-arrow-left b-client-arrows" aria-hidden="true"></div>',
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        speed: 600,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
              breakpoint: 1100,
              settings: {
                slidesToShow: 4
              }
            },
            {
              breakpoint: 900,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 700,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 1
              }
            },
        ]
    });

    var slideout = new Slideout({
        'panel': document.getElementById('panel-page'),
        'menu': document.getElementById('mobile-menu'),
        'padding': 256,
        'tolerance': 70
    });

    $('.burger-menu').click(function() {
        slideout.open();
        $(".b-menu-overlay").show();
        return false;
    });
    $('.b-menu-overlay').click(function() {
        slideout.close();
        $('.b-menu-overlay').hide();
        return false;
    });

    slideout.on('open', function() {
        $('.burger-menu').addClass("menu-on");
        $(".b-menu-overlay").show();
    });

    slideout.on('close', function() {
        $('.burger-menu').removeClass("menu-on");
        setTimeout(function(){
            $("body").unbind("touchmove");
            $(".b-menu-overlay").hide();
        },100);
    });

    /*bindCloseMenu("menu");
    bindCloseMenu("b-menu-overlay");

    function bindCloseMenu(id){
        var swipeh = new MobiSwipe(id);
        swipeh.direction = swipeh.HORIZONTAL;
        swipeh.onswipeleft = function() { 
            $("body").bind("touchmove", function(e){
                e.preventDefault();
                return false;
            });
        slideout.close(); 
        };
    }*/
    
	// var myPlace = new google.maps.LatLng(55.754407, 37.625151);
 //    var myOptions = {
 //        zoom: 16,
 //        center: myPlace,
 //        mapTypeId: google.maps.MapTypeId.ROADMAP,
 //        disableDefaultUI: true,
 //        scrollwheel: false,
 //        zoomControl: true
 //    }
 //    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 

 //    var marker = new google.maps.Marker({
	//     position: myPlace,
	//     map: map,
	//     title: "Ярмарка вакансий и стажировок"
	// });

    //  var options = {
    //     $AutoPlay: true,                                
    //     $SlideDuration: 500,                            

    //     $BulletNavigatorOptions: {                      
    //         $Class: $JssorBulletNavigator$,             
    //         $ChanceToShow: 2,                           
    //         $AutoCenter: 1,                            
    //         $Steps: 1,                                  
    //         $Lanes: 1,                                  
    //         $SpacingX: 10,                              
    //         $SpacingY: 10,                              
    //         $Orientation: 1                             
    //     }
    // };

    // var jssor_slider1 = new $JssorSlider$("slider1_container", options);

});