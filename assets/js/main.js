// Mobile nav toggle
const nav = document.querySelector('.site-nav');
const toggle = document.querySelector('.nav-toggle');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.getAttribute('data-open') === 'true';
    nav.setAttribute('data-open', String(!isOpen));
    toggle.setAttribute('aria-expanded', String(!isOpen));
    
    // Prevent body scroll when menu is open
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  
  // Close menu when a link is clicked (improves small-screen UX)
  nav.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.closest && target.closest('a')) {
      nav.setAttribute('data-open', 'false');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
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
        document.body.style.overflow = '';
      }
    }
  });
  
  // Close menu when clicking outside the menu
  document.addEventListener('click', (e) => {
    if (nav.getAttribute('data-open') === 'true' && 
        !nav.contains(e.target) && 
        !toggle.contains(e.target)) {
      nav.setAttribute('data-open', 'false');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
  
  // Close menu when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.getAttribute('data-open') === 'true') {
      nav.setAttribute('data-open', 'false');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      toggle.focus();
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

// Initialize language functionality
function initLanguage() {
  // Get saved language preference or default to English
  let currentLang = localStorage.getItem('preferredLanguage') || 'EN';
  
  // Update UI to show current language
  const langText = langToggle.querySelector('.lang-text');
  if (langText) langText.textContent = currentLang;
  
  // Apply RTL for Arabic if needed
  if (currentLang === 'AR') {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ar');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', 'en');
  }
  
  // Load translations for current language
  loadTranslations(currentLang);
  
  // Set up language toggle event listener
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      // Toggle between EN and AR
      const newLang = currentLang === 'EN' ? 'AR' : 'EN';
      
      // Save preference
      localStorage.setItem('preferredLanguage', newLang);
      
      // Update current language
      currentLang = newLang;
      
      // Update UI
      if (langText) langText.textContent = currentLang;
      
      // Apply RTL for Arabic
      if (currentLang === 'AR') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
      } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', 'en');
      }
      
      // Load and apply translations
      loadTranslations(currentLang);
    });
  }
}

