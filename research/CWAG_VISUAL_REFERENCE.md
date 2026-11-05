# CWAG Visual Reference & Design Direction

Created: 5 November 2026

## 1. Reference Websites Inspected

### Sports Authority of India (SAI)
**URL:** https://sportsauthorityofindia.gov.in/sai_new/

**Key Design Elements:**
- Government institutional header with national emblem
- Leadership portraits (PM, Minister, Officials) prominently displayed
- Statistics with animated counters (Athletes, Coaches, Training Centers)
- Timeline/journey visualization for organizational history
- Mission and Vision prominently stated
- News ticker/announcements section

**Relevant for CWAG:**
- Clear organizational hierarchy display
- Statistics presentation style
- Mission/Vision layout format
- Institutional credibility markers

**Adaptations:**
- CWAG should NOT copy government emblems or authority markers
- Can adapt statistics presentation format
- Timeline concept useful for "Our Journey" if history becomes verified

### Khel Mahakumbh / Sports Authority of Gujarat (SAG)
**URL:** https://khelmahakumbh.gujarat.gov.in/

**Key Design Elements:**
- Leadership profiles with photos (CM, Deputy CM, Minister, Secretary)
- Large registration counter (7.6M+ participants)
- Tagline: "From Grassroots to Greatness"
- Government institutional styling with Gujarat state identity

**Relevant for CWAG:**
- Gujarat context and visual identity
- Professional leadership presentation style
- Clear relationship articulation with government

**Important Distinction:**
- SAG is a government body; CWAG is an independent association
- CWAG represents coaches' welfare interests
- Design should be professional but not governmental

### Khelo India
**URL:** https://www.kheloindia.gov.in/

**Key Design Elements:**
- Clean, modern design
- "Gateway to Indian Sports" positioning
- Achievement metrics prominently displayed
- Social media integration
- Partnership/association logos section

**Relevant for CWAG:**
- Modern sports website aesthetic
- Clear achievement presentation
- Partnership acknowledgment format

### MY Bharat
**URL:** https://mybharat.gov.in/

**Key Design Elements:**
- Modern, youth-focused design
- Feature highlights with icons
- Clear value proposition
- Volunteer/engagement focus

**Relevant for CWAG:**
- Modern institutional website styling
- Value proposition presentation
- Member benefits articulation

## 2. Design Direction for CWAG

### Identity Positioning

