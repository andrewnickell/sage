jQuery(document).ready(function($) {

  (function($, win) {
    $.fn.inViewport = function(cb) {
      return this.each(function(i, el) {
        function visPx() {
          var H = $(this).height(),
            r = el.getBoundingClientRect(),
            t = r.top,
            b = r.bottom;
          return cb.call(el, Math.max(0, t > 0 ? H - t : (b < H ? b : H)));
        }
        visPx();
        $(win).on("resize scroll", visPx);
      });
    };
  }(jQuery, window));



  /* ------------------------------------------------------------------------
    COUNTDOWN
   ------------------------------------------------------------------------*/
  $('.kd-countdown').each(function(index, value) {
    var text_days = $(this).attr("data-text-days");
    var text_hours = $(this).attr("data-text-hours");
    var text_minutes = $(this).attr("data-text-minutes");
    var text_seconds = $(this).attr("data-text-seconds");

    var count_year = $(this).attr("data-count-year");
    var count_month = $(this).attr("data-count-month");
    var count_day = $(this).attr("data-count-day");
    var count_date = count_year + '/' + count_month + '/' + count_day;
    $(this).countdown(count_date, function(event) {
      $(this).html(
        event.strftime('<span class="CountdownContent">%D<span class="CountdownLabel">' + text_days + '</span></span><span class="CountdownSeparator">:</span><span class="CountdownContent">%H <span class="CountdownLabel">' + text_hours + '</span></span><span class="CountdownSeparator">:</span><span class="CountdownContent">%M <span class="CountdownLabel">' + text_minutes + '</span></span><span class="CountdownSeparator">:</span><span class="CountdownContent">%S <span class="CountdownLabel">' + text_seconds + '</span></span>')
      );
    });
  });


  /* ------------------------------------------------------------------------
    PIE CHART
   ------------------------------------------------------------------------*/

  jQuery(".kd_pie_chart .kd_chart").each(function(index, value) {
    jQuery(this).appear(function() {
      jQuery(this).easyPieChart({
        easing: "easeInQuad",
        barColor: "#000",
        trackColor: "rgba(210, 210, 210, 0.2)",
        animate: 2000,
        size: "160",
        lineCap: 'square',
        lineWidth: "2",
        scaleColor: false,
        onStep: function(from, to, percent) {
          jQuery(this.el).find(".pc_percent").text(Math.round(percent));
        }
      });
    });
    var chart = window.chart = jQuery("kd_pie_chart .kd_chart").data("easyPieChart");
  });

  /* ------------------------------------------------------------------------
    COUNTERS
   ------------------------------------------------------------------------*/

  jQuery(".kd_number_string").each(function(index, value) {
    jQuery(this).appear(function() {
      jQuery(this).countTo();
    });
  });





  /* ------------------------------------------------------------------------
      REFRESH GOOGLE MAP WITH THE ACTIVE TAB
   ------------------------------------------------------------------------*/
  if (jQuery(".contact-map-container").length) {
    jQuery('.vc_tta-tabs a').on('show.vc.tab', function() {
      setTimeout(function() {
        google.maps.event.trigger(window, 'resize', {});
      }, 500)
    });
  }

  jQuery('.toggle-map-info').on('click', function(e) {
    e.preventDefault();
    jQuery('.business-info-wrapper').toggleClass('minimize');
  });


  /* ------------------------------------------------------------------------
      VIDEO MODAL
   ------------------------------------------------------------------------*/

  function autoPlayYouTubeModal() {
    var trigger = $("body").find('.video-container [data-toggle="modal"]');
    trigger.click(function() {
      var theModal = $(this).data("target");
      videoSRC = $(this).data("src");
      videoSRCauto = videoSRC + "?autoplay=1";
      $(theModal + ' iframe').attr('src', videoSRCauto);
      $(theModal + ' button.close').click(function() {
        $(theModal + ' iframe').attr('src', videoSRC);
      });
      $('.modal').click(function() {
        $(theModal + ' iframe').attr('src', videoSRC);
      });
    });
  }
  autoPlayYouTubeModal();

  function autoPlayVideoModal() {
    var trigger = $("body").find('.video-container [data-toggle="modal"]');
      trigger.click(function() {
      var theModal = $(this).data("target");
      if ($(theModal + ' .video-modal-local').length) {
        $(theModal + ' .video-modal-local')[0].play();
      }
    });
  }
  autoPlayVideoModal();


  $('.video-modal').on('hidden.bs.modal', function (e) {
        if ($('.video-modal-local').length) {
        $('.video-modal-local')[0].pause();
      }
   });

  if (jQuery(".modal.video-modal").length > 0) {
    jQuery(".video-modal").each(function() {
      jQuery(this).insertAfter("#footer");
    });
  }

  /* ------------------------------------------------------------------------
    FEATURE SECTIONS
   ------------------------------------------------------------------------*/
  if (jQuery(".feature-sections-wrapper").length > 0) {
    jQuery('body').scrollspy({
      offset: 180,
      target: '.kd-feature-tabs'
    });
  }


});


