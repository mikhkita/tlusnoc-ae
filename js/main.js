$(document).ready(function(){

    var isDesktop = false,
        isTablet = false,
        isMobile = false,
        isRetina = retina();

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

        if( myWidth > 1179 ){
            isDesktop = true;
            isTablet = false;
            isMobile = false;
        }else if( myWidth > 767 && myWidth < 1180 ){
            isDesktop = false;
            isTablet = true;
            isMobile = false;
        }else{
            isDesktop = false;
            isTablet = false;
            isMobile = true;
        }

        //скрывать кнопку "Развернуть отзыв"
        if($('.b-reviews').length){
            readMoreShow("b-reviews-item");
        }

        if($('.b-marketplace-case').length){
            readMoreShow("b-marketplace-case");
        }

        $('.b-escort-scheme-list').each(function(){
            var heightLine,
                top;
            top = $(this).children(".b-escort-scheme-header").outerHeight() / 2;
            heightLine = $(this).outerHeight() - top - $(this).children(".b-escort-scheme-item:last-child").outerHeight() / 2;
             $(this).find('.main-line').css({
                "top" : top,
                "height" : heightLine,
            });
             $(this).find('.main-line-inner').css({
                "height" : heightLine
            });
        });

        footerToBottom();

        if($('.b-services-block').length){
            if(!isMobile){
                alignHeight();
            }else{
                $(".b-case-item").css("min-height", 0);
            }
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

    $('.cabinet').on('click', function(event){
        $('.cabinet-bubble').toggleClass("bubble-active");
        event.stopPropagation();
    });
    $('.fancy').on('click', function(){
        if($(this).attr("data-goal")){
            $('#b-popup-app').find("form").attr("data-goal", $(this).attr("data-goal"));
        }
    });

    $(document).on('click', function(event){
        var container = $('.cabinet-bubble');
        if ($(event.target).closest(".cabinet-bubble").length) 
            return;
        container.removeClass("bubble-active");
        event.stopPropagation();
    });

    if( typeof autosize == "function" )
        autosize(document.querySelectorAll('textarea'));

    if(isRetina){
        $("*[data-retina-src]").each(function(){
            var $this = $(this),
                img = new Image(),
                src = $this.attr("data-retina-src");

            img.onload = function(){
                $this.attr("src", $this.attr("data-retina-src"));
            };
            img.src = src;
        });
    }

    if($('.b-reviews-item').length < 3){
        $('.b-btn-more-reviews').parent().remove();
    }

    function footerToBottom() {
        var browserHeight = window.innerHeight,
        footerOuterHeight = !!$('.b-footer').outerHeight() ? $('.b-footer').outerHeight(true) : 0,
        headerHeight = !!$('.b-header').outerHeight() ? $('.b-header').outerHeight(true) : 0,
        breadcrumbsHeight = !!$('.b-breadcrumbs').outerHeight() ? $('.b-breadcrumbs').outerHeight(true) : 0;
        console.log(footerOuterHeight, headerHeight, breadcrumbsHeight);
        $('.b-content').css({
            'min-height': browserHeight - footerOuterHeight - headerHeight - breadcrumbsHeight,
        });
    };

    function readMoreShow(readMoreClass){
        $('.'+readMoreClass).each(function() {
            $btn = $(this).find(".btn-show");
            var wrapHeight = $(this).find(".extend-text-wrap").height();
            var textHeight = $(this).find(".extend-text").height();
            if($(this).find(".extend-text-wrap").hasClass("open-block")){
                $btn.click();
            }
            if(wrapHeight < textHeight){
                $btn.removeClass("hide");
            }else{
                $btn.addClass("hide");
            }
        });
    }

    $('.btn-show').on('click', function(){
        $target = $(this).parent().siblings(".extend-text-wrap");
        $target.toggleClass("open-block");
        if($target.hasClass("open-block")){
            $(this).html($(this).attr("data-hide")+"<div class=\"icon-arrow-down icon-arrow-down-rotate\"></div>");
        }else{
            $(this).html($(this).attr("data-show")+"<div class=\"icon-arrow-down\"></div>");
        }
    });

    $('.b-reviews-item:gt(1)').addClass("hide");

    $('.b-btn-more-reviews').click(function() {
        $('.b-reviews-item').removeClass("hide");
        $(this).remove();
    });

    $('#full-escort').on('change', function(){
        if($(this).prop('checked')){
            $('#b-outsourcing-form input[type="checkbox"]:not(#personal)').prop("checked", true);
        }else{
            $('#b-outsourcing-form input[type="checkbox"]:not(#personal)').prop("checked", false);
        }
    });

    $('#b-outsourcing-form input[type="checkbox"]:not(#personal)').on('change', function(){
        if(!$(this).prop('checked')){
            $('#full-escort').prop("checked", false);
        }
    });

    $('#need-training').on('change', function(){
        if($(this).prop('checked')){
            $('.training-block').removeClass("hide");
            $('.dot-end').removeClass("hide");
        }else{
            $('.training-block').addClass("hide");
            $('.dot-end').addClass("hide");
        }
    });

    $('.b-slider').slick({
        dots: false,
        arrows: true,
        nextArrow: '<div class="b-block"><div class="icon-arrow-right b-slider-arrows" aria-hidden="true"></div></div>',
        prevArrow: '<div class="b-block"><div class="icon-arrow-left b-slider-arrows" aria-hidden="true"></div></div>',
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 600,
        autoplay: true,
        autoplaySpeed: 3000,
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
        'side': 'right',
        'padding': 256,
        'touch': false
    });

    $('.mobile-menu').removeClass("hide")

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

    var e = $('.b-menu-overlay, .mobile-menu');

    e.touch();

    e.on('swipeRight', function(event) {
        slideout.close();
    });

    $('.vacancy-info, .b-questions-item-wrap').each(function(){
        $(this).slideUp(0);
    });

    $('.vacancy-link').on('click', function(){
        $(this).siblings('.vacancy-info').slideToggle(300);
    });

    $('.b-questions-link').on('click', function(){

        $(this).siblings('.b-questions-item-wrap').slideToggle(300);
        $arrow = $(this).children(".b-questions-arrow");
        if($(this).hasClass("open")){
            $(this).removeClass("open");
            $arrow.removeClass("icon-arrow-down-rotate");
            $(this).find("h4").removeClass("bold");
        }else{
            
            $deltetEl = $('.b-questions-link.open');
            $deltetEl.siblings('.b-questions-item-wrap').slideUp(300);
            $deltetEl.removeClass("open");
            $deltetEl.children(".b-questions-arrow").removeClass("icon-arrow-down-rotate");
            $deltetEl.find("h4").removeClass("bold");

            $(this).addClass("open");
            $arrow.addClass("icon-arrow-down-rotate");
            $(this).find("h4").addClass("bold");
        }
    });

    $('.choice-block a').on('click', function(){
        toggleBlock($(this));
        if($('.b-cooperation').length && !$('.b-cooperation').hasClass("hide")){
            chartistInit();
        }
        var $this = $(this);
        if($('.b-work-marketplace').length){
            console.log($this.attr("data-select"));
            $('.b-send-app-form .select-services').val($this.attr("data-select")).trigger("chosen:updated");

        }
    });

    $('.country-choise a').on('click', function(){
        toggleBlock($(this));
        $('.vacancy-select').change();
    });

    function toggleBlock($this){
        $this.siblings(".choice-item").each(function(){
            var block = $(this).attr("data-block");
            $('.'+block).addClass("hide");
            $(this).removeClass("active");
        });
        var block = $this.attr("data-block");
        $('.'+block).removeClass("hide");
        $this.addClass("active");
        if(!!$this.attr("id") && $this.attr("data-hash") === "true"){
            if(history.pushState) {
                history.pushState(null, null, "#"+$this.attr("id"));
            }else{
                location.hash = "#"+$this.attr("id");
            } 
        }
        
    }

    $(".chosen-select").chosen({
        width: '100%',
        disable_search_threshold: 10000
    });

    $('.vacancy-select').on('change', function(){
        var city = $(this).find('option:selected').attr("data-city");
        var country = $(this).attr("data-country");
        $('.'+country+' '+'.vacancy-city').each(function(){
            $(this).find(".vacancy-info").each(function(){
                $(this).slideUp(0);
            });
            $(this).addClass("hide");
        });
        $('.'+city).removeClass("hide");
    });

     $('.select-services').on('change', function(){
        $('.b-marketplace-checkbox input[type="checkbox"]').each(function(){
            $(this).prop("checked", false).change();
            $(this).parent().removeClass("hide");
        });
        if($(this).val() === "accreditation"){
            $('#urgently-app').parent().addClass("hide");
        }else if($(this).val() === "set"){
            $('#need-install').parent().addClass("hide");
        }       
    });

    var hash = window.location.hash;
    if(!!hash){
        var scrollTop = $('.choice-block').offset().top - 10;
        $(document).scrollTop(scrollTop);
        var target = $(hash).attr("data-block");
        $('.'+target).click();
    }

    $('.marketplace-anchor li').on('click', function(){
        var block = $(this).children("a").attr("data-block");
        $('.'+block).click();
        var scrollTop =  $('.'+block).offset().top;
        $(document).scrollTop(scrollTop);
    });

    if($('#plupload-cont').length){
        var uploader = new plupload.Uploader({
            runtimes : 'html5,flash,silverlight,html4',
            browse_button : 'pickfiles', // you can pass an id...
            container: document.getElementById('plupload-cont'), // ... or DOM Element itself
            url : $('#b-outsourcing-form').attr("data-file-action"),
            multi_selection: false,
            
            filters : {
                max_file_size : '10mb',
                mime_types: [
                    {title : "Image files", extensions : "jpg,jpeg,gif,png"},
                    {title : "Documents", extensions : "doc,docx,pdf"},
                    {title : "Zip files", extensions : "zip"},
                ]
            },

            init: {
                PostInit: function() {
                    document.getElementById('filelist').innerHTML = '';
                },
                FilesAdded: function(up, files) {
                    plupload.each(files, function(file) {
                        document.getElementById('filelist').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
                    });
                    up.start();
                },
                UploadProgress: function(up, file) {
                    document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
                },
                FileUploaded: function(up, file, res) {
                    /*var json = JSON.parse(res.response);
                    if(json.status){
                        filePath.push(json.filePath);
                        var files = filePath.join('~');
                        $('.fileProxy').removeClass("error").val(files);
                    }*/
                    console.log("FileUploaded");
                    console.log(res.response);
                    $(".add-file").val(res.response);
                },
                Error: function(up, err) {
                    /*document.getElementById('console').appendChild(document.createTextNode("\nError #" + err.code + ": " + err.message));
                    console.log("\nError #" + err.code + ": " + err.message);*/
                }
            }
        });
        uploader.init();
    }

    $('.fl-click').on('click', function(event){
        $('#'+$(this).attr("data-fl")).click();
        $('html, body').animate({ scrollTop: $('.b-services-gray').offset().top }, 500);
    });

    function alignHeight () {
        var line = $(".b-case-item");
        var times = 0, rows = Array(), max = 0;
        line.each(function() {
            if (times == 2) {                
                for (var i = 0; i < rows.length; i++) {
                    rows[i].css("min-height", max);
                }
                max = 0;
                times = 0;
                rows = [];
            }
            if (max < $(this).outerHeight()) {
               max = $(this).outerHeight();
            }
            rows[times] = $(this);
            times += 1;
        });
        
        if (times != 0) {       
            for (var i = 0; i < rows.length; i++) {
                rows[i].css("min-height", max);
            }          
        }
    }

    var dataSum = [
[1,50000],
[50000,100000],
[100001,200000],
[200001,300000],
[300001,400000],
[400001,500000],
[500001,600000],
[600001,700000],
[700001,800000],
[800001,900000],
[900001,1000000],
[1000001,1500000],
[1500001,2000000],
[2000001,2500000],
[2500001,3000000],
[3000001,3500000],
[3500001,4000000],
[4000001,4500000],
[4500001,5000000],
[5000001,5500000],
[5500001,6000000],
[6000001,6500000],
[6500001,7000000],
[7000001,7500000],
[7500001,8000000],
[8000001,8500000],
[8500001,9000000],
[9000001,9500000],
[9500001,10000000],
[10000001,11000000],
[11000001,12000000],
[12000001,13000000],
[13000001,14000000],
[14000001,15000000],
[15000001,600000000]];

var dataPeriod = [[1,29],[30,59],[60,89],[90,119],[120,149],[150,179],[180,209],[210,239],[240,269],[270,299],[300,329],[330,366],[367,389],[390,419],[420,449],[450,479],[480,509],[510,539],[540,569],[570,599],[600,629],[630,659],[660,689],[690,720]];

    var data = [[3000,3000,3000,3000,3000,3000,3000,3000,3500,4000,4500,4700,5000,9000,9000,9000,9000,9000,9000,9000,9000,9000,9000,9000],
[6500,6500,6500,6500,6500,6500,6500,6500,6500,6500,6500,6500,6500,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000],
[9000,9000,9000,9000,9000,9000,9000,9000,9000,9000,9000,9500,10200,11000,11700,12500,13300,14000,14700,15500,16300,17100,17800,18900],
[15000,15000,15000,15000,15000,15000,15000,15000,15000,15000,15000,15500,16800,18100,19300,20600,21900,23100,24400,25700,26900,28200,29500,31200],
[17700,17800,17800,17800,17800,17800,17800,17800,17800,17800,19500,21200,23000,24700,26500,26500,28100,31600,33500,35100,36900,38600,40300,42700],
[20500,20500,20500,20500,21000,21500,21500,21500,21500,21500,23000,25000,27000,29000,31200,33500,35500,37500,39500,41500,43500,45300,47500,50500],
[21300,21300,21300,21500,21700,21900,21900,21900,22000,24000,26500,29000,31000,34000,36000,39000,41000,44000,46000,49000,51500,54000,56500,58000],
[24000,24000,24000,24200,25000,25500,25500,25500,26000,28500,31500,34500,37000,40000,43000,45000,48500,51500,54500,57500,60000,62000,63500,67000],
[27100,27100,27100,27100,27800,28300,28700,28700,29500,32800,36000,39300,42600,45800,49100,52400,55700,59000,62300,65200,66200,69400,72500,76000],
[29500,29500,29500,29600,30500,30900,32300,32300,33200,37000,40600,44300,48000,51500,55200,58000,62500,66200,68500,71000,74500,78000,81500,86500],
[31700,31700,31700,31700,32600,33100,34400,34500,35300,39200,42800,46900,50800,54700,58700,62600,66500,70500,74100,75000,78700,82500,86200,94500],
[2,2,2.00,2.00,2.00,2.00,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.60,10],
[2,2,2.00,2.00,2.00,2.00,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.60,10],
[2,2,2.00,2.00,2.00,2.00,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.00,2.00,2.00,2.00,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.00,2.00,2.00,2.00,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.69,3.5,3.5,3.5,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.69,3.5,3.5,3.5,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.69,3.5,3.5,3.5,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.69,3.5,3.5,3.5,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.69,3.5,3.5,3.5,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.69,3.5,3.5,3.5,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.69,3.5,3.5,3.5,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.69,3.5,3.5,3.5,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.69,3.5,3.5,3.5,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.72,3.5,3.5,3.5,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.74,3.5,3.5,3.5,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.77,3.5,3.5,3.5,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.82,3.5,3.5,3.5,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[1,1.5,2.5,3,3.1,3.3,3.5,3.7,3.9,4.1,4.34,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[1,1.5,2.5,3,3.1,3.3,3.5,3.7,3.9,4.1,4.34,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[1,1.5,2.5,3,3.1,3.3,3.5,3.7,3.9,4.1,4.34,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[1,1.5,2.5,3,3.1,3.3,3.5,3.7,3.9,4.1,4.34,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[1,1.5,2.5,3,3.1,3.3,3.5,3.7,3.9,4.1,4.34,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[1,1.5,2.50,3,3.1,3.3,3.5,3.7,3.9,4.1,4.34,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10]];

    var periodInDays = 0;

    function calcPrice(){
        var row,
            column,
            res = 0,
            sum = $('input[name="sum"]').val();
        //найти столбец (сумма)
        dataSum.forEach(function(item, i, arr){
            if(item[0] <= sum && item[1] >= sum){
                row = i;
            }
        });
        //найти столбец (дни)
        dataPeriod.forEach(function(item, i, arr){
            if(item[0] <= periodInDays && item[1] >= periodInDays){
                column = i;
            }
        });
        if(row === undefined || column === undefined){
            res = 0;
        }else{
            //если это проценты
            if(data[row][column] < 20)
                res = sum * (data[row][column]/100);
            else
                res = data[row][column];
        }
        res = String(parseInt(res).toFixed(0)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
        $('.cost-result').text(res);
    }

    function calcDays (value) {
        if($('.period-active').hasClass("days")){
            periodInDays = value;
        }else if($('.period-active').hasClass("months")){
            periodInDays = value * 30;
        }else{
            periodInDays = value;
        }
    }

    $(function() {
        var $slideSum = $('.sum-slider').slider({
          range: "min",
          value: 0,
          min: 0,
          step: 50000,
          max: 100000000,
          slide: function(e, ui){
            $('input[name="sum"]').val(ui.value);

            if($slideSum.slider("value") >= 10000000){
                $slideSum.slider("option", "step", 500000);
            }else{
                $slideSum.slider("option", "step", 50000);
            }
          },
          change: function(e, ui){
            calcDays($('input[name="period"]').val());
            calcPrice();
          },
        });



    //$slideSum.draggable();

        $('input[name="sum"]').on('change input', function(){
            $slideSum.slider("value", $(this).val());
        });

        var $slidePeriod = $('.period-slider').slider({
          range: "min",
          value: 0,
          min: 1,
          step: 1,
          max: 365,
          slide: function(e, ui){
            $('input[name="period"]').val(ui.value);
          },
          change: function(e, ui){
            calcDays($('input[name="period"]').val());
            calcPrice();
          },
        });

        $('input[name="period"]').on('change input', function(){
            var value = parseInt($(this).val());
            $slidePeriod.slider("value", value);
            calcDays(value);
        });

        $('input[name="sum"]').val(200000).change();
        $('input[name="period"]').val(30).change();
        periodInDays = 30;

        $('.period-items a').on('click', function(event){
            $('.period-items a').each(function() {
                $(this).removeClass("period-active");
            });
            $(this).addClass("period-active");
            if($(this).hasClass("days")){
                $slidePeriod.slider({"value": 1, "min": 1, "max": 365});
                $('input[name="period"]').val(1).removeClass("hide");
                $('.period-slider').removeClass("hide");
                $('.period-datepicker').addClass("hide");
                $('.period-start').val("");
                $('.period-finish').val("");
                calcDays(1);
                calcPrice();
            }else if($(this).hasClass("months")){
                $slidePeriod.slider({"value": 1, "min": 1, "max": 24});
                $('input[name="period"]').val(1).removeClass("hide");
                $('.period-slider').removeClass("hide");
                $('.period-datepicker').addClass("hide");
                $('.period-start').val("");
                $('.period-finish').val("");
                calcDays(1);
                calcPrice();
            }else{
                //скрыть инпкут и слайдер
                $('input[name="period"]').val("1").addClass("hide");
                $('.period-slider').addClass("hide");
                $('.period-datepicker').removeClass("hide");

                calcDays(0);
                calcPrice();
            }
        });
    });

    $.datepicker.regional['ru'] = {
            closeText: 'Готово', // set a close button text
            currentText: 'Сегодня', // set today text
            monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'], // set month names
            monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'], // set short month names
            dayNames: ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'], // set days names
            dayNamesShort: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'], // set short day names
            dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'], // set more short days names
            dateFormat: 'dd.mm.yy', // set format date
            firstDay: 1
        };        
    $.datepicker.setDefaults($.datepicker.regional["ru"]);

    var dayStart,
        dayFinish,
        dayInterval = 0,
        from, to;
    var day = 24*60*60*1000;
    $( function() {
        var dateFormat = "dd.mm.yy";
          from = $( ".period-start" )
            .datepicker({
              changeMonth: true,
              minDate: 0
            })
            .on( "change", function() {
              to.datepicker( "option", "minDate", getDate( this ) );
              dayStart = getDate( this ).getTime();
              if(!!to.val()){
                dayInterval = Math.round(Math.abs(dayStart - dayFinish)/day);
              }else{
                dayInterval = 0;
              }
              calcDays(dayInterval);
              calcPrice();
              //console.log("periodInDays = "+periodInDays, "dayInterval = "+dayInterval, "dayStart = "+dayStart, "dayFinish = "+dayFinish);
            });
          to = $( ".period-finish" ).datepicker({
            changeMonth: true,
            minDate: 0
          })
          .on( "change", function() {
            from.datepicker( "option", "maxDate", getDate( this ) );
            dayFinish = getDate( this ).getTime();
            if(!!to.val()){
              dayInterval = Math.round(Math.abs(dayStart - dayFinish)/day);
            }else{
              dayInterval = 0;
            }
            calcDays(dayInterval);
            calcPrice();
            //console.log("periodInDays = "+periodInDays,"dayInterval = "+dayInterval, "dayStart = "+dayStart, "dayFinish = "+dayFinish);
          });
     
        function getDate( element ) {
          var date;
          try {
            date = $.datepicker.parseDate( dateFormat, element.value );
          } catch( error ) {
            date = null;
          }
     
          return date;
        }
    });

    $('input[name="dates"]').on('change input', function(){
        //рассчет по датам
        if($(this).prop('checked')){
            $('.period-datepicker').removeClass("hide");
            $('input[name="period"]').parent().addClass("hide");
            $('.period-start').val("");
            $('.period-finish').val("");
            $('.cost-result').text(0);
        }else{// по количеству дней
            $('.period-datepicker').addClass("hide");
            $('input[name="period"]').val(30).parent().removeClass("hide");
            $('.period-start').val("");
            $('.period-finish').val("");
            calcDays(30);
            calcPrice();
        }
    });

    periodInDays = 30;

    $('.b-services-send-form input[name="sum"]').on('change input', function(){
        /*console.log("++"+periodInDays);
        var str = $(this).val();
        str = str.replace(/\s+/g, '');
        $(this).val(str);*/

        calcPrice();

        /*var res = String(parseInt(str).toFixed(0)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
        $(this).val(res);*/
    });

    $('.b-services-send-form input[name="period"]').on('change input', function(){
        var value = parseInt($(this).val());
        calcDays(value);
        calcPrice();
    });

    $('.b-services-send-form .b-btn-calc').on('click', function(event){
        $('.b-services-send-info').toggleClass("hide");
    });

    function chartistInit(){
        new Chartist.Line('.ct-chart-visits', {
            labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            series: [
                [2000, 3000, 4000, 3500, 5000, 5500, 5000, 6000, 7500, 6500, 8500, 9000]
            ],
        },{
            height: '250px',
            low: 0,
            showArea: true,
            lineSmooth: Chartist.Interpolation.none({
                fillHoles: false
            })
        });

        //Заявки
        new Chartist.Line('.ct-chart-app', {
            labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            series: [
                [22, 40, 48, 35, 60, 35, 70, 79, 88, 67, 85, 95]
            ],
        },{
            height: '250px',
            low: 0,
            showArea: true,
            lineSmooth: Chartist.Interpolation.none({
                fillHoles: false
            })
        });
    }

    if($('.ct-chart').length){
        chartistInit()
    }

    $('.chart-buttons a').on('click', function(event){
        $('.chart-buttons a').each(function() {
            $(this).removeClass("active");
        });
        $(this).addClass("active");
        $('.ct-chart').each(function() {
            $(this).removeClass("active");
        });
        var target = $(this).attr("data-chart");
        $('.'+target).addClass("active");
        var legend = $(this).attr("data-legend");
        $('.chart-legend span').text(legend);
    });

    /*$( ".period-start" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      minDate: 0
    })*/

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