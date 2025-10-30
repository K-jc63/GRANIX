# 🚀 Granix Prime Stones - Deployment Checklist

## Pre-Deployment Testing

### ✅ Functionality Tests

- [ ] **Language Toggle**
  - [ ] Click globe icon on homepage
  - [ ] Verify it switches between EN/AR
  - [ ] Verify preference persists on page reload
  - [ ] Check "Arabic coming soon" message appears
  - [ ] Test on all pages (about, products, applications, gallery, contact)

- [ ] **Phone Links**
  - [ ] Click +971 58 196 8890 (should open dialer on mobile)
  - [ ] Click +256 708 331 185 (should open dialer on mobile)
  - [ ] Verify links work on desktop (should prompt to open Skype/Teams/calling app)

- [ ] **Navigation**
  - [ ] Test all header nav links work
  - [ ] Test all footer links work
  - [ ] Test all CTA buttons navigate correctly
  - [ ] Test mobile menu toggle

- [ ] **Contact Form**
  - [ ] Submit test inquiry
  - [ ] Verify you receive the email
  - [ ] Check email format is readable
  - [ ] Test required field validation

- [ ] **Back to Top Button**
  - [ ] Scroll down on homepage
  - [ ] Verify button appears after 300px
  - [ ] Click and verify smooth scroll to top

### ✅ Visual Tests

- [ ] **Homepage "Our Story" Section**
  - [ ] Check layout on desktop (should be 2-column)
  - [ ] Check on tablet (should be 1-column)
  - [ ] Check on mobile (should be 1-column, logo visible)
  - [ ] Verify logo rendering correctly

- [ ] **The Granix Difference Section**
  - [ ] Verify 4 cards display properly
  - [ ] Check icons render (🛡️ 💎 🌍 📈)
  - [ ] Verify hover effects work
  - [ ] Check responsive grid on mobile (should stack)

- [ ] **Header Language Selector**
  - [ ] Verify globe icon visible on desktop
  - [ ] Verify "EN" text visible on desktop
  - [ ] On mobile, verify icon visible but text may hide
  - [ ] Check doesn't break menu alignment

### ✅ Cross-Browser Tests

Test on these browsers (minimum):

- [ ] Chrome (latest)
- [ ] Safari (latest) - *Important for iOS users*
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iPhone)
- [ ] Mobile Chrome (Android)

### ✅ Responsive Tests

Test on these screen sizes:

- [ ] Desktop: 1920px+ (large desktop)
- [ ] Laptop: 1366px-1920px
- [ ] Tablet: 768px-1024px (iPad)
- [ ] Mobile: 375px-414px (iPhone/Android)
- [ ] Small Mobile: 320px (iPhone SE)

### ✅ Performance Tests

- [ ] **Page Speed**
  - [ ] Test on Google PageSpeed Insights
  - [ ] Target: 90+ on mobile, 95+ on desktop
  - [ ] Check Core Web Vitals (LCP, FID, CLS)

- [ ] **Image Loading**
  - [ ] Verify slideshow images load smoothly
  - [ ] Check lazy loading works (gallery images)
  - [ ] Ensure no broken image links

### ✅ SEO Tests

- [ ] **Meta Tags**
  - [ ] Verify page titles are unique per page
  - [ ] Check meta descriptions are present
  - [ ] Verify Open Graph tags on homepage
  - [ ] Check schema.org structured data

- [ ] **Accessibility**
  - [ ] Tab through navigation (keyboard only)
  - [ ] Verify focus states visible
  - [ ] Check ARIA labels on buttons
  - [ ] Test with screen reader (optional but recommended)

---

## Deployment Steps

### 1. Final Content Review

- [ ] **Read through all copy for typos**
  - [ ] Homepage headline and mission
  - [ ] "Our Story" section
  - [ ] "Granix Difference" cards
  - [ ] Contact page text
  - [ ] CTA buttons

- [ ] **Verify Phone Numbers**
  - [ ] UAE: +971 58 196 8890 ✓
  - [ ] East Africa: +256 708 331 185 ✓
  - [ ] Email: granixprimestonesltd25@gmail.com ✓

- [ ] **Check All Links**
  - [ ] Internal navigation links
  - [ ] Footer links
  - [ ] Email links (mailto:)
  - [ ] Phone links (tel:)

