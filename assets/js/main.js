// Mobile nav toggle
const nav = document.querySelector('.site-nav');
const toggle = document.querySelector('.nav-toggle');

// Current year in footer
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// Slider functionality
function initSlider() {
  const slider = document.querySelector('.slider');
  if (!slider) return;
  
  const sliderTrack = slider.querySelector('.slider-track');
  const slides = slider.querySelectorAll('.slide');
  const prevBtn = slider.querySelector('.prev');
  const nextBtn = slider.querySelector('.next');
  const dotsContainer = null; // Removed dots functionality
  
  if (!sliderTrack || !slides.length) return;
  
  let currentIndex = 0;
  let slideCount = slides.length;
  let autoplayInterval;
  const autoplayEnabled = slider.hasAttribute('data-slider') && slider.getAttribute('data-slider') === 'autoplay';
  const autoplaySpeed = 5000; // 5 seconds
  
  // Dots functionality removed
  
  // Update dots function removed
  
  // Go to specific slide
  function goToSlide(index) {
    if (index < 0) {
      currentIndex = slideCount - 1;
    } else if (index >= slideCount) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    
    // Move slider track
    const translateX = -currentIndex * 100;
    sliderTrack.style.transform = `translateX(${translateX}%)`;
    
    // Update active slide
    slides.forEach((slide, index) => {
      if (index === currentIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
    
    resetAutoplay();
  }
  
  // Next slide
  function nextSlide() {
    goToSlide(currentIndex + 1);
  }
  
  // Previous slide
  function prevSlide() {
    goToSlide(currentIndex - 1);
  }
  
  // Reset autoplay timer
  function resetAutoplay() {
    if (autoplayEnabled && autoplayInterval) {
      clearInterval(autoplayInterval);
      startAutoplay();
    }
  }
  
  // Start autoplay
  function startAutoplay() {
    if (!autoplayEnabled) return;
    autoplayInterval = setInterval(nextSlide, autoplaySpeed);
  }
  
  // Stop autoplay
  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }
  }
  
  // Event listeners
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
  
  // Touch/swipe support
  let startX = 0;
  let endX = 0;
  
  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });
  
  slider.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
  });
  
  slider.addEventListener('touchend', () => {
    const threshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  });
  
  // Pause autoplay on hover
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);
  
  // Initialize
  if (autoplayEnabled) startAutoplay();
  
  // Add loaded class to slides for animation
  setTimeout(() => {
    slides.forEach(slide => {
      slide.classList.add('loaded');
    });
  }, 100);
}

// Video mute toggle functionality
function initVideoControls() {
  const video = document.getElementById('extractionVideo');
  const muteBtn = document.getElementById('muteToggle');
  const muteIcon = document.querySelector('.mute-icon');
  const muteText = document.querySelector('.mute-text');
  const videoLoading = document.getElementById('videoLoading');
  
  if (!video || !muteBtn) return;
  
  // Set initial state
  video.muted = true;
  
  // Hide loading indicator when video starts playing
  video.addEventListener('playing', () => {
    if (videoLoading) {
      videoLoading.classList.add('hidden');
    }
  });
  
  // Hide loading indicator if video can play
  video.addEventListener('canplay', () => {
    if (videoLoading) {
      videoLoading.classList.add('hidden');
    }
  });
  
  // Handle video loading errors
  video.addEventListener('error', (e) => {
    console.error('Video error:', e);
    // Try to reload the video
    setTimeout(() => {
      video.load();
    }, 3000);
    
    // Hide loading indicator on error
    if (videoLoading) {
      videoLoading.classList.add('hidden');
    }
  });
  
  // Fallback: Hide loading indicator after 5 seconds
  setTimeout(() => {
    if (videoLoading) {
      videoLoading.classList.add('hidden');
    }
  }, 5000);
  
  // Toggle mute on button click
  muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    
    // Update button text and icon
    if (video.muted) {
      muteIcon.textContent = '🔊';
      muteText.textContent = 'Sound Off';
    } else {
      muteIcon.textContent = '🔇';
      muteText.textContent = 'Sound On';
    }
  });
}

// Language selector functionality with full translation support
const langToggle = document.getElementById('langToggle');

