export function initializeNavigation(): void {
  const menu = document.querySelector<HTMLDetailsElement>('.navigation-menu');
  const toggle = menu?.querySelector<HTMLElement>('.navigation-toggle');
  if (!menu || !toggle) return;

  toggle.setAttribute('aria-controls', 'main-navigation');
  const syncState = () => {
    const expanded = menu.open;
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.setAttribute('aria-label', expanded ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    toggle.querySelector('svg')?.setAttribute('data-expanded', String(expanded));
    const path = toggle.querySelector('svg path');
    path?.setAttribute('d', expanded ? 'M5 5l14 14M19 5 5 19' : 'M4 7h16M4 12h16M4 17h16');
  };
  syncState();
  menu.addEventListener('toggle', syncState);
  menu.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      syncState();
      toggle.focus();
    }
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
  if (floatingBackToTop && ecosystem) {
    let framePending = false;
    const updateBackToTop = () => {
      framePending = false;
      const isPastHero = ecosystem.getBoundingClientRect().top < window.innerHeight - 1;
      floatingBackToTop.classList.toggle('is-visible', isPastHero);
      floatingBackToTop.setAttribute('aria-hidden', String(!isPastHero));
    };
    const scheduleUpdate = () => {
      if (framePending) return;
      framePending = true;
      window.requestAnimationFrame(updateBackToTop);
    };

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    updateBackToTop();
  }
}
