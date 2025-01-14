$('.owl-carousel-coach').owlCarousel({
  loop:true,
  margin: 12,
  nav:false,
  dots:false,
  center: true,
  autoplay: true,
  slideTransition: 'linear',
  autoplayTimeout: 2000,
  autoplaySpeed: 2000,
  autoplayHoverPause: true,
  responsive:{
      0:{
        items:1.5,
        center: false,
        stagePadding: 10,
      },
      576:{
        items:2.5,
        center: false,
        stagePadding: 10,
      },
      992:{
        items:3.5
      },
      1200:{
        items:4.5
      },
      1400:{
        items:5.5
    }
  }
});


$(".owl-carousel-strategy").owlCarousel({
  nav: true,
  loop: false,
  dots: false,
  pagination: false,
  margin: 10,
  autoHeight: false,
  center: true,
  navClass:['strategy-prev','strategy-next'],
  responsive: {
    0: {
      startPosition: 0,
      items: 1.3,
      stagePadding: 0,
      margin: 10,
      center: false,
      loop: true,
      nav:false,
    },
    470: {
      startPosition: 0,
      items: 1.3,
      stagePadding: 10,
      center: false,
      loop: true,
      nav:false,
    },
    640: {
      startPosition: 0,
      items: 1.5,
      stagePadding: 20,
      center: false,
      loop: true,
      nav:false,
    },
    768: {
      startPosition: 0,
      items: 1.8,
      stagePadding: 20,
      center: false,
      loop: true,
      nav:false,
    },
    992: {
      startPosition: 1,
      items: 2.7,
      stagePadding: 20,
    },
    1440: {
      startPosition: 1,
      items: 3.5,
      stagePadding: 10,
    }
  },
});

$('.strategy .owl-nav').css('opacity', '0');
$('.owl-carousel-strategy').hover(
  function() {
    // 滑鼠進入時顯示按鈕
    $('.strategy .owl-nav').css('opacity', '1');
    // .css('opacity', '1');
  },
  function() {
    // 滑鼠離開時隱藏按鈕
    $('.strategy .owl-nav').css('opacity', '0');
  }
);

$('.owl-carousel-skiResort').owlCarousel({
  nav: true,
  loop: false,
  dots: false,
  pagination: false,
  margin: 20,
  autoHeight: false,
  center: true,
  navClass:['skiResort-prev','skiResort-next'],
  responsive:{
      0:{
        items: 1.2,
        center: false,
        nav:false,
        loop: true,
      },
      390: {
        items: 1.4,
        center: false,
        nav:false,
        loop: true,
      },
      576:{
        items: 1.6,
        center: false,
        loop: true,
        nav:false,
      },
      768:{
        items: 2.6,
        center: false,
        loop: true,
        nav:false,
      },
      992:{
        items: 2.8
      },
      1120: {
        items: 3.4
      }
  }
});

$('.owl-carousel-skiResort.owl-nav').css('opacity', '0');
$('.owl-carousel-skiResort').hover(
  function() {
    // 滑鼠進入時顯示按鈕
    $('.owl-carousel-skiResort .owl-nav').css('opacity', '1');
    // .css('opacity', '1');
  },
  function() {
    // 滑鼠離開時隱藏按鈕
    $('.owl-carousel-skiResort .owl-nav').css('opacity', '0');
  }
);

$('.owl-banner').owlCarousel({
  loop:true,
  nav:false,
  dots:false,
  items:1,
});

$(".owl-carousel-article").owlCarousel({
  nav: false,
  loop: true,
  dots: false,
  center: false,
  pagination: false,
  margin: 0,
  center: false,
  responsive: {
    0: {
      startPosition: 0,
      items: 1.2,
      stagePadding: 0,
      margin: 8,
    },
    576:{
      items: 1.2,
      startPosition: 0,
      stagePadding: 0,
      margin: 8,
    },
    768: {
      items: 2.1,
      startPosition: 0,
      stagePadding: 0,
      margin: 8,
    },
    992: {
      startPosition: 0,
      items: 1.2,
      stagePadding: 0,
      margin: 8,
    },
    1120: {
      startPosition: 0,
      items: 1.2,
      stagePadding: 0,
      margin: 8,
    },
    1200: {
      startPosition: 0,
      items: 1.2,
      stagePadding: 0,
      margin: 8,
    },
  },
});

$('.article-prev').click(function() {
  $('.owl-carousel-article').trigger('prev.owl.carousel');
});

$('.article-next').click(function() {
  $('.owl-carousel-article').trigger('next.owl.carousel');
});