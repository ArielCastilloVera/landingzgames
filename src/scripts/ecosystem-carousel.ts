const CYCLE_SECONDS = 42;

export function initializeEcosystemCarousel(): void {
  const carousel = document.querySelector<HTMLElement>('.ecosystem-carousel');
  const track = carousel?.querySelector<HTMLElement>('.ecosystem-carousel__track');
  const firstGroup = carousel?.querySelector<HTMLElement>('.ecosystem-carousel__group');
  if (!carousel || !track || !firstGroup) return;

  const updateDuration = () => {
    const viewportWidth = carousel.clientWidth;
    const cycleWidth = firstGroup.getBoundingClientRect().width;
    if (viewportWidth <= 0 || cycleWidth <= 0) return;

    carousel.style.setProperty(
      '--ecosystem-carousel-duration',
      `${(CYCLE_SECONDS * cycleWidth) / viewportWidth}s`,
    );
  };

  let carouselVisible = false;
  const updateVisibility = (isVisible: boolean) => {
    carouselVisible = isVisible;
    carousel.classList.toggle('is-paused', !isVisible || document.hidden);
  };

  let pointerId: number | null = null;
  let pointerStartX = 0;
  let lastPointerX = 0;
  let animationStartTime = 0;
  let dragged = false;
  let suppressClick = false;
  let activeAnimation: Animation | null = null;

  const modulo = (value: number, divisor: number) => ((value % divisor) + divisor) % divisor;

  carousel.addEventListener('pointerdown', (event: PointerEvent) => {
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;

    pointerId = event.pointerId;
    pointerStartX = event.clientX;
    lastPointerX = event.clientX;
    dragged = false;
    activeAnimation = track.getAnimations()[0] ?? null;
    animationStartTime = Number(activeAnimation?.currentTime ?? 0);
    carousel.classList.add('is-dragging');
  });

  window.addEventListener('pointermove', (event: PointerEvent) => {
    if (event.pointerId !== pointerId) return;

    const deltaX = event.clientX - pointerStartX;
    const movementX = event.clientX - lastPointerX;
    lastPointerX = event.clientX;
    if (!dragged && Math.abs(deltaX) < 6) return;
    if (!dragged && !carousel.hasPointerCapture(event.pointerId)) {
      carousel.setPointerCapture(event.pointerId);
    }
    dragged = true;
    event.preventDefault();

    const cycleWidth = firstGroup.getBoundingClientRect().width;
    const duration = Number.parseFloat(getComputedStyle(track).animationDuration) * 1000;
    if (activeAnimation && cycleWidth > 0 && duration > 0) {
      activeAnimation.currentTime = modulo(animationStartTime - (deltaX / cycleWidth) * duration, duration);
    } else {
      carousel.scrollLeft -= movementX;
    }
  });

  const finishDrag = (event: PointerEvent) => {
    if (event.pointerId !== pointerId) return;
    if (carousel.hasPointerCapture(event.pointerId)) carousel.releasePointerCapture(event.pointerId);
    pointerId = null;
    carousel.classList.remove('is-dragging');
    if (dragged) {
      suppressClick = true;
      window.setTimeout(() => { suppressClick = false; }, 0);
    }
    activeAnimation = null;
    dragged = false;
  };

  window.addEventListener('pointerup', finishDrag);
  window.addEventListener('pointercancel', finishDrag);
  carousel.addEventListener('dragstart', (event) => event.preventDefault());
  carousel.addEventListener('click', (event) => {
    if (!suppressClick) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    suppressClick = false;
  }, true);
  const updateKeyboardPause = () => {
    carousel.classList.toggle('is-keyboard-focused', Boolean(carousel.querySelector(':focus-visible')));
  };
  carousel.addEventListener('focusin', updateKeyboardPause);
  carousel.addEventListener('focusout', () => queueMicrotask(updateKeyboardPause));

  const observer = new IntersectionObserver(
    ([entry]) => updateVisibility(entry.isIntersecting),
    { rootMargin: '120px' },
  );
  observer.observe(carousel);
  document.addEventListener('visibilitychange', () => updateVisibility(carouselVisible));

  updateDuration();
  if ('ResizeObserver' in window) {
    const resizeObserver = new ResizeObserver(updateDuration);
    resizeObserver.observe(carousel);
    resizeObserver.observe(firstGroup);
  } else {
    window.addEventListener('resize', updateDuration, { passive: true });
  }
}
