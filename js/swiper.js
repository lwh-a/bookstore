var thumbSwiper = new Swiper(".thumbSwiper", {
    slidesPerView: 7,
    spaceBetween: 10,
    watchSlidesProgress: true,
    slideToClickedSlide: true
});

var slider_swiper = new Swiper(".sliderSwiper", {
    navigation: {
        nextEl: "#slider .swiper-button-next",
        prevEl: "#slider .swiper-button-prev",
    },
    thumbs: {
        swiper: thumbSwiper, // ⭐ 이거 추가
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