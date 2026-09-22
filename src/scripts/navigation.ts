export function initializeNavigation(): void {
  const menu = document.querySelector<HTMLDetailsElement>('.navigation-menu');
  const toggle = menu?.querySelector<HTMLElement>('.navigation-toggle');
  if (!menu || !toggle) return;

  toggle.setAttribute('aria-controls', 'main-navigation');
  const syncState = () => {
    const expanded = menu.open;
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.setAttribute('aria-label', expanded ? 'Close navigation menu' : 'Open navigation menu');
    toggle.querySelector('svg')?.setAttribute('data-expanded', String(expanded));
    const path = toggle.querySelector('svg path');
    path?.setAttribute('d', expanded ? 'M5 5l14 14M19 5 5 19' : 'M4 7h16M4 12h16M4 17h16');
  };
  syncState();
  menu.addEventListener('toggle', syncState);
  menu.querySelectorAll('a').forEach((link) =>
    link.addEventListener('click', () => {
      menu.open = false;
      syncState();
    }),
  );
  menu.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      syncState();
      toggle.focus();
    }
  });
}
