'use strict';

const preloader = document.querySelector("[data-preaload]");
window.addEventListener("load", function() {
    preloader.classList.add("loaded");
    this.document.body.classList.add("loaded");
});

const addEventElements =  function( elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
    }
}

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");
const toggleNavbar = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
}

addEventElements(navTogglers, 'click', toggleNavbar);

const header = document.querySelector("[data-header]");
const backToTop =  document.querySelector("[ data-back-top-btn]")
let lastScrollbar = 0;
const hideHeader = function() {
    const isScrollButton = lastScrollbar < window.scrollY;
    if(isScrollButton) {
        header.classList.add("hide");
    } else {
        header.classList.remove("hide")
    }
    lastScrollbar = window.scrollY
}

window.addEventListener("scroll", function() {
    if(this.window.scrollY > 50) {
        header.classList.add("active");
        backToTop.classList.add("active");
        hideHeader();
    } else {
        header.classList.remove("active");
        backToTop.classList.remove("active");
    }
});

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");
let currentSliderPos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSliderPos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSliderPos]
}




const sliderNext = function() {
        if(currentSliderPos > heroSliderItems.length - 1)  {
        currentSliderPos = 0;
    } else {
        currentSliderPos++;
    }
    updateSliderPos();
}


heroSliderNextBtn.addEventListener("click", sliderNext);

const sliderPrev = function() {
    if(currentSliderPos < 0) {
        currentSliderPos = heroSliderItems.length - 1;
    } else {
        currentSliderPos-- ;
    }
    updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", sliderPrev)

let autoSlideInterval;

const autoSlide = function () {
    autoSlideInterval = setInterval(function() {
        sliderNext();
    }, 7000)
}

addEventElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function() {
    clearInterval(autoSlideInterval)
});


addEventElements([heroSliderNextBtn, heroSliderPrevBtn] , "mouseout", autoSlide);
window.addEventListener("load", autoSlide);

const parallaxItems = document.querySelectorAll("[data-parallax-item]");
let x, y ;

window.addEventListener("mousemove", function(event) {
    x = (event.clientX / window.innerWidth * 10) - 5;
    y = (event.clientY / this.window.innerHeight * 10) - 5;
    x = x - ( x * 2);
    y = y - (y * 2);

    for (let i = 0, len = parallaxItems; i < len; i++) {
        x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
        x = y * Number(parallaxItems[i].dataset.parallaxSpeed);
        parallaxItems[i].computedStyleMap.transform = `translate3d(${x}px , ${y}px, 0px)`;
        }
});