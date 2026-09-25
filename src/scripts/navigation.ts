export function initializeNavigation(): void {
  const siteHeader = document.querySelector<HTMLElement>('.site-header');
  const menu = document.querySelector<HTMLElement>('.navigation-menu');
  const toggle = menu?.querySelector<HTMLButtonElement>('.navigation-toggle');
  if (!menu || !toggle) return;

  toggle.setAttribute('aria-controls', 'main-navigation');
  const syncState = () => {
    const expanded = menu.classList.contains('is-open');
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.setAttribute(
      'aria-label',
      expanded ? 'Cerrar menú de navegación' : 'Abrir menú de navegación',
    );
    toggle.querySelector('svg')?.setAttribute('data-expanded', String(expanded));
    const path = toggle.querySelector('svg path');
    path?.setAttribute('d', expanded ? 'M5 5l14 14M19 5 5 19' : 'M4 7h16M4 12h16M4 17h16');
  };
  syncState();
  toggle.addEventListener('click', () => {
    menu.classList.toggle('is-open');
    syncState();
  });
  menu.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      menu.classList.remove('is-open');
      syncState();
      toggle.focus();
    }
  });

  const navigation = menu.querySelector<HTMLElement>('.main-navigation');
  const mobileNavigation = window.matchMedia('(max-width: 640px)');
  const scrollToHero = (event: MouseEvent) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  document.querySelectorAll<HTMLAnchorElement>('a[href="#top"]').forEach((link) => {
    link.addEventListener('click', scrollToHero);
  });

  navigation?.addEventListener('click', (event) => {
    if (mobileNavigation.matches && event.target instanceof Element && event.target.closest('a')) {
      menu.classList.remove('is-open');
      syncState();
    }
  });
  mobileNavigation.addEventListener('change', () => {
    menu.classList.remove('is-open');
    syncState();
  });

  const links = [...menu.querySelectorAll<HTMLAnchorElement>('.main-navigation a:not(.button)')];
  const destinations = links
    .map((link) => ({ link, section: document.querySelector<HTMLElement>(link.hash) }))
    .filter((entry): entry is { link: HTMLAnchorElement; section: HTMLElement } =>
      Boolean(entry.section),
    );

  const floatingBackToTop = document.querySelector<HTMLAnchorElement>('.back-to-top--floating');
  const ecosystem = document.querySelector<HTMLElement>('#ecosystem');
  if (floatingBackToTop) {
    floatingBackToTop.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
    });
  }

  let framePending = false;

  const updateActiveNavigation = () => {
    if (destinations.length === 0) return;
    const activationLine = (siteHeader?.getBoundingClientRect().bottom ?? 0) + 24;
    let activeDestination = destinations[0];

    for (const destination of destinations) {
      if (destination.section.getBoundingClientRect().top > activationLine) break;
      activeDestination = destination;
    }

    for (const { link } of destinations) {
      if (link === activeDestination.link) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  };

  const updateScrollState = () => {
    framePending = false;
    if (floatingBackToTop && ecosystem) {
      const ecosystemTop = ecosystem.getBoundingClientRect().top;
      const isPastHero = ecosystemTop < window.innerHeight - 1;

      floatingBackToTop.classList.toggle('is-visible', isPastHero);
      floatingBackToTop.setAttribute('aria-hidden', String(!isPastHero));
      siteHeader?.classList.toggle('is-scrolled', isPastHero);
    }
    updateActiveNavigation();
  };

  const scheduleUpdate = () => {
    if (framePending) return;
    framePending = true;
    window.requestAnimationFrame(updateScrollState);
  };

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  updateScrollState();
}
