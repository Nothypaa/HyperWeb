# Staggered Menu Behavior Guide

## Overview
This document describes how to create a sophisticated sliding menu that appears from the right side of the screen with smooth GSAP animations and staggered reveals.

## Visual Behavior

### Menu Button
- **Position**: Fixed in top-right corner (desktop only)
- **Initial State**: Shows "Menu" text with a plus icon (+)
- **Hover State**: Slight scale up (1.05x) with shadow increase
- **Active State**: Text cycles through "Menu" → "Close" → "Menu" → "Close" → "Close" (final)
- **Icon Animation**: Plus icon rotates to X (45° and -45° for horizontal/vertical lines)

### Menu Panel Animation Sequence

#### Opening Animation (Staggered Layers)
1. **Background Layers** (0-350ms):
   - Multiple dark layers slide in from right (`translateX(100%)` → `translateX(0%)`)
   - Each layer starts 70ms after the previous one
   - Creates depth effect with different shades

2. **Main Panel** (430ms):
   - White/themed panel slides in from right
   - Overlays the background layers
   - Duration: 650ms with `power4.out` easing

3. **Menu Items** (580ms):
   - Each menu item starts at `translateY(140%)` and `rotate(10deg)`
   - Animates to `translateY(0%)` and `rotate(0deg)`
   - Staggered 100ms between each item
   - Numbers fade in 100ms after each item

4. **Custom Content** (640ms):
   - Dark mode toggle or custom slot fades in
   - `opacity: 0` → `opacity: 1` with slight upward movement

5. **Social Links** (860ms) [if enabled]:
   - Social section title fades in first
   - Links animate up from `translateY(25px)` with stagger

#### Closing Animation
- All elements slide right simultaneously (`translateX(0%)` → `translateX(100%)`)
- Duration: 320ms with `power3.in` easing
- Much faster than opening for snappy feel

## Technical Implementation

### Required Dependencies
```bash
npm install gsap
```

### Menu Items Structure
```typescript
interface MenuItem {
  label: string;           // Display text (e.g., "Accueil", "Tarifs")
  ariaLabel: string;       // Accessibility label
  link: string;            // URL or anchor (#pricing, #contact)
  onClick?: () => void;    // Custom click handler for anchors
}
```

### Your Specific Menu Items
```typescript
const menuItems = [
  { label: 'Accueil', ariaLabel: 'Retour à la page d\'accueil', link: '/' },
  { label: 'Tarifs', ariaLabel: 'Voir nos tarifs et offres', link: '#pricing' },
  { label: 'Portfolio', ariaLabel: 'Découvrir nos réalisations', link: '#portfolio' },
  { label: 'Blog', ariaLabel: 'Lire nos articles de blog', link: '/blog' },
  { label: 'FAQ', ariaLabel: 'Questions fréquemment posées', link: '/faq' },
  { label: 'Contact', ariaLabel: 'Nous contacter', link: '#contact' }
];
```

### Color Scheme Customization
Instead of the default purple/yellow, use your theme:
- **Background Layers**: `['hsl(var(--background))', 'hsl(var(--muted))']`
- **Panel Background**: `hsl(var(--background))`
- **Text Color**: `hsl(var(--foreground))`
- **Accent Color**: `hsl(var(--muted-foreground))`
- **Border**: `hsl(var(--border))`

### Layout Positioning
- **Container**: `fixed inset-0 z-50`
- **Desktop Only**: `hidden lg:block` (1024px+)
- **Outside Stacking Context**: Place outside any `relative` positioned containers
- **Pointer Events**: `pointer-events-none` on container, `pointer-events-auto` on interactive elements

## GSAP Animation Details

### Timeline Structure
```javascript
const tl = gsap.timeline({ paused: true });

// Layer animations (staggered)
layerElements.forEach((layer, i) => {
  tl.fromTo(layer,
    { xPercent: 100 },
    { xPercent: 0, duration: 0.5, ease: 'power4.out' },
    i * 0.07
  );
});

// Panel animation
tl.fromTo(panel,
  { xPercent: 100 },
  { xPercent: 0, duration: 0.65, ease: 'power4.out' },
  panelStartTime
);

// Menu items animation
tl.to(menuItems,
  {
    yPercent: 0,
    rotate: 0,
    duration: 1,
    ease: 'power4.out',
    stagger: { each: 0.1, from: 'start' }
  },
  itemsStartTime
);
```

### Key Animation Properties
- **Easing**: `power4.out` for opening, `power3.in` for closing
- **Stagger Timing**: 70ms between layers, 100ms between menu items
- **Transform Origin**: `50% 100%` for menu item rotations
- **Overflow Control**: Set `body { overflow: hidden }` when menu opens

## Dark Mode Integration

### ThemeToggle Positioning in Menu
```jsx
const themeToggleSlot = (
  <div className="flex flex-col items-center gap-4 py-6 border-t border-border/20">
    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
      Thème
    </h4>
    <ThemeToggle />
  </div>
);
```

## Responsive Behavior
- **Desktop (lg+)**: Full menu functionality
- **Mobile/Tablet**: Hidden completely - use existing mobile hamburger menu
- **Breakpoint**: `1024px` and above only

## Accessibility Features
- **ARIA Labels**: All interactive elements properly labeled
- **Keyboard Navigation**: Focus management and keyboard support
- **Screen Readers**: Proper announcement of menu state changes
- **Focus Trapping**: Keep focus within menu when open

## Performance Considerations
- **Will-Change**: Apply to animated elements
- **Transform**: Use transforms instead of position changes
- **GPU Acceleration**: Automatically triggered by transforms
- **Cleanup**: Remove event listeners and kill animations on unmount

## Integration Notes
- **Z-Index**: Use high value (50+) and place outside relative containers
- **Scroll Prevention**: Disable body scroll when menu is open
- **Navigation**: Handle both regular links and anchor navigation
- **State Management**: Track open/closed state for proper cleanup

This behavior creates a premium, sophisticated navigation experience that matches high-end web agencies and modern design patterns.