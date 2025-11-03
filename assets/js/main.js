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
  
  // Close menu when clicking the close button (×) in mobile menu
  nav.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.parentNode && target.parentNode.tagName === 'UL') {
      // Check if clicked on the close button (pseudo element)
      const rect = target.parentNode.getBoundingClientRect();
      const closeBtnArea = {
        x: rect.right - 70, // 50px for button + 20px padding
        y: rect.top + 20,
        width: 50,
        height: 50
      };
      
      if (e.clientX >= closeBtnArea.x && e.clientX <= closeBtnArea.x + closeBtnArea.width &&
          e.clientY >= closeBtnArea.y && e.clientY <= closeBtnArea.y + closeBtnArea.height) {
        nav.setAttribute('data-open', 'false');
        toggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
}

// Current year in footer
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// Language selector functionality with full translation support
const langToggle = document.getElementById('langToggle');
let currentLang = localStorage.getItem('preferredLanguage') || 'EN';
let translations = {};

// Load translations
async function loadTranslations(lang) {
  try {
    const response = await fetch(`lang/${lang.toLowerCase()}.json`);
    if (response.ok) {
      translations = await response.json();
      applyTranslations();
      return true;
    } else {
      console.warn(`Failed to load ${lang} translations:`, response.status);
    }
  } catch (error) {
    console.warn(`Failed to load ${lang} translations:`, error);
  }
  return false;
}

// Apply translations to the page
function applyTranslations() {
  // Translate navigation
  const navLinks = document.querySelectorAll('.site-nav a');
  if (navLinks.length >= 6) {
    navLinks[0].textContent = translations.home || 'Home';
    navLinks[1].textContent = translations.about || 'About';
    navLinks[2].textContent = translations.products || 'Products';
    navLinks[3].textContent = translations.applications || 'Applications';
    navLinks[4].textContent = translations.gallery || 'Gallery';
    navLinks[5].textContent = translations.contact || 'Contact';
  }
  
  // Translate page-specific content based on current page
  const pageTitle = document.title.toLowerCase();
  
  if (pageTitle.includes('home') || pageTitle.includes('granix')) {
    // Homepage translations
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) heroTitle.textContent = translations.hero_title || heroTitle.textContent;
    
    const heroSubtitle = document.querySelector('.mission-statement');
    if (heroSubtitle) heroSubtitle.textContent = translations.hero_subtitle || heroSubtitle.textContent;
    
    const ctaPrimary = document.querySelector('.btn-primary');
    if (ctaPrimary) ctaPrimary.textContent = translations.cta_primary || ctaPrimary.textContent;
    
    const ctaSecondary = document.querySelector('.btn[href="gallery.html"]');
    if (ctaSecondary) ctaSecondary.textContent = translations.cta_secondary || ctaSecondary.textContent;
    
    const differenceTitle = document.querySelector('.granix-difference .section-title');
    if (differenceTitle) differenceTitle.textContent = translations.why_natural_stone || differenceTitle.textContent;
    
    const differenceCards = document.querySelectorAll('.difference-card');
    if (differenceCards.length >= 4) {
      const titles = [
        translations.durability_title,
        translations.unique_character_title,
        translations.ethical_provenance_title,
        translations.long_term_value_title
      ];
      const descriptions = [
        translations.durability_desc,
        translations.unique_character_desc,
        translations.ethical_provenance_desc,
        translations.long_term_value_desc
      ];
      
      differenceCards.forEach((card, index) => {
        const title = card.querySelector('h3');
        const desc = card.querySelector('p');
        if (title && titles[index]) title.textContent = titles[index];
        if (desc && descriptions[index]) desc.textContent = descriptions[index];
      });
    }
    
    const storyTitle = document.querySelector('.our-story-section .section-title');
    if (storyTitle) storyTitle.textContent = translations.our_story || storyTitle.textContent;
    
    const storySubtitle = document.querySelector('.our-story-section h3');
    if (storySubtitle) storySubtitle.textContent = translations.from_quarry || storySubtitle.textContent;
    
    const storyParagraphs = document.querySelectorAll('.our-story-section p');
    if (storyParagraphs.length >= 2) {
      storyParagraphs[0].textContent = translations.story_paragraph_1 || storyParagraphs[0].textContent;
      storyParagraphs[1].textContent = translations.story_paragraph_2 || storyParagraphs[1].textContent;
    }
    
    const promiseTitle = document.querySelector('.our-story-section .cert-name');
    if (promiseTitle) promiseTitle.textContent = translations.our_promise || promiseTitle.textContent;
    
    const highlightsTitle = document.querySelector('.highlights .section-title');
    if (highlightsTitle) highlightsTitle.textContent = translations.your_partner || highlightsTitle.textContent;
    
    const highlightCards = document.querySelectorAll('.card');
    if (highlightCards.length >= 4) {
      const cardTitles = [
        translations.products_title,
        translations.services_title,
        translations.applications_title,
        translations.quality_sourcing_title
      ];
      const cardDescriptions = [
        translations.products_desc,
        translations.services_desc,
        translations.applications_desc,
        translations.quality_sourcing_desc
      ];
      
      highlightCards.forEach((card, index) => {
        const title = card.querySelector('h3');
        const desc = card.querySelector('p');
        if (title && cardTitles[index]) title.textContent = cardTitles[index];
        if (desc && cardDescriptions[index]) desc.textContent = cardDescriptions[index];
      });
    }
  }
  
  // Update language button text
  const langText = langToggle.querySelector('.lang-text');
  if (langText) langText.textContent = currentLang;
  
  // Apply RTL for Arabic
  if (currentLang === 'AR') {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ar');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', 'en');
  }
}

