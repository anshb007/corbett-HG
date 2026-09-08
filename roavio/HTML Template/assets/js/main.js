(function($) {
    "use strict";
  
    const $documentOn = $(document);
    const $windowOn = $(window);
  
    $documentOn.ready( function() {
  
      //>> Mobile Menu Js Start <<//
     //>> Mobile Menu Js Start <<//
        $('#mobile-menu').meanmenu({
            meanMenuContainer: '.mobile-menu',
            meanScreenWidth: "1199",
            meanExpand: ['<i class="far fa-plus"></i>'],
        });

  
   
      //>> Sidebar Toggle Js Start <<//
     //>> Sidebar Toggle Js Start <<//
        $(".offcanvas__close,.offcanvas__overlay").on("click", function() {
            $(".offcanvas__info").removeClass("info-open");
            $(".offcanvas__overlay").removeClass("overlay-open");
        });
        $(".sidebar__toggle").on("click", function() {
            $(".offcanvas__info").addClass("info-open");
            $(".offcanvas__overlay").addClass("overlay-open");
        });
  
      //>> Body Overlay Js Start <<//
      $(".body-overlay").on("click", function() {
            $(".offcanvas__area").removeClass("offcanvas-opened");
            $(".df-search-area").removeClass("opened");;
            $(".body-overlay").removeClass("opened");
        });
  

        

    /* ================================
     Back To Top Button Js Start
    ================================ */

  // Function to toggle back-to-top button visibility
    function toggleBackTop() {
        if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
            $("#back-top").addClass("show");
        } else {
            $("#back-top").removeClass("show");
        }
    }

    // On scroll
    $windowOn.on('scroll', function() {
        toggleBackTop();
    });

    // On document ready, force hide the button
    $(document).ready(function() {
        $("#back-top").removeClass("show");
    });

    // On click
    $documentOn.on('click', '#back-top', function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    
      //>> Sticky Header Js Start <<//
  
      $windowOn.on("scroll", function () {
        if ($(this).scrollTop() > 250) {
          $("#header-sticky").addClass("sticky-header");
        } else {
          $("#header-sticky").removeClass("sticky-header");
        }
      });      
      
      //>> Video Popup Start <<//
      $(".img-popup").magnificPopup({
        type: "image",
        gallery: {
          enabled: true,
        },
      });

      $(".img-popup2").magnificPopup({
        type: "image",
        gallery: {
          enabled: true,
        },
      });
  
      $(".video-popup").magnificPopup({
        type: "iframe",
        callbacks: {},
      });
  
      //>> Counterup Start <<//
      $(".count").counterUp({
        delay: 15,
        time: 4000,
      });
  
      //>> Wow Animation Start <<//
      new WOW().init();
  
      //>> Nice Select Start <<//
        if ($('.single-select').length) {
          $('.single-select').niceSelect();
      }

        //>> Brand Slider Start <<//
         if($('.brand-slider').length > 0) {
            const brandSlider = new Swiper(".brand-slider", {
                spaceBetween: 30,
                speed: 1300,
                loop: true,
                centeredSlides: true,
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },

                breakpoints: {
                    1199: {
                        slidesPerView: 7,
                    },
                    991: {
                        slidesPerView: 4,
                    },
                    767: {
                        slidesPerView: 3,
                    },
                    575: {
                        slidesPerView: 2,
                    },
                    0: {
                        slidesPerView: 2,
                    },
                },
            });
        }

    
    //>> Testimonial Slider Start <<//
        if($('.testimonial-slider').length > 0) {
        const testimonialSlider = new Swiper(".testimonial-slider", {
        spaceBetween: 30,
        speed: 1300,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".dot2",
            clickable: true,
        },
        breakpoints: {
            1199: {
                slidesPerView: 1,
            },
            991: {
                slidesPerView: 1,
            },
            767: {
                slidesPerView: 1,
            },
            575: {
                slidesPerView: 1,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });
}

    //>> Testimonial Slider Start <<//
        if($('.testimonial-slider-2').length > 0) {
        const testimonialSlider2 = new Swiper(".testimonial-slider-2", {
        spaceBetween: 30,
        speed: 1300,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".dot2",
            clickable: true,
        },
        breakpoints: {
            1199: {
                slidesPerView: 3,
            },
            991: {
                slidesPerView: 2,
            },
            767: {
                slidesPerView: 2,
            },
            575: {
                slidesPerView: 1,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });
}

     // Swiper init
    if ($('.team-slider-4').length > 0) {
        new Swiper(".team-slider-4", {
            spaceBetween: 30,
            speed: 1300,
            loop: true,
            autoplay: { delay: 2000, disableOnInteraction: false },
            navigation: {
                nextEl: ".array-prev",
                prevEl: ".array-next",
            },
             pagination: {
                 el: ".dot3",
                 clickable: true,
             },
            breakpoints: {
                1199: { slidesPerView: 4 },
                991: { slidesPerView: 3 },
                767: { slidesPerView: 2 },
                575: { slidesPerView: 1 },
                0: { slidesPerView: 1 },
            },
        });
    }

    // Hover effect
    const teamCards = document.querySelectorAll('.team-card-items-4');
    teamCards.forEach(card => {
        const image = card.querySelector('.team-image img');
        card.addEventListener('mouseenter', () => {
            image.style.height = '350px';
            image.style.transform = 'translateY(-50px)';
        });
        card.addEventListener('mouseleave', () => {
            image.style.height = '300px';
            image.style.transform = 'translateY(0)';
        });
    });
        //>> Hero-1 Slider Start <<//
         const sliderActive2 = ".hero-slider";
         const sliderInit2 = new Swiper(sliderActive2, {
             loop: true,
             slidesPerView: 1,
             effect: "fade",
             speed: 3000,
             autoplay: {
                 delay: 3000,
                 disableOnInteraction: false,
             },
             
             pagination: {
                el: ".dot",
                clickable: true,
            },
         });
 
        function animated_swiper(selector, init) {
            const animated = function animated() {
                $(selector + " [data-animation]").each(function () {
                    let anim = $(this).data("animation");
                    let delay = $(this).data("delay");
                    let duration = $(this).data("duration");
                    $(this)
                        .removeClass("anim" + anim)
                        .addClass(anim + " animated")
                        .css({
                            webkitAnimationDelay: delay,
                            animationDelay: delay,
                            webkitAnimationDuration: duration,
                            animationDuration: duration,
                        })
                        .one("animationend", function () {
                            $(this).removeClass(anim + " animated");
                        });
                });
            };
            animated();
            init.on("slideChange", function () {
                $(sliderActive2 + " [data-animation]").removeClass("animated");
            });
            init.on("slideChange", animated);
        }
        animated_swiper(sliderActive2, sliderInit2);

        //>> Adventure Slider Start <<//
            if($('.adventure-slider').length > 0) {
            const AdventurelSlider = new Swiper(".adventure-slider", {
            spaceBetween: 30,
            speed: 1300,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".dot3",
                clickable: true,
            },
            breakpoints: {
                1199: {
                    slidesPerView: 4,
                },
                991: {
                    slidesPerView:3,
                },
                767: {
                    slidesPerView: 2,
                },
                575: {
                    slidesPerView: 1,
                },
                0: {
                    slidesPerView: 1,
                },
            },
        });
    }

    //>> gallery Slider Start <<//
         if($('.gallery-slider').length > 0) {
         const gallerySlider = new Swiper(".gallery-slider", {
            spaceBetween: 10,
            speed: 1300,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },

            breakpoints: {
                1399: {
                    slidesPerView: 5,
                },
                1199: {
                    slidesPerView: 4,
                },
                991: {
                    slidesPerView: 3.5,
                },
                767: {
                    slidesPerView: 2.8,
                },
                575: {
                    slidesPerView: 1.5,
                },
                0: {
                    slidesPerView: 1.1,
                },
            },
        });
    }

     //>> gallery Slider2 Start <<//
        if ($('.gallery-slider-2').length > 0) {
         const gallerySlider2 = new Swiper(".gallery-slider-2", {
            spaceBetween: 10,
            speed: 1300,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
                 reverseDirection: true,
            },

            breakpoints: {
                1399: {
                    slidesPerView: 5,
                },
                1199: {
                    slidesPerView: 4,
                },
                991: {
                    slidesPerView: 3.5,
                },
                767: {
                    slidesPerView: 2.8,
                },
                575: {
                    slidesPerView: 1.5,
                },
                0: {
                    slidesPerView: 1.1,
                },
            },
        });
    }

    //>> Heros Slider Start <<//
     if($('.heros-slider').length > 0) {
      const herosSlider = new Swiper(".heros-slider", {
          spaceBetween: 30,
          speed: 1300,
          loop: true,
          centeredSlides: true,
          autoplay: {
              delay: 2000,
              disableOnInteraction: false,
          },
         
          breakpoints: {
              1199: {
                  slidesPerView: 3,
              },
              991: {
                  slidesPerView: 2,
              },
              767: {
                  slidesPerView: 1,
              },
              575: {
                  slidesPerView: 1,
              },
              0: {
                  slidesPerView: 1,
              },
          },
      });
      }

      //>> Top Slider Start <<//
     if($('.top-slider').length > 0) {
      const topSlider = new Swiper(".top-slider", {
          spaceBetween: 20,
          speed: 1300,
          loop: true,
          autoplay: {
              delay: 2000,
              disableOnInteraction: false,
          },
          navigation: {
            nextEl: ".array-prev",
            prevEl: ".array-next",
        },
          breakpoints: {
              1199: {
                  slidesPerView: 5,
              },
              991: {
                  slidesPerView: 4,
              },
              767: {
                  slidesPerView: 3,
              },
              575: {
                  slidesPerView: 2,
              },
              0: {
                  slidesPerView: 1.3,
              },
          },
      });
      }

       //>> Desti Slider Start <<//
      if($('.desti-slider').length > 0) {
      const destiSlider = new Swiper(".desti-slider", {
          spaceBetween: 20,
          speed: 1300,
          loop: true,
          autoplay: {
              delay: 2000,
              disableOnInteraction: false,
          },
          navigation: {
            nextEl: ".array-prev",
            prevEl: ".array-next",
        },
          breakpoints: {
              1199: {
                  slidesPerView: 6,
              },
              991: {
                  slidesPerView: 4,
              },
              767: {
                  slidesPerView: 3,
              },
              575: {
                  slidesPerView: 2,
              },
              0: {
                  slidesPerView: 1,
              },
          },
      });
      }

      //>> Destination Slider-4 Start <<//
      if($('.destination-slider-4').length > 0) {
      const destinationSlider4 = new Swiper(".destination-slider-4", {
          spaceBetween: 20,
          speed: 1300,
          loop: true,
          autoplay: {
              delay: 2000,
              disableOnInteraction: false,
          },
          navigation: {
            nextEl: ".array-prev",
            prevEl: ".array-next",
        },
        pagination: {
            el: ".dot2",
            clickable: true,
        },
          breakpoints: {
              1199: {
                  slidesPerView: 4,
              },
              991: {
                  slidesPerView: 3,
              },
              767: {
                  slidesPerView: 2,
              },
              575: {
                  slidesPerView: 2,
              },
              0: {
                  slidesPerView: 1,
              },
          },
      });
      }

      //>> Testimonial box Slider Start <<//
      if($('.testimonial-box-slider').length > 0) {
        const testimonialBoxSlider = new Swiper(".testimonial-box-slider", {
            slidesPerView: 'auto',
            spaceBetween: 20,
            freemode: true,
            centeredSlides: true,
            loop: true,
            speed: 6000,
            allowTouchMove: false,
            autoplay: {
                delay: 1,
                disableOnInteraction: true,
            },
        });
    }

    //>>Testimonial box Slider2 Start <<//
    if($('.testimonial-box-slider-2').length > 0) {
        const testimonialBoxSlider2 = new Swiper(".testimonial-box-slider-2", {
            slidesPerView: 'auto',
            spaceBetween: 20,
            freemode: true,
            centeredSlides: true,
            loop: true,
            speed: 6000,
            allowTouchMove: false,
            autoplay: {
                delay: 1,
                disableOnInteraction: true,
            },
        });
    }

      //>> Project Hover Js Start <<//
    $(document).on('mouseenter', '.box-2', function() {
    $('.box-2').removeClass('active');
    $(this).addClass('active');
    });


      $(document).on('click', '.nav-link[data-bs-toggle="tab"]', function (e) {
        e.preventDefault();
        var target = $(this).attr('href');
        
        $('.nav-link').removeClass('active');
        $('.tab-pane').removeClass('active show');
        
        $(this).addClass('active');
        $(target).addClass('active show');
        });

      
 //>> Nice Select Start <<//
        $('select').niceSelect();
      /* ================================
       Custom Accordion Js Start
    ================================ */
    $(".accordion-single .header-area").on("click", function () {
        if ($(this).closest(".accordion-single").hasClass("active")) {
            $(this).closest(".accordion-single").removeClass("active");
            $(this).next(".content-area").slideUp();
        } else {
            $(".accordion-single").removeClass("active");
            $(this).closest(".accordion-single").addClass("active");
            $(".content-area").not($(this).next(".content-area")).slideUp();
            $(this).next(".content-area").slideToggle();
        }
    });

    //>> Search Start <<//
     if ($(".search-toggler").length) {
        $(".search-toggler").on("click", function(e) {
            e.preventDefault();
            $(".search-popup").toggleClass("active");
            $("body").toggleClass("locked");
        });
    }


    //>> MouseCursor Start <<//
    if ($(".mouseCursor").length > 0) {
        function itCursor() {
            var myCursor = jQuery(".mouseCursor");
            if (myCursor.length) {
                if ($("body")) {
                    const e = document.querySelector(".cursor-inner"),
                        t = document.querySelector(".cursor-outer");
                    let n,
                        i = 0,
                        o = !1;
                    (window.onmousemove = function(s) {
                        o ||
                            (t.style.transform =
                                "translate(" + s.clientX + "px, " + s.clientY + "px)"),
                            (e.style.transform =
                                "translate(" + s.clientX + "px, " + s.clientY + "px)"),
                            (n = s.clientY),
                            (i = s.clientX);
                    }),
                    $("body").on(
                            "mouseenter",
                            "button, a, .cursor-pointer",
                            function() {
                                e.classList.add("cursor-hover"),
                                    t.classList.add("cursor-hover");
                            }
                        ),
                        $("body").on(
                            "mouseleave",
                            "button, a, .cursor-pointer",
                            function() {
                                ($(this).is("a", "button") &&
                                    $(this).closest(".cursor-pointer").length) ||
                                (e.classList.remove("cursor-hover"),
                                    t.classList.remove("cursor-hover"));
                            }
                        ),
                        (e.style.visibility = "visible"),
                        (t.style.visibility = "visible");
                }
            }
        }
        itCursor();
    }

    //>> Price Slider Start <<//
    
    if ($('.price-slider-range').length) {
            $(".price-slider-range").slider({
                range: true,
                min: 5,
                max: 1000,
                values: [100, 750],
                slide: function(event, ui) {
                    $("#price").val("$ " + ui.values[0] + " - $ " + ui.values[1]);
                }
            });
            $("#price").val("$ " + $(".price-slider-range").slider("values", 0) +
                " - $ " + $(".price-slider-range").slider("values", 1));
    }


    if ($(".text-anim").length) {
        let staggerAmount = 0.03,
            translateXValue = 20,
            delayValue = 0.1,
            easeType = "power2.out",
            animatedTextElements = document.querySelectorAll(".text-anim");

        animatedTextElements.forEach(element => {
            let animationSplitText = new SplitText(element, { type: "chars, words" });

            // ScrollTrigger দিয়ে section এ ঢুকলে animation শুরু হবে
            ScrollTrigger.create({
                trigger: element,
                start: "top 85%",
                onEnter: () => {
                    gsap.from(animationSplitText.chars, {
                        duration: 1,
                        delay: delayValue,
                        x: translateXValue,
                        autoAlpha: 0,
                        stagger: staggerAmount,
                        ease: easeType,
                    });
                },
            });
        });
    }


 /* ================================
       Smooth Scroller And Title Animation Js Start
    ================================ */
    if ($('#smooth-wrapper').length && $('#smooth-content').length) {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

        gsap.config({
            nullTargetWarn: false,
        });

        let smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 2,
            effects: true,
            smoothTouch: 0.1,
            normalizeScroll: false,
            ignoreMobileResize: true,
        });
    }

    }); // End Document Ready Function


     //>> Preloader Start <<//
    
   function loader() {
        $(window).on('load', function() {
            // Animate loader off screen
            $(".preloader").addClass('loaded');                    
            $(".preloader").delay(600).fadeOut();                       
        });
    }

    loader();

   
  
  })(jQuery); // End jQuery