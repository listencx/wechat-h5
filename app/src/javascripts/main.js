(function () {
    'use strict';

    $(function(){

    var name = decodeURIComponent(getParams("u"));
    if(name != "null"){

        $.get("http://localhost:8888/party/life/employee/"+name).then(function(response) {
            var sex=response.sex;
            var userId=response.userId;
            var startDate=response.startDate;
            var workdays=response.workdays;
            var birthplace=response.birthplace;
            var beat=response.beat;
            var villagers=response.villagers;
            var businessDay=response.businessDay;
            var businessFood=response.businessFood;
            var hours=response.hours;
            var credit=response.credit;

            document.title=userId+"的奥克斯人生";

            if(sex=="男"){
                $(".slide-1").children("div.item-2").css("display","block");
                $(".slide-6").children("div.item-1-1").css("display","block");
                $(".slide-11").children("div.item-2-1").css("display","block");
            }
            else{
                $(".slide-1").children("div.item-3").css("display","block");
                $(".slide-6").children("div.item-1-2").css("display","block");
                $(".slide-11").children("div.item-2-2").css("display","block");
            }

            var arr=startDate.split("-");
            var year=arr[0];
            var month=arr[1];
            var day=arr[2]; 
            $(".item-year").html(year);
            $(".item-month").html(month);
            $(".item-day").html(day);
            $(".item-birthplace").html(birthplace);
            $(".item-villagers").html(villagers);
            if(birthplace.length>16){
                $(".item-birthplace").css("font-size","98%");
            }
            
            if(beat<=100&&beat>75){
                $(".slide-4").children("div.item-2-75").css("display","block");
            }
            else if(beat<=75&&beat>50){
                $(".slide-4").children("div.item-2-50").css("display","block");
            }
            else if(beat<=50&&beat>25){
                $(".slide-4").children("div.item-2-25").css("display","block");
            }
            else if(beat<=25&&beat>=0){
                $(".slide-4").children("div.item-2-0").css("display","block");
            }

            if(workdays.length <= 4){  
                $("#number-four").css("display","block");      
            for (var i = 1; i <= 4 ; i++) {
                    $(".item-text-howlong-"+i).html(workdays[i-1]);
                }
            }
            else{                
                $("#number-five").css("display","block");
                for (var i = 1; i <= 5 ; i++) {
                    $(".item-text-howlong-5-"+i).html(workdays[i-1]);
                }
            }
            $(".item-text-beat").html(beat+"%");            
            
            $(".slide-6").children("span.item-2").html(businessDay);
            $(".slide-6").children("span.item-3").html(businessFood);
            $(".slide-7").children("span.item-2").html(hours);
            $(".slide-7").children("span.item-3").html(credit); 

            if(hours<=180&&hours>144){
                $(".slide-7").children("div.item-2-5").css("display","block");
            }
            else if(hours<=144&&hours>108){
                $(".slide-7").children("div.item-2-4").css("display","block");
            }
            else if(hours<=108&&hours>72){
                $(".slide-7").children("div.item-2-3").css("display","block");
            }
            else if(hours<=72&&hours>36){
                $(".slide-7").children("div.item-2-2").css("display","block");
            }
            else if(hours<=36&&hours>=0){
                $(".slide-7").children("div.item-2-1").css("display","block");
            }
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
        var mySwiper = new Swiper('.swiper-container', {
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