// Load translations
async function loadTranslations(lang) {
  try {
    const response = await fetch(`lang/${lang.toLowerCase()}.json`);
    if (response.ok) {
      const translations = await response.json();
      applyTranslations(translations, lang);
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
function applyTranslations(translations, lang) {
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
  
  // Translate language selector
  const langText = document.querySelector('.lang-text');
  if (langText) {
    langText.textContent = translations.language || (lang === 'AR' ? 'اللغة' : 'EN');
  }
  
  // Translate video mute button if it exists
  const muteText = document.querySelector('.mute-text');
  if (muteText) {
    const extractionVideo = document.getElementById('extractionVideo');
    if (extractionVideo) {
      muteText.textContent = extractionVideo.muted ? 
        (translations.sound_off || (lang === 'AR' ? 'إيقاف الصوت' : 'Sound Off')) : 
        (translations.sound_on || (lang === 'AR' ? 'تشغيل الصوت' : 'Sound On'));
    }
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
    if (storyParagraphs.length >= 3) {
      storyParagraphs[0].textContent = translations.story_paragraph_1 || storyParagraphs[0].textContent;
      storyParagraphs[1].textContent = translations.story_paragraph_2 || storyParagraphs[1].textContent;
    }
    
    // Translate promise section
    const promiseSections = document.querySelectorAll('.our-story-section .cert-name');
    if (promiseSections.length > 0) {
      promiseSections[0].textContent = translations.our_promise || promiseSections[0].textContent;
    }
    
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
    
    // Translate stats section
    const statsTitle = document.querySelector('.stats-section .section-title');
    if (statsTitle) statsTitle.textContent = translations.trusted_worldwide || statsTitle.textContent;
    
    const statLabels = document.querySelectorAll('.stat-label');
    if (statLabels.length >= 4) {
      statLabels[0].textContent = translations.years_of_excellence || statLabels[0].textContent;
      statLabels[1].textContent = translations.projects_completed || statLabels[1].textContent;
      statLabels[2].textContent = translations.countries_served || statLabels[2].textContent;
      statLabels[3].textContent = translations.client_satisfaction || statLabels[3].textContent;
    }
    
    // Translate testimonials section
    const testimonialsTitle = document.querySelector('.testimonials-section .section-title');
    if (testimonialsTitle) testimonialsTitle.textContent = translations.trusted_worldwide || testimonialsTitle.textContent;
    
    // Translate certifications section
    const certificationsTitle = document.querySelector('.certifications-section .section-title');
    if (certificationsTitle) certificationsTitle.textContent = translations.global_standards || certificationsTitle.textContent;
    
    const certNames = document.querySelectorAll('.cert-name');
    if (certNames.length >= 4) {
      certNames[0].textContent = translations.iso_certified || certNames[0].textContent;
      certNames[1].textContent = translations.quality_assured || certNames[1].textContent;
      certNames[2].textContent = translations.global_standards || certNames[2].textContent;
      certNames[3].textContent = translations.eco_friendly || certNames[3].textContent;
    }
  }
  
  // About page translations
  if (pageTitle.includes('about')) {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) heroTitle.textContent = translations.our_story || heroTitle.textContent;
    
    const heroSubtitle = document.querySelector('.hero p');
    if (heroSubtitle) heroSubtitle.textContent = translations.story_paragraph_1 || heroSubtitle.textContent;
    
    const sectionTitles = document.querySelectorAll('h2');
    if (sectionTitles.length >= 3) {
      sectionTitles[0].textContent = translations.our_story || sectionTitles[0].textContent;
      sectionTitles[1].textContent = translations.years_of_excellence || sectionTitles[1].textContent;
      sectionTitles[2].textContent = translations.trusted_worldwide || sectionTitles[2].textContent;
    }
    
    const sectionHeaders = document.querySelectorAll('h3');
    if (sectionHeaders.length >= 4) {
      sectionHeaders[0].textContent = translations.from_quarry || sectionHeaders[0].textContent;
      sectionHeaders[1].textContent = translations.our_promise || sectionHeaders[1].textContent;
      sectionHeaders[2].textContent = translations.ethical_provenance_title || sectionHeaders[2].textContent;
      sectionHeaders[3].textContent = translations.quality_title || sectionHeaders[3].textContent;
    }
    
    // Translate feature cards
    const featureTitles = document.querySelectorAll('.feature h3');
    if (featureTitles.length >= 3) {
      featureTitles[0].textContent = translations.ethical_provenance_title || featureTitles[0].textContent;
      featureTitles[1].textContent = translations.countries_served || featureTitles[1].textContent;
      featureTitles[2].textContent = translations.quality_assured || featureTitles[2].textContent;
    }
    
    // Translate stats section
    const statLabels = document.querySelectorAll('.stat-label');
    if (statLabels.length >= 4) {
      statLabels[0].textContent = translations.years_of_excellence || statLabels[0].textContent;
      statLabels[1].textContent = translations.projects_completed || statLabels[1].textContent;
      statLabels[2].textContent = translations.countries_served || statLabels[2].textContent;
      statLabels[3].textContent = translations.client_satisfaction || statLabels[3].textContent;
    }
    
    // Translate testimonials section
    const testimonialsTitle = document.querySelector('.testimonials-section h2');
    if (testimonialsTitle) testimonialsTitle.textContent = translations.trusted_worldwide || testimonialsTitle.textContent;
  }
  
  // Products page translations
  if (pageTitle.includes('products')) {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) heroTitle.textContent = translations.products_title || heroTitle.textContent;
    
    const heroSubtitle = document.querySelector('.hero p');
    if (heroSubtitle) heroSubtitle.textContent = translations.products_desc || heroSubtitle.textContent;
    
    const sectionTitles = document.querySelectorAll('h2');
    if (sectionTitles.length >= 4) {
      sectionTitles[0].textContent = translations.products_title || sectionTitles[0].textContent;
      sectionTitles[1].textContent = translations.marble || sectionTitles[1].textContent;
      sectionTitles[2].textContent = translations.quartz || sectionTitles[2].textContent;
      sectionTitles[3].textContent = translations.services_title || sectionTitles[3].textContent;
    }
    
    // Translate services section
    const serviceTitles = document.querySelectorAll('.card h3');
    if (serviceTitles.length >= 4) {
      serviceTitles[0].textContent = translations.precision_fabrication || serviceTitles[0].textContent;
      serviceTitles[1].textContent = translations.professional_installation || serviceTitles[1].textContent;
      serviceTitles[2].textContent = translations.custom_design || serviceTitles[2].textContent;
      serviceTitles[3].textContent = translations.maintenance_restoration || serviceTitles[3].textContent;
    }
    
    const serviceDescriptions = document.querySelectorAll('.card p');
    if (serviceDescriptions.length >= 4) {
      serviceDescriptions[0].textContent = translations.precision_fabrication_desc || serviceDescriptions[0].textContent;
      serviceDescriptions[1].textContent = translations.professional_installation_desc || serviceDescriptions[1].textContent;
      serviceDescriptions[2].textContent = translations.custom_design_desc || serviceDescriptions[2].textContent;
      serviceDescriptions[3].textContent = translations.maintenance_restoration_desc || serviceDescriptions[3].textContent;
    }
    
    const ctaButton = document.querySelector('.btn-primary');
    if (ctaButton) ctaButton.textContent = translations.request_consultation || ctaButton.textContent;
  }
  
  // Applications page translations
  if (pageTitle.includes('applications')) {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) heroTitle.textContent = translations.applications_title || heroTitle.textContent;
    
    const heroSubtitle = document.querySelector('.hero p');
    if (heroSubtitle) heroSubtitle.textContent = translations.applications_desc || heroSubtitle.textContent;
    
    const introTitle = document.querySelector('.application-intro h2');
    if (introTitle) introTitle.textContent = translations.applications_title || introTitle.textContent;
    
    const categoryHeaders = document.querySelectorAll('.category-header h2');
    if (categoryHeaders.length >= 3) {
      categoryHeaders[0].textContent = translations.residential_title || categoryHeaders[0].textContent;
      categoryHeaders[1].textContent = translations.commercial_title || categoryHeaders[1].textContent;
      categoryHeaders[2].textContent = translations.specialty_title || categoryHeaders[2].textContent;
    }
    
    const categoryDescriptions = document.querySelectorAll('.category-header p');
    if (categoryDescriptions.length >= 3) {
      categoryDescriptions[0].textContent = translations.residential_desc || categoryDescriptions[0].textContent;
      categoryDescriptions[1].textContent = translations.commercial_desc || categoryDescriptions[1].textContent;
      categoryDescriptions[2].textContent = translations.specialty_desc || categoryDescriptions[2].textContent;
    }
    
    // Translate application cards
    const appCardTitles = document.querySelectorAll('.app-content h3');
    const appCardDescriptions = document.querySelectorAll('.app-content p');
    
    // Translate benefits section
    const benefitsTitle = document.querySelector('.benefits-section h2');
    if (benefitsTitle) benefitsTitle.textContent = translations.why_choose_natural_stone || benefitsTitle.textContent;
    
    const benefitTitles = document.querySelectorAll('.benefit-card h3');
    if (benefitTitles.length >= 4) {
      benefitTitles[0].textContent = translations.timeless_beauty || benefitTitles[0].textContent;
      benefitTitles[1].textContent = translations.exceptional_durability || benefitTitles[1].textContent;
      benefitTitles[2].textContent = translations.increases_value || benefitTitles[2].textContent;
      benefitTitles[3].textContent = translations.easy_maintenance || benefitTitles[3].textContent;
    }
    
    const benefitDescriptions = document.querySelectorAll('.benefit-card p');
    if (benefitDescriptions.length >= 4) {
      benefitDescriptions[0].textContent = translations.timeless_beauty_desc || benefitDescriptions[0].textContent;
      benefitDescriptions[1].textContent = translations.exceptional_durability_desc || benefitDescriptions[1].textContent;
      benefitDescriptions[2].textContent = translations.increases_value_desc || benefitDescriptions[2].textContent;
      benefitDescriptions[3].textContent = translations.easy_maintenance_desc || benefitDescriptions[3].textContent;
    }
    
    // Translate CTA section
    const ctaTitle = document.querySelector('.cta-section h2');
    if (ctaTitle) ctaTitle.textContent = translations.lets_create || ctaTitle.textContent;
    
    const ctaSubtitle = document.querySelector('.cta-section p');
    if (ctaSubtitle) ctaSubtitle.textContent = translations.lets_create_desc || ctaSubtitle.textContent;
    
    const ctaButtons = document.querySelectorAll('.cta-section .btn');
    if (ctaButtons.length >= 2) {
      ctaButtons[0].textContent = translations.request_consultation || ctaButtons[0].textContent;
      ctaButtons[1].textContent = translations.browse_products || ctaButtons[1].textContent;
    }
  }
  
  // Gallery page translations
  if (pageTitle.includes('gallery')) {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) heroTitle.textContent = translations.gallery || heroTitle.textContent;
    
    const heroSubtitle = document.querySelector('.hero p');
    if (heroSubtitle) heroSubtitle.textContent = translations.gallery_desc || heroSubtitle.textContent;
    
    const cardTitles = document.querySelectorAll('.card h3');
    const cardDescriptions = document.querySelectorAll('.card p');
    
    const ctaButton = document.querySelector('.btn-primary');
    if (ctaButton) ctaButton.textContent = translations.begin_consultation || ctaButton.textContent;
  }
  
  // Contact page translations
  if (pageTitle.includes('contact')) {
    const heroTitle = document.querySelector('h1');
    if (heroTitle) heroTitle.textContent = translations.request_consultation || heroTitle.textContent;
    
    const heroSubtitle = document.querySelector('h1 + p');
    if (heroSubtitle) heroSubtitle.textContent = translations.contact_desc || heroSubtitle.textContent;
    
    const cardTitle = document.querySelector('.card h2');
    if (cardTitle) cardTitle.textContent = translations.contact_info || cardTitle.textContent;
    
    const nameLabel = document.querySelector('input[name="name"]').previousElementSibling;
    if (nameLabel) nameLabel.textContent = translations.name || nameLabel.textContent;
    
    const emailLabel = document.querySelector('input[name="email"]').previousElementSibling;
    if (emailLabel) emailLabel.textContent = translations.email || emailLabel.textContent;
    
    const messageLabel = document.querySelector('textarea[name="message"]').previousElementSibling;
    if (messageLabel) messageLabel.textContent = translations.message || messageLabel.textContent;
    
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) submitButton.textContent = translations.submit_request || submitButton.textContent;
  }
  
  // Company profile translations
  if (pageTitle.includes('company') || pageTitle.includes('profile')) {
    const coverTitle = document.querySelector('.profile-cover h1');
    if (coverTitle) coverTitle.textContent = translations.company_name || coverTitle.textContent;
    
    const coverSubtitle = document.querySelector('.profile-cover p');
    if (coverSubtitle) coverSubtitle.textContent = translations.company_profile || coverSubtitle.textContent;
    
    const sectionTitles = document.querySelectorAll('.profile-section h2');
    if (sectionTitles.length >= 6) {
      sectionTitles[0].textContent = translations.who_we_are || sectionTitles[0].textContent;
      sectionTitles[1].textContent = translations.key_products || sectionTitles[1].textContent;
      sectionTitles[2].textContent = translations.markets_served || sectionTitles[2].textContent;
      sectionTitles[3].textContent = translations.quality_sourcing || sectionTitles[3].textContent;
      sectionTitles[4].textContent = translations.why_choose_us || sectionTitles[4].textContent;
      sectionTitles[5].textContent = translations.contact_info || sectionTitles[5].textContent;
    }
    
    const downloadButtons = document.querySelectorAll('button[onclick="window.print()"]');
    downloadButtons.forEach(button => {
      button.textContent = translations.download_pdf || button.textContent;
    });
  }
  
  // Translate footer
  const footerCopyright = document.querySelector('.site-footer p');
  if (footerCopyright) {
    const year = new Date().getFullYear();
    footerCopyright.innerHTML = `&copy; ${year} ${translations.company_name || 'Granix Prime Stones Ltd'}. ${translations.footer_copyright || 'All rights reserved'}.`;
  }
  
  // Translate footer links
  const footerLinks = document.querySelectorAll('.footer-links a');
  if (footerLinks.length >= 3) {
    footerLinks[0].textContent = translations.about || 'About';
    footerLinks[1].textContent = translations.products || 'Products';
    if (pageTitle.includes('contact')) {
      footerLinks[2].textContent = translations.gallery || 'Gallery';
    } else {
      footerLinks[2].textContent = translations.contact || 'Contact';
    }
  }
  
  // Translate year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
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
    
    // Get current language
    const currentLang = localStorage.getItem('preferredLanguage') || 'EN';
    
    if (extractionVideo.muted) {
      if (icon) icon.textContent = '🔇';
      if (text) text.textContent = currentLang === 'AR' ? 'إيقاف الصوت' : 'Sound Off';
    } else {
      if (icon) icon.textContent = '🔊';
      if (text) text.textContent = currentLang === 'AR' ? 'تشغيل الصوت' : 'Sound On';
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
