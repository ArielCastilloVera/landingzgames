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
  const sections = links
    .map((link) => ({ link, section: document.querySelector<HTMLElement>(link.hash) }))
    .filter((entry): entry is { link: HTMLAnchorElement; section: HTMLElement } =>
      Boolean(entry.section),
    );
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          for (const { link, section } of sections) {
            if (section === entry.target) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
          }
        }
      },
      { rootMargin: '-90px 0px -45% 0px', threshold: 0 },
    );
    for (const { section } of sections) observer.observe(section);
  }

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

  if (floatingBackToTop && ecosystem) {
    let framePending = false;
    let previousScrollY = window.scrollY;

    const updateBackToTop = () => {
      framePending = false;
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - previousScrollY;
      const ecosystemTop = ecosystem.getBoundingClientRect().top;
      const isPastHero = ecosystemTop < window.innerHeight - 1;
      const heroTransitionComplete = ecosystemTop <= 0;

      floatingBackToTop.classList.toggle('is-visible', isPastHero);
      floatingBackToTop.setAttribute('aria-hidden', String(!isPastHero));
      siteHeader?.classList.toggle('is-scrolled', isPastHero);

      if (siteHeader) {
        const headerHasFocus = siteHeader.contains(document.activeElement);
        if (!heroTransitionComplete || currentScrollY <= 0 || scrollDelta < -4 || headerHasFocus) {
          siteHeader.classList.remove('is-hidden');
        } else if (currentScrollY > 120 && scrollDelta > 4) {
          siteHeader.classList.add('is-hidden');
        }
      }

      previousScrollY = currentScrollY;
    };
    const scheduleUpdate = () => {
      if (framePending) return;
      framePending = true;
      window.requestAnimationFrame(updateBackToTop);
    };

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    siteHeader?.addEventListener('focusin', () => siteHeader.classList.remove('is-hidden'));
    updateBackToTop();
  }
}