### 2. Git Commit

```bash
git add .
git commit -m "feat: Implement world-class international upgrade

- Add bold visionary headline and mission statement
- Enhance 'Granix Difference' with 4 competitive advantages
- Add 'Our Story' trust-building section with team narrative
- Upgrade CTAs to consultative language
- Implement EN/AR language selector across all pages
- Add international phone formatting with regional labels
- Improve mobile responsiveness for new sections
- Add strategic messaging targeting architects/developers"

git push origin main
```

### 3. GitHub Pages Deployment

- [ ] **Navigate to GitHub repository**
- [ ] **Go to Settings > Pages**
- [ ] **Verify source is set to**: `main` branch, `/` (root) folder
- [ ] **Wait 2-5 minutes for deployment**
- [ ] **Check deployment status** in Actions tab

### 4. Post-Deployment Verification

- [ ] **Visit live site**: https://k-jc63.github.io/GRANIX/
- [ ] **Test language toggle** on live site
- [ ] **Test phone links** on mobile device
- [ ] **Verify images load** (check for CORS issues)
- [ ] **Test contact form** submits successfully
- [ ] **Check mobile menu** works on actual phone

---

## Launch Announcement

### Social Media Posts (Suggested)

**LinkedIn** (Professional/B2B):
```
🌍 Excited to unveil our enhanced global presence!

For 15+ years, Granix Prime Stones has journeyed from the marble 
quarries of Carrara to the granite mountains of Brazil, curating 
rare geological masterpieces for the world's most visionary projects.

Today, we're proud to launch our international platform, now serving 
architects and developers across 25+ countries with:
✓ Fully traceable ethical sourcing
✓ One-of-a-kind natural stone slabs
✓ Multi-language accessibility (EN/AR)
✓ Global consultation services

Visit us: https://k-jc63.github.io/GRANIX/

#NaturalStone #Architecture #LuxuryDesign #GlobalBusiness
```

**Instagram** (Visual/Aspirational):
```
The foundation of the world's most ambitious architecture. 🌍✨

For 15 years, we've curated rare stone from the earth's most remote 
quarries for projects that define skylines.

Every slab is one-of-a-kind.
Every project is a legacy.

Explore our portfolio: [link in bio]

#GranixPrimeStones #NaturalStone #LuxuryDesign #IconicArchitecture
```

### Email to Existing Clients

**Subject**: "Our New Global Platform: Serving You Better"

```
Dear [Client],

We're excited to share that Granix Prime Stones has launched 
our enhanced international platform.

What's New:
• Multi-language accessibility (English/Arabic)
• Global consultation booking
• Enhanced portfolio showcase
• Easier international contact

Same Quality, Global Reach:
✓ 15+ years of stone curation expertise
✓ Ethical sourcing from world's finest quarries
✓ One-of-a-kind geological masterpieces

We're committed to bringing you the rarest, most extraordinary 
natural stone for your visionary projects.

Visit our new platform: https://k-jc63.github.io/GRANIX/

Request a complimentary consultation: [Contact Link]

Best regards,
The Granix Prime Stones Team
```

---

## Monitoring & Analytics

### Set Up Tracking (If Not Already Done)

- [ ] **Google Analytics 4**
  - [ ] Install tracking code
  - [ ] Set up goals: Form submissions, phone clicks
  - [ ] Track language toggle usage
  - [ ] Monitor geographic traffic (UAE focus)

- [ ] **Google Search Console**
  - [ ] Verify ownership
  - [ ] Submit sitemap
  - [ ] Monitor search impressions

- [ ] **Hotjar/Microsoft Clarity** (Optional)
  - [ ] Install heatmap tracking
  - [ ] Watch session recordings
  - [ ] Identify user behavior patterns

### Key Metrics to Track (First 30 Days)

- [ ] **Traffic**
  - Total visitors
  - Geographic breakdown (Uganda vs UAE vs other)
  - Mobile vs desktop ratio
  - Bounce rate (target: <50%)

- [ ] **Engagement**
  - Time on site (target: >2 minutes)
  - Pages per session (target: >3)
  - Language toggle usage
  - "Our Story" scroll depth

- [ ] **Conversions**
  - Contact form submissions
  - Phone link clicks
  - Email link clicks
  - Primary CTA clicks ("Request Consultation")

