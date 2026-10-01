// gallery.js - Minimalist Image Grid Lightbox
document.addEventListener('DOMContentLoaded', () => {
  const gridItems = document.querySelectorAll('.grid-item');
  const lightbox = document.getElementById('minimalLightbox');
  const lbImg = document.getElementById('lbImg');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');

  let currentIndex = 0;
  const images = Array.from(gridItems).map(item => item.querySelector('img').src);

  function openLightbox(index) {
    currentIndex = (index + images.length) % images.length;
    lbImg.src = images[currentIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function nextImage() {
    openLightbox(currentIndex + 1);
  }

  function prevImage() {
    openLightbox(currentIndex - 1);
  }

  gridItems.forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(idx));
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbNext) lbNext.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });
  if (lbPrev) lbPrev.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-image-wrapper')) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });
});
