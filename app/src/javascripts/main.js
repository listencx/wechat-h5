(function () {
    'use strict';

    $(function(){

    var name = decodeURIComponent(getParams("u"));
    //alert(name);
    if(name != "null"){

        $.get("http://nh2016.auxgroup.com/party/life/employee/"+name).then(function(response) {
            var userId=response.userId;
            var startDate=response.startDate;
            var workdays=response.workdays;
            var birthplace=response.birthplace;
            var beat=response.beat;
            var villagers=response.villagers;
            document.title=userId+'的奥克斯人生';
            if(beat==100){
                $(".item-text-beat").css("font-size","2.0rem");
                $(".item-text-beat").css("top","64.8%");
                $(".item-text-beat").css("left","40.2%");
            }
            if(beat.length<2)beat="&nbsp"+beat;
            var arr=startDate.split("-");
            var year=arr[0];
            var month=arr[1];
            var day=arr[2]; 
            $(".item-year").html(year);
            $(".item-month").html(month);
            $(".item-day").html(day);
            $(".item-birthplace").html(birthplace);
            $(".item-villagers").html(villagers);

            if(workdays.length <= 4){        
            for (var i = 1; i <= 4 ; i++) {
                    $(".item-text-howlong-"+i).html(workdays[i-1]);
                }
            }
            else{
                $("#number-four").css("display","none");
                $("#number-five").css("display","inline");
                for (var i = 1; i <= 5 ; i++) {
                    $(".item-text-howlong-5-"+i).html(workdays[i-1]);
                }
            }
            $(".item-text-beat").html(beat+"%");
         },function(response){
            console.log(response);
         })
        }
    })

    function getParams(name){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null){
                return r[2];
            }
            return null;
        }
    // load dependencies
    var animationControl = require('./animation-control.js');


    $(document).ready(function () {
        var bgMusic = $('audio').get(0);
        var $btnMusic = $('.btn-music');
        var $upArrow = $('.up-arrow');

        // background music control
        $btnMusic.click(function () {
            if (bgMusic.paused) {
                bgMusic.play();
                $(this).removeClass('paused');
            } else {
                bgMusic.pause();
                $(this).addClass('paused');
            }
        });
        $('.line').click(function(){
            mySwiper.slideNext();
        })
        $('.slide-1').click(function(){
            mySwiper.slideNext();
        })

        // init Swiper
        var mySwiper =new Swiper('.swiper-container', {
            mousewheelControl: true,
            effect: 'coverflow',    // slide, fade, coverflow or flip
            speed: 400,
            direction: 'vertical', 
            fade: {
                crossFade: false
            },
            coverflow: {
                rotate: 0,
                stretch: 0,
                depth: 0,
                modifier: 0,
                slideShadows: false     // do disable shadows for better performance
            },
            flip: {
                limitRotation: true,
                slideShadows: false     // do disable shadows for better performance
            },
            onInit: function (swiper) {
                animationControl.initAnimationItems();  // get items ready for animations
                animationControl.playAnimation(swiper); // play animations of the first slide
            },
            // onTransitionStart: function (swiper) {     // on the last slide, hide .btn-swipe
            //     if (swiper.activeIndex === swiper.slides.length - 1) {
            //         $upArrow.hide();
            //     } else {
            //         $upArrow.show();
            //     }
            // },
            onTransitionEnd: function (swiper) {       // play animations of the current slide
                animationControl.playAnimation(swiper);
            },
            onTouchStart: function (swiper, event) {    // mobile devices don't allow audios to play automatically, it has to be triggered by a user event(click / touch).
                if (!$btnMusic.hasClass('paused') && bgMusic.paused) {
                    bgMusic.play();
                }
            }
        });

        // hide loading animation since everything is ready
        $('.loading-overlay').slideUp();
    });
})();
