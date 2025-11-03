    
$(document).ready(function() {
    var $mainCarousel = $(".video-carousel").first();
    var $modalCarousel = $(".modal-carousel");
    var pressTimer;
    var currentSlide = 0;
  
    // Initialize main carousel
    $mainCarousel.owlCarousel({
      items: 1,
      dots: true,
      autoHeight: false, 
      mouseDrag: false,  // Disable mouse dragging
      touchDrag: false,   // Disable touch dragging
      dotsClass: 'video-dots'
    });
  

    // Initialize modal carousel only once
    var modalCarouselInitialized = false;

    $('#videoCarouselModal').on('shown.bs.modal', function () {
      if (!modalCarouselInitialized) {
        $(".modal-carousel").owlCarousel({
          items: 1,
          dots: true,
          dotsClass: 'video-dots'
        });
        modalCarouselInitialized = true;
      }
    });

    function syncCarousels() {
      $mainCarousel.on('changed.owl.carousel', function(event) {
        currentSlide = event.item.index;
        $modalCarousel.trigger('to.owl.carousel', [currentSlide, 0]);
      });
  
      $modalCarousel.on('changed.owl.carousel', function(event) {
        currentSlide = event.item.index;
        $mainCarousel.trigger('to.owl.carousel', [currentSlide, 0]);
      });
    }

    // On item click, open modal and go to specific slide
    $('.video-item').on('mousedown touchstart', function(e) {
      // Start tracking the press
      pressTimer = setTimeout(function() {
        // Do nothing on long press
      }, 500); // Adjust the long press duration
    }).on('mouseup touchend', function(e) {
      clearTimeout(pressTimer);
      var slideTo = $(this).data('slide-to');
      var carouselModal = new bootstrap.Modal(document.getElementById('videoCarouselModal'));
      carouselModal.show();
  
      $('#videoCarouselModal').on('shown.bs.modal', function () {
        $modalCarousel.trigger('to.owl.carousel', [slideTo, 0]); // Jump to the startPosition without animation; [slideTo, 300]
      });

      syncCarousels();
    });
  
    // Reset modal carousel position when closed
    // $('#videoCarouselModal').on('hidden.bs.modal', function() {
    //   $modalCarousel.trigger('to.owl.carousel', [0, 0]);
    // });
  });
  