// Initialize language functionality
function initLanguage() {
  // Get saved language preference or default to English
  let currentLang = localStorage.getItem('preferredLanguage') || 'EN';
  
  console.log('Initializing language with:', currentLang);
  
  // Update UI to show current language
  const langText = langToggle.querySelector('.lang-text');
  if (langText) {
    langText.textContent = currentLang === 'AR' ? 'العربية' : currentLang;
  }
  
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
      
      console.log('Switching language to:', newLang);
      
      // Save preference
      localStorage.setItem('preferredLanguage', newLang);
      
      // Update current language
      currentLang = newLang;
      
      // Update UI
      if (langText) {
        langText.textContent = currentLang === 'AR' ? 'العربية' : 'EN';
      }
      
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
    console.log('Loading translations for:', lang);
    const response = await fetch(`lang/${lang.toLowerCase()}.json`);
    console.log('Translation file response:', response);
    if (response.ok) {
      const translations = await response.json();
      console.log('Translations loaded:', translations);
      applyTranslations(translations, lang);
      return true;
    } else {
      console.warn(`Failed to load ${lang} translations:`, response.status);
      // Fallback: If Arabic file fails, try to load it directly
      if (lang === 'AR') {
        console.log('Trying direct Arabic translation load...');
        const fallbackResponse = await fetch('lang/ar.json');
        if (fallbackResponse.ok) {
          const translations = await fallbackResponse.json();
          applyTranslations(translations, lang);
          return true;
        }
      }
    }
  } catch (error) {
    console.warn(`Failed to load ${lang} translations:`, error);
    // Fallback for Arabic
    if (lang === 'AR') {
      console.log('Trying direct Arabic translation load due to error...');
      try {
        const fallbackResponse = await fetch('lang/ar.json');
        if (fallbackResponse.ok) {
          const translations = await fallbackResponse.json();
          applyTranslations(translations, lang);
          return true;
        }
      } catch (fallbackError) {
        console.warn('Fallback Arabic load also failed:', fallbackError);
      }
    }
  }
  return false;
}

