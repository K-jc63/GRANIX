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

// Enhanced header on scroll
const header = document.querySelector('.site-header');
const backToTopBtn = document.getElementById('backToTop');
if (header) {
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Header effect
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Back to top button visibility
    if (backToTopBtn) {
      if (currentScroll > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
    
    lastScroll = currentScroll;
  }, { passive: true });
}

// Back to top button click handler
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Enhanced professional slider with smooth transitions
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
  let isTransitioning = false;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Preload images for smoother transitions
  slides.forEach((slide) => {
    const img = slide.querySelector('img');
    if (img && img.src) {
      const preload = new Image();
      preload.src = img.src;
    }
  });

  function update(smooth = true) {
    const slideWidth = slider.clientWidth;
    const offsetPx = -index * slideWidth;
    
    if (smooth && !prefersReducedMotion) {
      track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)';
    } else {
      track.style.transition = 'none';
    }
    
    track.style.transform = `translateX(${offsetPx}px)`;
    
    if (dots) {
      Array.from(dots.children).forEach((b, i) => {
        b.setAttribute('aria-current', String(i === index));
        b.classList.toggle('active', i === index);
      });
    }
    
    // Add active class to current slide for fade-in effect
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });
  }

  function goTo(i, smooth = true) {
    if (isTransitioning) return;
    isTransitioning = true;
    index = (i + slides.length) % slides.length;
    update(smooth);
    setTimeout(() => { isTransitioning = false; }, 600);
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      stopAutoplay();
      prev();
      startAutoplay();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      stopAutoplay();
      next();
      startAutoplay();
    });
  }

  function buildDots() {
    if (!dots) return;
    dots.innerHTML = '';
    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', `Go to slide ${i + 1}`);
      b.addEventListener('click', () => {
        stopAutoplay();
        goTo(i);
        startAutoplay();
      });
      dots.appendChild(b);
    });
  }

  buildDots();

  function startAutoplay() {
    if (prefersReducedMotion) return;
    stopAutoplay();
    // Longer interval for better image viewing (5 seconds)
    autoplayTimer = window.setInterval(next, 5000);
  }
  function stopAutoplay() {
    if (autoplayTimer) window.clearInterval(autoplayTimer);
    autoplayTimer = null;
  }

  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);
  slider.addEventListener('touchstart', stopAutoplay, { passive: true });

  // Enhanced swipe with visual feedback
  let startX = 0; let dx = 0; let startY = 0; let dy = 0;
  slider.addEventListener('touchstart', (e) => { 
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });
  
  slider.addEventListener('touchmove', (e) => { 
    dx = e.touches[0].clientX - startX;
    dy = e.touches[0].clientY - startY;
  }, { passive: true });
  
  slider.addEventListener('touchend', () => {
    // Only trigger if horizontal swipe is dominant
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 50) prev();
      if (dx < -50) next();
    }
    dx = 0;
    dy = 0;
    startAutoplay();
  });

  // Keyboard navigation
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      stopAutoplay();
      prev();
      startAutoplay();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      stopAutoplay();
      next();
      startAutoplay();
    }
  });
  slider.setAttribute('tabindex', '0');

  update(false);
  startAutoplay();
  
  // Keep alignment on resize with debouncing
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    if (resizeTimer) window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => update(false), 150);
  });

  // Remove broken images from the slider dynamically with fade out
  slides.forEach((slide) => {
    const img = slide.querySelector('img');
    if (!img) return;
    
    // Add loading state
    img.addEventListener('load', () => {
      slide.classList.add('loaded');
    }, { once: true });
    
    img.addEventListener('error', () => {
      console.warn('Failed to load image:', img.src);
      slide.style.opacity = '0';
      setTimeout(() => {
        const currentIndex = slides.indexOf(slide);
        slide.remove();
        slides = Array.from(slider.querySelectorAll('.slide'));
        if (index >= slides.length) index = Math.max(0, slides.length - 1);
        buildDots();
        update(false);
        // Hide controls if fewer than 2 slides remain
        const controls = slider.querySelector('.slider-controls');
        if (controls) controls.style.display = slides.length > 1 ? '' : 'none';
        if (dots) dots.style.display = slides.length > 1 ? '' : 'none';
      }, 300);
    }, { once: true });
  });

  // If no or single slide, adjust UI
  const controls = slider.querySelector('.slider-controls');
  if (controls) controls.style.display = slides.length > 1 ? '' : 'none';
  if (dots) dots.style.display = slides.length > 1 ? '' : 'none';
})();


