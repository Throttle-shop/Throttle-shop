async function loadComponents() {
  // Load Header
  const headerRes = await fetch('components/header.html');
  document.getElementById('header').innerHTML = await headerRes.text();

  // Load Footer
  const footerRes = await fetch('components/footer.html');
  document.getElementById('footer').innerHTML = await footerRes.text();

  // Mobile menu toggle
  const toggle = document.getElementById('menuToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.getElementById('navLinks').classList.toggle('active');
    });
  }

  // Highlight current page
  const currentPath = window.location.pathname;
  document.querySelectorAll('#navLinks a').forEach(link => {
    if (currentPath.includes(link.getAttribute('href')) ||
        (currentPath === '/' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Show hamburger on mobile
  if (window.innerWidth <= 768) {
    document.querySelectorAll('.menu-toggle').forEach(el => el.style.display = 'block');
  }

  // ── Stutter-free shrinking header ──────────────────────────────────────
  // Drives padding directly via inline style inside a requestAnimationFrame,
  // same approach as johnsmith5710.github.io — avoids class-toggle layout
  // recalculation that causes the in-between stutter.
  const nav = document.querySelector('#header nav');
  if (!nav) return;

  const PAD_TOP_FULL    = 50;   // px — matches CSS starting value
  const PAD_BOTTOM_FULL = 50;
  const PAD_TOP_SMALL   = 6;
  const PAD_BOTTOM_SMALL = 6;
  const SCROLL_RANGE    = 80;   // px of scroll over which the shrink happens

  let ticking = false;

  function updateHeader() {
    const progress = Math.min(window.scrollY / SCROLL_RANGE, 1); // 0 → 1

    const padTop    = PAD_TOP_FULL    + (PAD_TOP_SMALL    - PAD_TOP_FULL)    * progress;
    const padBottom = PAD_BOTTOM_FULL + (PAD_BOTTOM_SMALL - PAD_BOTTOM_FULL) * progress;

    nav.style.paddingTop    = padTop    + 'px';
    nav.style.paddingBottom = padBottom + 'px';

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  // Set initial state
  updateHeader();
}

window.onload = loadComponents;
