import purgecss from '@fullhuman/postcss-purgecss';

const purgecssPlugin = purgecss({
  content: ["./hugo_stats.json"],
  defaultExtractor: (content) => {
    const els = JSON.parse(content).htmlElements;
    return [...(els.tags || []), ...(els.classes || []), ...(els.ids || [])];
  },
  // Safelist classes that are added dynamically via JavaScript
  // Add any classes here that JS adds but aren't in HTML templates
  safelist: [
    // Animation states
    'visible',
    'hidden',
    'active',
    'open',
    'closed',
    'loading',
    'loaded',
    'error',
    'success',
    // Modal states
    'modal-open',
    'is-open',
    'is-closing',
    'is-visible',
    // Scroll states
    'scrolled',
    'no-scroll',
    // Theme states
    'dark',
    'light',
    // Touch/hover states
    'is-touched',
    'is-hovered',
    'is-focused',
    // Responsive states
    'mobile',
    'tablet',
    'desktop',
    // Utility classes that might be added dynamically
    /^fade-/,
    /^slide-/,
    /^animate-/,
    /^toast-/,
  ],
});

export default {
  plugins: [
    ...(process.env.HUGO_ENVIRONMENT === "production" ? [purgecssPlugin] : []),
  ],
};