// Apply translations to the page
function applyTranslations(translations, lang) {
  console.log('Applying translations for:', lang);
  console.log('Translations object:', translations);
  
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
    
    // Translate slider dots
    const sliderDots = document.querySelectorAll('.slider-dots button');
    sliderDots.forEach((dot, index) => {
      dot.setAttribute('aria-label', `${translations.slide || 'Slide'} ${index + 1}`);
    });
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
    
    const featureDescriptions = document.querySelectorAll('.feature p');
    if (featureDescriptions.length >= 3) {
      featureDescriptions[0].textContent = translations.ethical_provenance_desc || featureDescriptions[0].textContent;
      featureDescriptions[1].textContent = translations.countries_served_desc || featureDescriptions[1].textContent;
      featureDescriptions[2].textContent = translations.quality_assured_desc || featureDescriptions[2].textContent;
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
    
    // Translate testimonial content
    const testimonialTexts = document.querySelectorAll('.testimonial-text');
    if (testimonialTexts.length >= 2) {
      testimonialTexts[0].textContent = translations.testimonial_1 || testimonialTexts[0].textContent;
      testimonialTexts[1].textContent = translations.testimonial_2 || testimonialTexts[1].textContent;
    }
    
    const testimonialAuthors = document.querySelectorAll('.testimonial-author strong');
    if (testimonialAuthors.length >= 2) {
      testimonialAuthors[0].textContent = translations.testimonial_author_1 || testimonialAuthors[0].textContent;
      testimonialAuthors[1].textContent = translations.testimonial_author_2 || testimonialAuthors[1].textContent;
    }
    
    const testimonialLocations = document.querySelectorAll('.testimonial-author span');
    if (testimonialLocations.length >= 2) {
      testimonialLocations[0].textContent = translations.testimonial_location_1 || testimonialLocations[0].textContent;
      testimonialLocations[1].textContent = translations.testimonial_location_2 || testimonialLocations[1].textContent;
    }
  }
  
  // Products page translations
  if (pageTitle.includes('products')) {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) heroTitle.textContent = translations.products_title || heroTitle.textContent;
    
    const heroSubtitle = document.querySelector('.hero p');
    if (heroSubtitle) heroSubtitle.textContent = translations.products_desc || heroSubtitle.textContent;
    
    const sectionTitles = document.querySelectorAll('h2');
    if (sectionTitles.length >= 4) {
      sectionTitles[0].textContent = translations.granite_collection || sectionTitles[0].textContent;
      sectionTitles[1].textContent = translations.marble || sectionTitles[1].textContent;
      sectionTitles[2].textContent = translations.quartz || sectionTitles[2].textContent;
      sectionTitles[3].textContent = translations.services_title || sectionTitles[3].textContent;
    }
    
    // Translate granite collection
    const graniteTitles = document.querySelectorAll('#granite h3');
    if (graniteTitles.length >= 2) {
      graniteTitles[0].textContent = translations.imperial_black_granite || graniteTitles[0].textContent;
      graniteTitles[1].textContent = translations.storm_grey_granite || graniteTitles[1].textContent;
    }
    
    const graniteDescriptions = document.querySelectorAll('#granite p');
    if (graniteDescriptions.length >= 2) {
      graniteDescriptions[0].textContent = translations.imperial_black_granite_desc || graniteDescriptions[0].textContent;
      graniteDescriptions[1].textContent = translations.storm_grey_granite_desc || graniteDescriptions[1].textContent;
    }
    
    // Translate granite lists
    const graniteLists = document.querySelectorAll('#granite li');
    if (graniteLists.length >= 6) {
      graniteLists[0].innerHTML = `<strong>${translations.origin || 'Origin'}:</strong> ${translations.brazil || 'Brazil'}`;
      graniteLists[1].innerHTML = `<strong>${translations.finish || 'Finish'}:</strong> ${translations.polished_honed_flamed || 'Polished, Honed, Flamed'}`;
      graniteLists[2].innerHTML = `<strong>${translations.thickness || 'Thickness'}:</strong> ${translations.two_three_cm || '2cm, 3cm'}`;
      graniteLists[3].innerHTML = `<strong>${translations.origin || 'Origin'}:</strong> ${translations.india || 'India'}`;
      graniteLists[4].innerHTML = `<strong>${translations.finish || 'Finish'}:</strong> ${translations.polished_honed_leather || 'Polished, Honed, Leather'}`;
      graniteLists[5].innerHTML = `<strong>${translations.thickness || 'Thickness'}:</strong> ${translations.two_three_cm || '2cm, 3cm'}`;
    }
    
    // Translate marble collection
    const marbleTitles = document.querySelectorAll('#marble h3');
    if (marbleTitles.length >= 2) {
      marbleTitles[0].textContent = translations.carrara_white_marble || marbleTitles[0].textContent;
      marbleTitles[1].textContent = translations.emperor_brown_marble || marbleTitles[1].textContent;
    }
    
    const marbleDescriptions = document.querySelectorAll('#marble p');
    if (marbleDescriptions.length >= 2) {
      marbleDescriptions[0].textContent = translations.carrara_white_marble_desc || marbleDescriptions[0].textContent;
      marbleDescriptions[1].textContent = translations.emperor_brown_marble_desc || marbleDescriptions[1].textContent;
    }
    
    // Translate marble lists
    const marbleLists = document.querySelectorAll('#marble li');
    if (marbleLists.length >= 6) {
      marbleLists[0].innerHTML = `<strong>${translations.origin || 'Origin'}:</strong> ${translations.italy_carrara || 'Italy (Carrara)'}`;
      marbleLists[1].innerHTML = `<strong>${translations.finish || 'Finish'}:</strong> ${translations.polished_honed_brushed || 'Polished, Honed, Brushed'}`;
      marbleLists[2].innerHTML = `<strong>${translations.thickness || 'Thickness'}:</strong> ${translations.two_three_cm || '2cm, 3cm'}`;
      marbleLists[3].innerHTML = `<strong>${translations.origin || 'Origin'}:</strong> ${translations.turkey || 'Turkey'}`;
      marbleLists[4].innerHTML = `<strong>${translations.finish || 'Finish'}:</strong> ${translations.polished_honed || 'Polished, Honed'}`;
      marbleLists[5].innerHTML = `<strong>${translations.thickness || 'Thickness'}:</strong> ${translations.two_three_cm || '2cm, 3cm'}`;
    }
    
    // Translate quartz collection
    const quartzTitles = document.querySelectorAll('#quartz h3');
    if (quartzTitles.length >= 2) {
      quartzTitles[0].textContent = translations.arctic_white_quartz || quartzTitles[0].textContent;
      quartzTitles[1].textContent = translations.midnight_black_quartz || quartzTitles[1].textContent;
    }
    
    const quartzDescriptions = document.querySelectorAll('#quartz p');
    if (quartzDescriptions.length >= 2) {
      quartzDescriptions[0].textContent = translations.arctic_white_quartz_desc || quartzDescriptions[0].textContent;
      quartzDescriptions[1].textContent = translations.midnight_black_quartz_desc || quartzDescriptions[1].textContent;
    }
    
    // Translate quartz lists
    const quartzLists = document.querySelectorAll('#quartz li');
    if (quartzLists.length >= 6) {
      quartzLists[0].innerHTML = `<strong>${translations.composition || 'Composition'}:</strong> ${translations.quartz_composition_1 || '93% natural quartz, 7% polymer resins'}`;
      quartzLists[1].innerHTML = `<strong>${translations.finish || 'Finish'}:</strong> ${translations.polished || 'Polished'}`;
      quartzLists[2].innerHTML = `<strong>${translations.thickness || 'Thickness'}:</strong> ${translations.two_three_cm || '2cm, 3cm'}`;
      quartzLists[3].innerHTML = `<strong>${translations.composition || 'Composition'}:</strong> ${translations.quartz_composition_2 || '93% natural quartz, 7% polymer resins'}`;
      quartzLists[4].innerHTML = `<strong>${translations.finish || 'Finish'}:</strong> ${translations.polished || 'Polished'}`;
      quartzLists[5].innerHTML = `<strong>${translations.thickness || 'Thickness'}:</strong> ${translations.two_three_cm || '2cm, 3cm'}`;
    }
    
    // Translate services section
    const serviceTitles = document.querySelectorAll('#services .card h3');
    if (serviceTitles.length >= 4) {
      serviceTitles[0].textContent = translations.precision_fabrication || serviceTitles[0].textContent;
      serviceTitles[1].textContent = translations.professional_installation || serviceTitles[1].textContent;
      serviceTitles[2].textContent = translations.custom_design || serviceTitles[2].textContent;
      serviceTitles[3].textContent = translations.maintenance_restoration || serviceTitles[3].textContent;
    }
    
    const serviceDescriptions = document.querySelectorAll('#services .card p');
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
    
    const introDescription = document.querySelector('.application-intro p');
    if (introDescription) introDescription.textContent = translations.applications_intro_desc || introDescription.textContent;
    
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
    
    // Translate contact information
    const internationalPhone = document.querySelector('a[href="https://wa.me/971581968890"]');
    if (internationalPhone) {
      internationalPhone.innerHTML = `📱 +971 58 196 8890<span style="font-size: 0.9em; color: var(--muted);">(${translations.phone_international || 'International'})</span>`;
    }
    
    const eastAfricaPhone = document.querySelector('a[href="https://wa.me/256708331185"]');
    if (eastAfricaPhone) {
      eastAfricaPhone.innerHTML = `📱 +256 708 331 185<span style="font-size: 0.9em; color: var(--muted);">(${translations.phone_east_africa || 'East Africa'})</span>`;
    }
    
    const emailLink = document.querySelector('a[href="mailto:granixprimestonesltd25@gmail.com"]');
    if (emailLink) {
      emailLink.innerHTML = `✉️ ${translations.email_address || 'granixprimestonesltd25@gmail.com'}`;
    }
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
    
    // Translate who we are section
    const whoWeAreParagraph = document.querySelector('.profile-section p');
    if (whoWeAreParagraph) whoWeAreParagraph.textContent = translations.who_we_are_desc || whoWeAreParagraph.textContent;
    
    // Translate product and service list items
    const productListItems = document.querySelectorAll('.profile-section li');
    if (productListItems.length >= 9) {
      productListItems[0].innerHTML = `<strong>${translations.natural_stones || 'Natural Stones'}:</strong> ${translations.product_list_1 || 'Granite, Marble, Quartz for countertops, flooring, wall cladding, monuments'}`;
      productListItems[1].innerHTML = `<strong>${translations.applications || 'Applications'}:</strong> ${translations.product_list_2 || 'Kitchens, bathrooms, floor tiles, wall cladding, staircases, walkways, monuments'}`;
      productListItems[2].innerHTML = `<strong>${translations.services || 'Services'}:</strong> ${translations.product_list_3 || 'Supply, fabrication, installation, and customization'}`;
      productListItems[3].innerHTML = `<strong>${translations.local_market || 'Local Market'}:</strong> ${translations.market_list_1 || 'Construction and interior design projects in Uganda'}`;
      productListItems[4].innerHTML = `<strong>${translations.international_market || 'International Market'}:</strong> ${translations.market_list_2 || 'Exporting premium stones to global markets'}`;
      productListItems[5].innerHTML = `<strong>${translations.natural_durable || 'Natural and Durable'}:</strong> ${translations.quality_list_1 || 'Stones selected for strength, beauty, and longevity'}`;
      productListItems[6].innerHTML = `<strong>${translations.sustainable_sourcing || 'Sustainable Sourcing'}:</strong> ${translations.quality_list_2 || 'Environmentally responsible procurement'}`;
      productListItems[7].innerHTML = `<strong>${translations.quality_assurance || 'Quality Assurance'}:</strong> ${translations.why_choose_list_1 || 'Commitment to delivering premium natural stones with strict QA'}`;
      productListItems[8].innerHTML = `<strong>${translations.customer_centric || 'Customer-Centric Approach'}:</strong> ${translations.why_choose_list_2 || 'Tailoring solutions to meet client needs, budgets, and timelines'}`;
    }
    
    const downloadButtons = document.querySelectorAll('button[onclick="window.print()"]');
    downloadButtons.forEach(button => {
      button.textContent = translations.download_pdf || button.textContent;
    });
    
    // Translate contact information
    const contactInfo = document.querySelector('.profile-contact p');
    if (contactInfo) {
      contactInfo.innerHTML = `${translations.kampala_uganda || 'Kampala, Uganda'}<br>
      <a href="tel:+256708331185">+256 708 331 185</a> &middot;
      <a href="tel:+971581968890">+971 58 196 8890</a><br>
      <a href="mailto:granixprimestonesltd25@gmail.com">${translations.email_address || 'granixprimestonesltd25@gmail.com'}</a>`;
    }
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
  
  console.log('Translations applied successfully');
}