- [ ] **Sources**
  - Direct traffic
  - Google search
  - Social media referrals
  - Backlinks

---

## Troubleshooting

### Common Issues & Fixes

**Issue**: Language toggle doesn't work
- **Fix**: Check browser console for JavaScript errors
- **Fix**: Clear browser cache and reload
- **Fix**: Verify main.js loaded correctly (check Network tab)

**Issue**: Images not loading on GitHub Pages
- **Fix**: Ensure image paths are relative, not absolute
- **Fix**: Check image file names match exactly (case-sensitive)
- **Fix**: Verify images are committed to repository

**Issue**: Phone links don't work on mobile
- **Fix**: Verify `tel:` protocol is correct
- **Fix**: Remove spaces in phone number (use hyphens)
- **Fix**: Test on actual device, not desktop browser

**Issue**: Mobile menu won't close
- **Fix**: Check nav-toggle event listener in main.js
- **Fix**: Test on actual mobile device vs browser emulation

**Issue**: Layout broken on specific screen size
- **Fix**: Test exact breakpoint in browser DevTools
- **Fix**: Check for missing @media query in styles.css
- **Fix**: Verify CSS grid/flexbox fallbacks

---

## Success Criteria (30 Days Post-Launch)

### Quantitative:
- [ ] 20%+ increase in international inquiries (UAE, Europe)
- [ ] 15%+ increase in average session duration
- [ ] 10%+ improvement in conversion rate
- [ ] 30%+ increase in architect/developer leads

### Qualitative:
- [ ] Client feedback mentions "professional", "international"
- [ ] Increased inquiries for high-value projects (>$50k)
- [ ] Press/media mentions brand as "global" or "luxury"
- [ ] Competitor analysis shows clear differentiation

---

## Backup Plan

### Before Deployment:
- [ ] **Create backup** of current live site
- [ ] **Export current version** to `/backup_[date]/` folder
- [ ] **Document rollback steps** if needed

### Rollback Procedure (If Major Issues):
1. Revert last commit: `git revert HEAD`
2. Push to main: `git push origin main`
3. Wait for GitHub Pages to redeploy
4. Investigate issues offline
5. Fix and redeploy when ready

---

## Post-Launch Optimization (Week 2-4)

- [ ] **Review analytics** - identify drop-off points
- [ ] **A/B test CTAs** - "Complimentary Consultation" vs alternatives
- [ ] **Optimize images** - compress if page speed <90
- [ ] **Add more trust signals** - client logos if available
- [ ] **Expand content** - add 1-2 case studies
- [ ] **SEO refinement** - update meta descriptions based on performance

---

## Continuous Improvement

### Monthly Reviews:
- [ ] Check analytics for trends
- [ ] Update portfolio with new projects
- [ ] Refresh testimonials if available
- [ ] Monitor competitor websites
- [ ] Update content based on client feedback

### Quarterly Updates:
- [ ] Refresh imagery (new project photos)
- [ ] Update statistics (projects completed, countries served)
- [ ] Add seasonal messaging if relevant
- [ ] Review and update pricing/service descriptions

---

## 🎯 Final Pre-Launch Check

**Ask yourself these questions:**

1. ✅ Does the headline immediately communicate our unique value?
2. ✅ Can an architect in Dubai understand we serve international clients?
3. ✅ Are the competitive advantages clear vs artificial stone?
4. ✅ Does the "Our Story" section build trust?
5. ✅ Is the language toggle obvious and functional?
6. ✅ Are phone numbers formatted for international calling?
7. ✅ Do CTAs feel valuable, not salesy?
8. ✅ Is the site fast on mobile?
9. ✅ Does every page have a clear next action?
10. ✅ Am I proud to share this with my best clients?

**If all answers are YES → DEPLOY! 🚀**

---

## Support Contacts

If you need assistance post-deployment:

- **GitHub Pages Issues**: https://docs.github.com/pages
- **Web Development Support**: [Your preferred developer/agency]
- **Analytics Setup**: Google Analytics Help Center
- **Emergency Rollback**: Follow backup procedure above

---

**Remember**: A perfect launch is better than a rushed one. 

Take your time with this checklist. The difference between good and 
world-class is attention to these final details.

**You've got this! 🌟**

---

*Last Updated: October 30, 2025*
*Prepared for: Granix Prime Stones Ltd.*
