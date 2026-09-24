export function initializeHeroScrollAnimation(): void {
  const heroPanel = document.querySelector<HTMLElement>('[data-hero-panel]');
  const incomingSection = document.querySelector<HTMLElement>('#ecosystem');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!heroPanel || !incomingSection) return;

  const supportsNativeScrollAnimation =
    CSS.supports('animation-timeline: --ecosystem-scroll') &&
    CSS.supports('animation-range: entry 0% entry 100%') &&
    CSS.supports('view-timeline-name: --ecosystem-scroll') &&
    CSS.supports('timeline-scope: --ecosystem-scroll');

  if (supportsNativeScrollAnimation) return;

  let frame = 0;
  let ecosystemTop = 0;

  const measure = () => {
    ecosystemTop = incomingSection.getBoundingClientRect().top + window.scrollY;
    scheduleUpdate();
  };

  const updateProgress = () => {
    frame = 0;

    if (reduceMotion.matches) {
      heroPanel.style.removeProperty('--hero-scroll-progress');
      return;
    }

    const ecosystemViewportTop = ecosystemTop - window.scrollY;
    const progress = Math.min(
      Math.max((window.innerHeight - ecosystemViewportTop) / window.innerHeight, 0),
      1,
    );
    heroPanel.style.setProperty('--hero-scroll-progress', progress.toFixed(3));
  };

  const scheduleUpdate = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(updateProgress);
  };

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', measure, { passive: true });
  window.addEventListener('load', measure, { once: true });
  const scrollTrack = document.querySelector<HTMLElement>('[data-hero-scroll-track]');
  if (scrollTrack && 'ResizeObserver' in window) {
    new ResizeObserver(measure).observe(scrollTrack);
  }
  reduceMotion.addEventListener('change', scheduleUpdate);
  measure();
}