// Initialize mobile menu functionality
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

// Initialize language functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing language');
  initLanguage();
  
  // Initialize slider
  initSlider();
  
  // Initialize video controls
  initVideoControls();
  
  // Initialize number counters
  initNumberCounters();
  
  // Initialize scroll animations
  initScrollAnimations();
});

// Function to animate numbers in stat cards
function initNumberCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  // Store original values
  statNumbers.forEach(stat => {
    stat.setAttribute('data-original', stat.textContent.trim());
  });
  
  // Reset all numbers to 0
  statNumbers.forEach(stat => {
    stat.textContent = '0';
  });
  
  // Create an Intersection Observer to trigger animations when stats section is in view
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Start animations when section is in view
          statNumbers.forEach((stat, index) => {
            const finalValue = stat.getAttribute('data-original');
            
            // Extract the numeric part
            const numericPart = finalValue.match(/[\d.]+/);
            if (numericPart) {
              const number = parseFloat(numericPart[0]);
              const suffix = finalValue.replace(numericPart[0], '');
              
              // Delay each counter slightly
              setTimeout(() => {
                animateNumber(stat, 0, number, 2000, suffix);
              }, index * 200);
            }
          });
          
          // Stop observing after animation starts
          observer.unobserve(statsSection);
        }
      });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible
    
    observer.observe(statsSection);
  }
}

// Function to animate a number from start to end value
function animateNumber(element, start, end, duration, suffix = '') {
  const startTime = performance.now();
  
  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Use easing function for smoother animation
    const easeOutQuad = 1 - Math.pow(1 - progress, 2);
    const currentValue = Math.floor(start + (end - start) * easeOutQuad);
    
    element.textContent = currentValue + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    } else {
      element.textContent = end + suffix;
    }
  }
  
  requestAnimationFrame(updateNumber);
}

// Function to initialize scroll animations for professional website effects
function initScrollAnimations() {
  // Add scroll animation to cards and other elements
  const animatedElements = document.querySelectorAll(
    '.card, .difference-card, .testimonial-card, .cert-badge, .feature, .stat-card'
  );
  
  // Add animation classes to elements
  animatedElements.forEach(element => {
    element.classList.add('scroll-animate');
  });
  
  // Create Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target); // Stop observing after animation
      }
    });
  }, { threshold: 0.1 }); // Trigger when 10% of the element is visible
  
  // Observe all animated elements
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}