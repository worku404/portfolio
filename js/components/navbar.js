export function initNavbar() {
  const menuBtn = document.getElementById('menu-toggle');
  const drawer = document.getElementById('menu-drawer');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  if (!menuBtn || !drawer) return;

  function toggleMenu() {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      document.body.style.overflow = '';
    } else {
      drawer.classList.add('open');
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  menuBtn.addEventListener('click', toggleMenu);

  document.querySelectorAll('.drawer-link').forEach((link) => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      document.body.style.overflow = '';
    });
  });
}
