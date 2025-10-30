# Granix Prime Stones Ltd - World-Class Website

## 🌍 The Foundation of the World's Most Ambitious Architecture

**Global curators of rare geological masterpieces** | Serving architects & developers across 25+ countries | 15+ years of excellence

---

## 🎯 Overview

Professional, world-class static website for Granix Prime Stones Ltd - an international natural stone curator specializing in rare granite, marble, and quartz for iconic architectural projects.

**Technology Stack**: HTML5, CSS3, vanilla JavaScript (no framework required)

**Deployment**: GitHub Pages at https://k-jc63.github.io/GRANIX/

---

## ✨ Key Features

### Brand Positioning
- **Bold value proposition**: "The Foundation of the World's Most Ambitious Architecture"
- **Target audience**: Architects, developers, and designers building legacy projects
- **Competitive differentiation**: 4 clear advantages (durability, uniqueness, ethics, value)

### User Experience
- 🌐 **Multi-language support**: English/Arabic toggle for UAE market
- 📱 **Mobile-first responsive design**: Optimized for all devices
- ♿ **Accessibility**: WCAG compliant, semantic HTML, ARIA labels
- ⚡ **Performance**: Lightweight, fast-loading, optimized images

### Trust Signals
- "Our Story" section with 15+ years journey
- Client testimonials and project statistics
- International contact information (UAE + East Africa)
- Certifications and quality standards

### SEO & Discoverability
- Schema.org structured data for rich snippets
- Open Graph meta tags for social sharing
- Descriptive alt text on all images
- Semantic HTML with proper heading hierarchy

---

## 📁 Project Structure
## 📁 Project Structure

```
GRANIX/
├── index.html              # Homepage with hero, story, difference section
├── about.html              # Company story and mission
├── products.html           # Stone types and services
├── applications.html       # Use cases (residential, commercial)
├── gallery.html            # Project portfolio
├── contact.html            # Contact form with international info
├── company-profile.html    # Printable company profile
├── assets/
│   ├── css/
│   │   └── styles.css      # Complete styling system
│   ├── js/
│   │   └── main.js         # Navigation, slider, language toggle
│   └── img/
│       └── favicon.svg
├── exports/
│   └── company-profile.html
├── tools/
│   ├── clean_watermark.py  # Image processing utility
│   └── export_profile.ps1  # Profile export script
├── logo.png                # Brand logo
├── README.md               # This file
├── QUICK_START.md          # Quick deployment guide
├── EXECUTIVE_SUMMARY.md    # Stakeholder overview
├── WORLD_CLASS_UPGRADE.md  # Detailed upgrade documentation
├── BEFORE_AFTER_COMPARISON.md
└── DEPLOYMENT_CHECKLIST.md
```

---

## 🛠️ Local Development

### Option 1: Direct File Opening
```bash
# Simply open in browser
start index.html  # Windows
open index.html   # macOS
xdg-open index.html  # Linux
```

### Option 2: Static Server (Recommended)
```bash
# Python 3
python -m http.server 8080

# Node.js
npx serve .

# PHP
php -S localhost:8080
```

Then visit: `http://localhost:8080`

---

## 🚀 Deployment

### GitHub Pages (Current Setup)
1. Push changes to `main` branch
2. GitHub Actions automatically deploys
3. Live at: https://k-jc63.github.io/GRANIX/

### Other Platforms
- **Netlify**: Drag & drop folder or connect GitHub
- **Vercel**: `vercel --prod`
- **Cloudflare Pages**: Connect GitHub repository
- **AWS S3**: Upload to bucket + CloudFront CDN
- **cPanel**: Upload via FTP to public_html

**No build step required** - it's pure static HTML/CSS/JS!

---

## 🌐 Multi-Language Support

### Current Implementation
- **Toggle**: Globe icon (🌐) in header across all pages
- **Languages**: English (EN) / Arabic (AR)
- **Persistence**: User preference saved in localStorage
- **Future**: Full Arabic translation (RTL layout ready)

### Adding Full Translation
1. Create language JSON files in `/lang/`
2. Update `main.js` to load translations
3. Add text replacement on toggle
4. Test RTL layout for Arabic

---

## 🎨 Customization Guide

### Brand Colors (styles.css)
```css
:root {
  --brand: #0e4a3c;      /* Primary green */
  --accent: #d4a373;     /* Gold accent */
  --text: #1b1f23;       /* Dark text */
  --muted: #6b7280;      /* Secondary text */
}
```

### Update Contact Info
1. **Phone numbers**: Edit in `contact.html` and `index.html` schema.org
2. **Email**: Update in all pages footer and contact section
3. **Address**: Update in `contact.html`

### Add New Projects
1. Add images to root directory (e.g., `add 22.jpg`)
2. Update `gallery.html` with new `<figure>` element
3. Add to homepage slider in `index.html`

