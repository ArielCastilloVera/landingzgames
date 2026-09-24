const BASE_CYCLE_SECONDS = 30;

export function initializeEcosystemTicker(): void {
  const ticker = document.querySelector<HTMLElement>('.ecosystem-ticker');
  const firstGroup = ticker?.querySelector<HTMLElement>('.ecosystem-ticker__group');
  if (!ticker || !firstGroup) return;

  const updateDuration = () => {
    const viewportWidth = ticker.clientWidth;
    const cycleWidth = firstGroup.getBoundingClientRect().width;
    if (viewportWidth <= 0 || cycleWidth <= 0) return;

    const duration = (BASE_CYCLE_SECONDS * cycleWidth) / viewportWidth;
    ticker.style.setProperty('--ecosystem-ticker-duration', `${duration}s`);
  };

  updateDuration();

  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(updateDuration);
    observer.observe(ticker);
    observer.observe(firstGroup);
    return;
  }

  window.addEventListener('resize', updateDuration, { passive: true });
}
