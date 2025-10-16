// Mobile nav toggle
const nav = document.querySelector('.site-nav');
const toggle = document.querySelector('.nav-toggle');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.getAttribute('data-open') === 'true';
    nav.setAttribute('data-open', String(!isOpen));
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });
  // Close menu when a link is clicked (improves small-screen UX)
  nav.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.closest && target.closest('a')) {
      nav.setAttribute('data-open', 'false');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Current year in footer
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// Simple slider
(function initSlider(){
  const slider = document.querySelector('.slider');
  if (!slider) return;
  const track = slider.querySelector('.slider-track');
  let slides = Array.from(slider.querySelectorAll('.slide'));
  const prevBtn = slider.querySelector('.prev');
  const nextBtn = slider.querySelector('.next');
  const dots = slider.querySelector('.slider-dots');
  let index = 0;
  let autoplayTimer = null;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function update() {
    const slideWidth = slider.clientWidth;
    const offsetPx = -index * slideWidth;
    track.style.transform = `translateX(${offsetPx}px)`;
    if (dots) {
      Array.from(dots.children).forEach((b, i) => b.setAttribute('aria-current', String(i === index)));
    }
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    update();
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  if (prevBtn) prevBtn.addEventListener('click', prev);
  if (nextBtn) nextBtn.addEventListener('click', next);

  function buildDots() {
    if (!dots) return;
    dots.innerHTML = '';
    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.addEventListener('click', () => goTo(i));
      dots.appendChild(b);
    });
  }

  buildDots();

  function startAutoplay() {
    if (prefersReducedMotion) return;
    stopAutoplay();
    autoplayTimer = window.setInterval(next, 3000);
  }
  function stopAutoplay() {
    if (autoplayTimer) window.clearInterval(autoplayTimer);
    autoplayTimer = null;
  }

  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);
  slider.addEventListener('touchstart', stopAutoplay, { passive: true });

  // Basic swipe
  let startX = 0; let dx = 0;
  slider.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchmove', (e) => { dx = e.touches[0].clientX - startX; }, { passive: true });
  slider.addEventListener('touchend', () => {
    if (dx > 40) prev();
    if (dx < -40) next();
    dx = 0;
    startAutoplay();
  });

  update();
  startAutoplay();
  // Keep alignment on resize
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    if (resizeTimer) window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(update, 100);
  });

  // Remove broken images from the slider dynamically
  slides.forEach((slide) => {
    const img = slide.querySelector('img');
    if (!img) return;
    img.addEventListener('error', () => {
      const currentIndex = slides.indexOf(slide);
      slide.remove();
      slides = Array.from(slider.querySelectorAll('.slide'));
      if (index >= slides.length) index = Math.max(0, slides.length - 1);
      buildDots();
      update();
      // Hide controls if fewer than 2 slides remain
      const controls = slider.querySelector('.slider-controls');
      if (controls) controls.style.display = slides.length > 1 ? '' : 'none';
      if (dots) dots.style.display = slides.length > 1 ? '' : 'none';
    }, { once: true });
  });

  // If no or single slide, adjust UI
  const controls = slider.querySelector('.slider-controls');
  if (controls) controls.style.display = slides.length > 1 ? '' : 'none';
  if (dots) dots.style.display = slides.length > 1 ? '' : 'none';
})();


