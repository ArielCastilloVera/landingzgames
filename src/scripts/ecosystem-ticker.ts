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

  const track = ticker.querySelector<HTMLElement>('.ecosystem-ticker__track');
  let tickerVisible = false;
  const updatePlayback = () => {
    if (!track) return;
    track.style.animationPlayState = tickerVisible && !document.hidden ? 'running' : 'paused';
  };
  const visibilityObserver = new IntersectionObserver(
    ([entry]) => {
      tickerVisible = entry.isIntersecting;
      updatePlayback();
    },
    { rootMargin: '120px' },
  );
  visibilityObserver.observe(ticker);
  document.addEventListener('visibilitychange', updatePlayback);

  updateDuration();

  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(updateDuration);
    observer.observe(ticker);
    observer.observe(firstGroup);
    return;
  }

  window.addEventListener('resize', updateDuration, { passive: true });
}