CWAG should be positioned as:
- **Professional Association** (not government body)
- **Coaches' Collective Voice** (welfare and representation)
- **Sports Development Stakeholder** (supporting Gujarat's sporting ecosystem)

### Visual Identity

#### Color Palette

| Role | Color | Hex | OKLCH |
|------|-------|-----|-------|
| Primary | Deep Navy Blue | #1e3a8a | oklch(0.40 0.12 260) |
| Primary Light | Royal Blue | #3b82f6 | oklch(0.65 0.18 250) |
| Accent | Saffron Gold | #f59e0b | oklch(0.78 0.17 75) |
| Accent Dark | Deep Amber | #d97706 | oklch(0.68 0.17 60) |
| Background | Warm White | #fafaf9 | oklch(0.98 0.002 90) |
| Text | Near Black | #18181b | oklch(0.15 0.01 285) |

**Rationale:**
- Navy blue: Authority, professionalism, trust (sports federation standard)
- Saffron/Gold: Gujarat identity, excellence, recognition
- Warm tones: Approachable, human-centered

#### Typography

| Role | Typeface | Weight | Usage |
|------|----------|--------|-------|
| Display | DM Sans | 700 | Headlines, h1-h2 |
| Body | Inter | 400-500 | Paragraphs, UI |
| Gujarati | Noto Sans Gujarati | 400-600 | All GU content |
| Accent | DM Sans | 600 | Labels, buttons |

#### Signature Element

**Coach's Whistle + Stopwatch Motif**

The coach's whistle is universally recognized as the symbol of coaching authority. Combined with a stopwatch (time, training, performance), this creates a distinctive CWAG visual signature.

Implementation options:
1. Subtle 3D whistle in hero section
2. Whistle icon in logo mark
3. Stopwatch-inspired progress indicators

### Layout Principles

1. **Photography-Led Hero**
   - Full-bleed coaching imagery
   - Coach interacting with athletes
   - Editorial typography overlay

2. **Clear Information Hierarchy**
   - Organization name and purpose first
   - Documented work/advocacy second
   - Membership information third

3. **Institutional but Approachable**
   - Professional grid structure
   - Warm photography
   - Accessible language

4. **Content Honesty**
   - Only verified information
   - Clear disclaimers where needed
   - Source citations

## 3. Homepage Structure Redesign

### Section 1: Hero
**Goal:** Immediately communicate CWAG's identity

Components:
- Full-width coaching photograph (coach with athletes)
- Strong headline: "Recognising the People Behind Every Sporting Achievement"
- Subhead: Organization identity statement
- Primary CTA: "Become a Member"
- Secondary CTA: "Know About CWAG"

### Section 2: Organization Introduction
**Goal:** Establish what CWAG is

Components:
- Brief introduction paragraph (from verified research)
- Key focus areas (from documented activities)
- Visual: Coach imagery or 3D accent

### Section 3: Coaches' Welfare (Our Purpose)
**Goal:** Explain why CWAG exists

Components:
- Three pillars: Recognition, Representation, Welfare
- Brief explanation of each
- Visual connection to coaching

### Section 4: Documented Work
**Goal:** Show credibility through verified activity

Components:
- August 2024 representation highlight
- Source citation (Gujarat Samachar)
- Clear presentation of concerns raised
- Note about ongoing nature

### Section 5: Coaches in Gujarat's Sports Ecosystem
**Goal:** Connect to broader context

Components:
- Brief statement on coaches' importance
- Connection to Gujarat sports development
- Visual: Sports/training imagery

### Section 6: News & Updates
**Goal:** Show current relevance

Components:
- Verified news (Gujarat Samachar article)
- Space for future updates
- Clear indication of verified vs. placeholder

### Section 7: Membership CTA
**Goal:** Convert interest to action

Components:
- Value proposition for joining
- Clear membership inquiry path
- Note about official process pending

### Section 8: Contact
**Goal:** Enable communication

Components:
- Contact form
- Placeholder for official details
- SAG reference (as separate entity)

## 4. Navigation Structure

**Primary Navigation:**
- Home
- About CWAG
- Our Work
- Membership
- News
- Contact

**Secondary (Footer):**
- Quick Links
- Resources (Government links)
- Contact Info

**Utility:**
- Language Toggle (EN/ગુ)
- Theme Toggle (optional)

## 5. Key Visual Components

### Coach Imagery Guidelines

**Do Use:**
- Coaches giving instructions
- Training sessions in progress
- Track and field environments
- Professional sports settings
- Athletes receiving guidance

**Don't Use:**
- Generic gym/fitness imagery
- Stock photos that look corporate
- Football club/soccer-specific imagery
- Tournament/competition focus only

### Photography Treatment

- Natural lighting preferred
- Warm color grading (slight amber)
- High contrast for drama
- Overlay text: ensure readability

### 3D Elements

**Whistle + Stopwatch:**
- Metallic/chrome material
- Soft shadows
- Subtle rotation animation
- Hero section accent only

**Implementation:**
- Three.js with React Three Fiber
- Lazy load for performance
- Static fallback for mobile/low-power

## 6. Implementation Notes

### Performance
- Optimize all images (WebP with JPEG fallback)
- Lazy load below-fold content
- Preload hero image
- Use Next.js Image component

### Accessibility
- Alt text on all images
- Proper heading hierarchy
- Focus states on interactive elements
- Color contrast compliance (WCAG AA)

### Responsiveness
- Mobile-first approach
- Hero adapts to portrait/landscape
- Navigation converts to hamburger menu
- Touch-friendly tap targets

### Bilingual Support
- Maintain existing EN/GU system
- Ensure Gujarati text renders correctly
- Font loading strategy (display: swap)

---

## 7. What NOT to Do

1. **Don't fabricate CWAG history or achievements**
2. **Don't use government logos as CWAG branding**
3. **Don't claim leadership without verification**
4. **Don't present SAG/SAI events as CWAG events**
5. **Don't use copyrighted news photos without permission**
6. **Don't make the site look like a sports club/gym**
7. **Don't overwhelm with 3D effects**
8. **Don't hide the "pending verification" notes**

---

*This document guides the CWAG website visual redesign while respecting the limitations of verified information.*