jQuery(window).load(function() {

    /* ------------------------------------------------------------------------
    TEXT ROTATOR
   ------------------------------------------------------------------------*/

  jQuery(".kd-text-rotator").each(function(index, value) {
    jQuery(this).appear(function() {
      jQuery(this).addClass("start-rotator");
    });
  });

  jQuery(".kd-animated, .portfolio-item, .play-video, .toggle-map").inViewport(function(px) {
    if (px) jQuery(this).addClass("kd-animate");
  });

  /* ------------------------------------------------------------------------
  STICKY NAVIGATION ELEMENT
 ------------------------------------------------------------------------*/


  if (jQuery(".feature-sections-wrapper").length > 0) {
    jQuery(".feature-sections-wrapper").each(function() {
      jQuery("li.nav-label", this).appendTo(jQuery(".sticky-tabs", this));
    });

    jQuery('.sticky-tabs li a[href*=#]').bind('click', function(e) {
      e.preventDefault();
      var target = jQuery(this).attr("href");
      jQuery('html, body').stop().animate({
        scrollTop: jQuery(target).offset().top - 176
      }, 1000, 'easeOutCubic');
      return false;
    });

   var feature_container = jQuery(".feature-sections-wrapper");
    var feature_nav = jQuery(".feature-sections-tabs");
    var offset = feature_container.offset().top;

    jQuery(window).scroll(function(event) {
      var scroll = jQuery(window).scrollTop();
      var total = feature_container.height() + offset - 200;
      if (scroll > total) {
        feature_nav.addClass('sticky-hide')
      }
      if (scroll < total) {
        feature_nav.removeClass('sticky-hide')
      }
    });
  }

  if (jQuery(".features-tabs").length) {
    jQuery('.features-tabs').easytabs({
      updateHash: false,
      animationSpeed: 'fast',
      transitionIn: 'fadeIn'
    });
  }

  /* ------------------------------------------------------------------------
  MASONRY GALLERY ELEMENT
 ------------------------------------------------------------------------*/

  if (jQuery('.mg-gallery').length > 0) {
    jQuery('.mg-gallery').each(function() {
      var msnry = new Masonry(this, {
        itemSelector: '.mg-single-img',
        columnWidth: '.mg-sizer',
        percentPosition: true,
        gutter: 30
      });
    });
    var classes = '.vc_tta-tabs-list .vc_tta-tab,' + '.vc_pagination .vc_pagination-item';
    jQuery('body').on('click', classes,
      function() {
        setInterval(function(){
        var reloadMasonry = jQuery('.vc_active .mg-gallery').masonry({
            itemSelector: '.mg-single-img',
            columnWidth: '.mg-sizer',
            percentPosition: true,
            gutter: 30
        });
        reloadMasonry.masonry("reloadItems");
        reloadMasonry.masonry('layout');
        },200);
      });
  }

  /* ------------------------------------------------------------------------
  ALERT BOX ELEMENT
 ------------------------------------------------------------------------*/

  jQuery('.kd-alertbox .ab-close').on('click', function(e) {
    e.preventDefault();
    jQuery(this).closest('.kd-alertbox').hide(200);
  });

  /* ------------------------------------------------------------------------
 LOGIN FORM
------------------------------------------------------------------------*/
  jQuery('#user_login').attr('placeholder', 'Username');
  jQuery('#user_pass').attr('placeholder', 'Password');

});
