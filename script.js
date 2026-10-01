(function () {
  "use strict";

  let resizeTimeout;
  function fitExactDesign() {
    var mobile = document.querySelector(".responsive-mobile");
    var desktop = document.querySelector(".responsive-desktop");
    var isMobile = window.innerWidth <= 768;
    var wrapper = isMobile ? mobile : desktop;
    if (mobile) mobile.style.display = isMobile ? 'block' : 'none';
    if (desktop) desktop.style.display = !isMobile ? 'block' : 'none';
    if (!wrapper) return;

    var baseWidth = isMobile ? 390 : 1920;
    var scale = Math.min(1, window.innerWidth / baseWidth);

    wrapper.style.transform = "scale(" + scale + ") translateZ(0)";
    wrapper.style.transformOrigin = "top center";
    wrapper.style.width = baseWidth + "px";
    wrapper.style.willChange = "transform";

    var root = isMobile
      ? wrapper.querySelector("#__x2d_body")
      : wrapper.querySelector("#__0") || wrapper.firstElementChild;

    if (root) {
        root.style.overflow = "visible";
    }

    if (isMobile) {
        var heroBg = wrapper.querySelector("#home-image-slider-1");
        if (heroBg) {
            var currentHeight = 702;
            var targetHeight = window.innerHeight / scale;
            var diff = Math.max(0, targetHeight - currentHeight);

            heroBg.style.height = (currentHeight + diff) + "px";
            var heroImg = heroBg.querySelector("#Image");
            if (heroImg) heroImg.style.height = (currentHeight + diff) + "px";

            var els = wrapper.querySelectorAll('#__x2d_body > *:not(#navbar-container), #Container > *:not(#home-image-slider-1)');
            els.forEach(function(el) {
                if (!el.dataset.origTop) {
                    var topStr = window.getComputedStyle(el).top;
                    el.dataset.origTop = (topStr && topStr !== 'auto') ? parseFloat(topStr) : 0;
                }
                var origTop = parseFloat(el.dataset.origTop);
                if (origTop >= 700) {
                    el.style.top = (origTop + diff) + "px";
                } else if (origTop >= 300 && origTop < 600) {
                    el.style.top = (origTop + diff / 2) + "px";
                } else if (origTop >= 600 && origTop < 700) {
                    el.style.top = (origTop + diff) + "px";
                }
            });

            var rootBody = wrapper.querySelector('#__x2d_body');
            var containerDiv = wrapper.querySelector('#Container');
            if (rootBody) {
                if (!rootBody.dataset.origHeight) rootBody.dataset.origHeight = 6967;
                var newBodyHeight = parseFloat(rootBody.dataset.origHeight) + diff;
                rootBody.style.minHeight = newBodyHeight + "px";
                rootBody.style.maxHeight = newBodyHeight + "px";
                rootBody.style.height = newBodyHeight + "px";
            }
            if (containerDiv) {
                if (!containerDiv.dataset.origHeight) containerDiv.dataset.origHeight = 7180;
                containerDiv.style.height = (parseFloat(containerDiv.dataset.origHeight) + diff) + "px";
            }
        }
    }

    var baseHeight = root ? root.getBoundingClientRect().height / scale : wrapper.scrollHeight;
    wrapper.style.height = (baseHeight * scale) + "px";
    wrapper.style.marginBottom = "0";
    document.body.style.overflowX = "hidden";
  }

  function debouncedFit() {
      if(resizeTimeout) cancelAnimationFrame(resizeTimeout);
      resizeTimeout = requestAnimationFrame(fitExactDesign);
  }

  window.addEventListener("resize", debouncedFit, { passive: true });
  window.addEventListener("orientationchange", debouncedFit, { passive: true });
  document.addEventListener("DOMContentLoaded", fitExactDesign);
  window.addEventListener("load", fitExactDesign);
  fitExactDesign();
})();

/* Founder & Co-Founder Card Slider Animation */
function initFounderCardSlider() {
  const cardSliders = document.querySelectorAll('.founder-card-slider');

  cardSliders.forEach(slider => {
    const slides = slider.querySelectorAll('.founder-slide');
    if (slides.length < 2) return;

    let currentIndex = 0;
    let autoPlayTimer = null;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        if (i === index) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
      currentIndex = index;
    }

    function nextSlide() {
      const nextIndex = (currentIndex + 1) % slides.length;
      showSlide(nextIndex);
    }

    function startAutoPlay() {
      stopAutoPlay();
      autoPlayTimer = setInterval(nextSlide, 4500);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    slider.addEventListener('click', () => {
      nextSlide();
      startAutoPlay();
    });

    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);

    startAutoPlay();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFounderCardSlider);
} else {
  initFounderCardSlider();
}
function initCustomSlideshows() {
  const slideshows = document.querySelectorAll('.custom-slideshow');
  slideshows.forEach(show => {
    let imgs = show.querySelectorAll('.slide');
    if (imgs.length === 0) return;
    let idx = 0;
    setInterval(() => {
      imgs[idx].style.opacity = '0';
      idx = (idx + 1) % imgs.length;
      imgs[idx].style.opacity = '1';
    }, 3500);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCustomSlideshows);
} else {
  initCustomSlideshows();
}
