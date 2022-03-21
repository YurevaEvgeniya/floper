(function($) {

    "use strict";
    var cfg = {
        scrollDuration : 800, 
        mailChimpURL   : 'https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e6957d85dc'  
    },
    $WIN = $(window);
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);

    var clPreloader = function() {
        $("html").addClass('cl-preload');
        $WIN.on('load', function() {
            $("#loader").fadeOut("slow", function() {
                $("#preloader").delay(300).fadeOut("slow");
            }); 
            $("html").removeClass('cl-preload');
            $("html").addClass('cl-loaded');
        });
    };

    var clMenuOnScrolldown = function() {
        var menuTrigger = $('.header-menu-toggle');
        $WIN.on('scroll', function() {
            if ($WIN.scrollTop() > 150) {
                menuTrigger.addClass('opaque');
            }
            else {
                menuTrigger.removeClass('opaque');
            }
        });
    };

    var clOffCanvas = function() {
        var menuTrigger     = $('.header-menu-toggle'),
            nav             = $('.header-nav'),
            closeButton     = nav.find('.header-nav__close'),
            siteBody        = $('body'),
            mainContents    = $('section, footer');

        menuTrigger.on('click', function(e){
            e.preventDefault();
            siteBody.toggleClass('menu-is-open');
        });
        closeButton.on('click', function(e){
            e.preventDefault();
            menuTrigger.trigger('click');	
        });
        siteBody.on('click', function(e){
            if( !$(e.target).is('.header-nav, .header-nav__content, .header-menu-toggle, .header-menu-toggle span') ) {
                siteBody.removeClass('menu-is-open');
            }
        });
    };

    var clStatCount = function() {
        var statSection = $(".about-stats"),
            stats = $(".stats__count");
        statSection.waypoint({
            handler: function(direction) {
                if (direction === "down") {
                    stats.each(function () {
                        var $this = $(this);
                        $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                            duration: 4000,
                            easing: 'swing',
                            step: function (curValue) {
                                $this.text(Math.ceil(curValue));
                            }
                        });
                    });
                } 
                this.destroy();
            },
            offset: "90%"
        });
    };

    var clMasonryFolio = function () {
        
        var containerBricks = $('.masonry');

        containerBricks.imagesLoaded(function () {
            containerBricks.masonry({
                itemSelector: '.masonry__brick',
                resize: true
            });
        });
    };

    var clSmoothScroll = function() {
        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
            $target    = $(target);
                e.preventDefault();
                e.stopPropagation();
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {
                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }
                window.location.hash = target;
            });
        });
    };

    (function ssInit() {
        clPreloader();
        clMenuOnScrolldown();
        clOffCanvas();
        clPhotoswipe();
        clStatCount();
        clMasonryFolio();
        clSlickSlider();
        clSmoothScroll();
        clPlaceholder();
        clAlertBoxes();
        clContactForm();
        clAOS();
        clAjaxChimp();
        clBackToTop();
    })();      
})(jQuery);