---

## 📊 Analytics & Monitoring

### Recommended Setup
1. **Google Analytics 4**: Track traffic and conversions
2. **Google Search Console**: Monitor SEO performance
3. **Hotjar/Clarity**: Heatmaps and session recordings

### Key Metrics to Track
- Geographic distribution (UAE vs East Africa vs other)
- Language toggle usage (EN vs AR)
- Contact form submissions
- Phone link clicks
- Session duration and bounce rate

---

## ✅ Testing Checklist

### Functionality
- [ ] Language toggle works on all pages
- [ ] Phone links open dialer on mobile
- [ ] Contact form submits successfully
- [ ] All navigation links work
- [ ] Slideshow auto-plays and manual controls work
- [ ] Back-to-top button appears on scroll

### Responsiveness
- [ ] Desktop (1920px+)
- [ ] Laptop (1366px)
- [ ] Tablet (768px - iPad)
- [ ] Mobile (375px - iPhone)
- [ ] Small mobile (320px)

### Cross-Browser
- [ ] Chrome
- [ ] Safari (important for iOS)
- [ ] Firefox
- [ ] Edge

---

## 📝 Recent Updates

### October 30, 2025 - World-Class Upgrade

**Strategic Positioning:**
- ✅ New visionary headline: "The Foundation of the World's Most Ambitious Architecture"
- ✅ Mission statement emphasizing ethical sourcing and empowerment
- ✅ Target audience: Architects & developers (vs generic consumers)

**Competitive Differentiation:**
- ✅ "Why Natural Stone?" section with 4 clear advantages vs artificial
- ✅ Durability, uniqueness, ethics, and value messaging
- ✅ Specific examples (Dubai heat, Nordic winters, Carrara quarries)

**Trust Building:**
- ✅ "Our Story" section with 15+ years journey narrative
- ✅ Global credibility: 25+ countries served
- ✅ Visual brand showcase with professional styling

**Global Accessibility:**
- ✅ EN/AR language toggle across all pages
- ✅ International phone number positioning (UAE first)
- ✅ Multi-market contact information

**Premium CTAs:**
- ✅ "Request Your Complimentary Slab Consultation" (vs generic contact)
- ✅ "View Our Exclusive Portfolio" (exclusivity framing)

**Technical:**
- ✅ Responsive "Our Story" section
- ✅ Language selector with localStorage persistence
- ✅ Enhanced mobile menu compatibility
- ✅ All pages updated with consistent header

---

## 📚 Documentation

| Document | Purpose | Audience |
|----------|---------|----------|
| **QUICK_START.md** | Fast deployment guide | Developer/Owner |
| **EXECUTIVE_SUMMARY.md** | Strategic overview | Stakeholders |
| **WORLD_CLASS_UPGRADE.md** | Complete upgrade details | Marketing/Dev |
| **BEFORE_AFTER_COMPARISON.md** | Visual comparison | Everyone |
| **DEPLOYMENT_CHECKLIST.md** | Pre-launch testing | Developer |
| **README.md** (this) | Technical reference | Developer |

---

## 🔗 Quick Links

- **Live Site**: https://k-jc63.github.io/GRANIX/
- **Repository**: https://github.com/K-jc63/GRANIX
- **Email**: granixprimestonesltd25@gmail.com
- **Phone (UAE)**: +971 58 196 8890
- **Phone (East Africa)**: +256 708 331 185

---

## 🤝 Contributing

### To Add Content:
1. Create feature branch: `git checkout -b feature/new-content`
2. Make changes
3. Test locally
4. Commit with clear message
5. Push and create pull request

### Code Style:
- Use semantic HTML5 elements
- Follow BEM-like CSS naming where applicable
- Comment complex JavaScript functions
- Optimize images before committing
- Maintain mobile-first responsive approach

---

## 🛡️ License & Ownership

© 2025 Granix Prime Stones Ltd. All rights reserved.

This website is proprietary to Granix Prime Stones Ltd. Unauthorized copying, distribution, or use is prohibited.

---

## 📞 Support

For technical issues or questions:
- **Email**: granixprimestonesltd25@gmail.com
- **Documentation**: See files listed above
- **GitHub Issues**: https://github.com/K-jc63/GRANIX/issues

---

## 🌟 Acknowledgments

**Technology Stack**:
- Pure HTML5, CSS3, JavaScript (ES6+)
- No external dependencies or frameworks
- Mobile-first responsive design methodology
- Progressive enhancement approach

**Hosting**:
- GitHub Pages (free static hosting)
- Custom domain ready

---

*Built with precision. Curated with purpose. Delivered with excellence.*

**Granix Prime Stones** - The Foundation of the World's Most Ambitious Architecture






