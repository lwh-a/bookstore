var slider_swiper = new Swiper(".sliderSwiper", {
    navigation: {
        nextEl: "#slider .swiper-button-next",
        prevEl: "#slider .swiper-button-prev",
    },
    pagination: {
        el: "#slider .swiper-pagination",
        clickable: true,
    },
});

// #new swiper
var new_swiper = new Swiper(".newSwiper", {
      slidesPerView: 5,
      spaceBetween: 10,
      pagination: {
        el: "#new .swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: "#new .swiper-button-next",
        prevEl: "#new .swiper-button-prev", 
      },
      slidesPerGroup: 5
    });