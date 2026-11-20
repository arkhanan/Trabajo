const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

function setMenu(open) {
  menuButton?.setAttribute('aria-expanded', String(open));
  menuButton?.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  navigation?.classList.toggle('is-open', open);
}

menuButton?.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});

navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navigation?.classList.contains('is-open')) {
    setMenu(false);
    menuButton?.focus();
  }
});

document.addEventListener('click', (e) => {
  if (navigation?.classList.contains('is-open') && !e.target.closest('.site-header')) setMenu(false);
});

// Marca la sección visible en el menú
const links = [...(navigation?.querySelectorAll('a[href^="#"]:not(.nav-cta)') ?? [])];
const sections = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) =>
          a.toggleAttribute('aria-current', a.getAttribute('href') === `#${entry.target.id}`)
        );
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach((s) => observer.observe(s));
}
