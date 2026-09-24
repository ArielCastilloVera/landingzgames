export function initializeHeroScrollAnimation(): void {
  const heroPanel = document.querySelector<HTMLElement>('[data-hero-panel]');
  const incomingSection = document.querySelector<HTMLElement>('#ecosystem');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!heroPanel || !incomingSection) return;

  let frame = 0;

  const updateProgress = () => {
    frame = 0;

    if (reduceMotion.matches) {
      heroPanel.style.removeProperty('--hero-scroll-progress');
      return;
    }

    const progress = Math.min(
      Math.max(
        (window.innerHeight - incomingSection.getBoundingClientRect().top) / window.innerHeight,
        0,
      ),
      1,
    );
    heroPanel.style.setProperty('--hero-scroll-progress', progress.toFixed(3));
  };

  const scheduleUpdate = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(updateProgress);
  };

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  reduceMotion.addEventListener('change', scheduleUpdate);
  updateProgress();
}
