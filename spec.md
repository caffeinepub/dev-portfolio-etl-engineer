# Dev Portfolio - ETL Engineer

## Current State
New project, no existing application files.

## Requested Changes (Diff)

### Add
- Full single-page portfolio website for a Data Engineer / Backend Engineer
- 11 sections: Hero, Project Overview, Problem, Solution, Architecture, Features, Tech Stack, Impact, Code Showcase, About, Contact
- Sticky navbar with blur, hamburger mobile nav
- Intersection Observer scroll animations (fade/slide in)
- Animated stat counters in Impact section
- Tabbed code showcase with syntax-highlighted Python snippets
- Horizontal architecture flow diagram with animated connecting lines
- Glassmorphism card components throughout
- Tech stack badge/pill display
- CTA buttons: View Project (anchor scroll) and GitHub (external)

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Build App.tsx as the main portfolio shell with navbar
2. Create each section as a React component:
   - HeroSection: animated gradient mesh background, headline, subtext, CTA buttons
   - ProjectOverview: description + animated stat cards
   - ProblemSection: dark cards with red/orange warning accents
   - SolutionSection: green/blue accent cards
   - ArchitectureSection: horizontal flow diagram with icons and animated arrows
   - FeaturesSection: 6-card grid
   - TechStackSection: badge/pill display with hover effects
   - ImpactSection: animated counter numbers
   - CodeShowcase: tabbed interface with syntax-highlighted code blocks
   - AboutSection: bio + skills tags
   - ContactSection: GitHub + LinkedIn buttons
3. Implement useIntersectionObserver hook for scroll animations
4. Implement useCounter hook for animated number counts
5. Apply glassmorphism styles, gradient accents, Inter font throughout
6. Ensure full mobile responsiveness