// Initialize language functionality
async function initLanguage() {
  const langText = langToggle.querySelector('.lang-text');
  if (langText) langText.textContent = currentLang;
  
  // Load translations for current language
  if (currentLang === 'AR') {
    const success = await loadTranslations('AR');
    if (!success) {
      // Fallback to English if Arabic fails
      currentLang = 'EN';
      localStorage.setItem('preferredLanguage', currentLang);
      if (langText) langText.textContent = currentLang;
      await loadTranslations('EN');
    }
  } else {
    await loadTranslations('EN');
  }
  
  // Set up language toggle
  if (langToggle) {
    langToggle.addEventListener('click', async () => {
      // Toggle between EN and AR
      currentLang = currentLang === 'EN' ? 'AR' : 'EN';
      localStorage.setItem('preferredLanguage', currentLang);
      
      // Update UI
      if (langText) langText.textContent = currentLang;
      
      // Load and apply translations
      const success = await loadTranslations(currentLang);
      
      // If Arabic fails, fallback to English
      if (currentLang === 'AR' && !success) {
        currentLang = 'EN';
        localStorage.setItem('preferredLanguage', currentLang);
        if (langText) langText.textContent = currentLang;
        await loadTranslations('EN');
      }
      
      // Apply RTL for Arabic
      if (currentLang === 'AR') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
      } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', 'en');
      }
    });
  }
}

// Initialize language on page load
if (langToggle) {
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguage);
  } else {
    initLanguage();
  }
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

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80, // Adjust for header height
          behavior: 'smooth'
        });
      }
    }
  });
});

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

// Video mute toggle functionality
const extractionVideo = document.getElementById('extractionVideo');
const muteToggle = document.getElementById('muteToggle');

if (extractionVideo && muteToggle) {
  muteToggle.addEventListener('click', () => {
    extractionVideo.muted = !extractionVideo.muted;
    const icon = muteToggle.querySelector('.mute-icon');
    const text = muteToggle.querySelector('.mute-text');
    
    if (extractionVideo.muted) {
      icon.textContent = '🔇';
      text.textContent = 'Sound Off';
    } else {
      icon.textContent = '🔊';
      text.textContent = 'Sound On';
    }
  });
  
  // Hover effect for mute button
  muteToggle.addEventListener('mouseenter', () => {
    muteToggle.style.background = 'rgba(255,255,255,0.3)';
    muteToggle.style.transform = 'scale(1.05)';
  });
  
  muteToggle.addEventListener('mouseleave', () => {
    muteToggle.style.background = 'rgba(255,255,255,0.2)';
    muteToggle.style.transform = 'scale(1)';
  });
}