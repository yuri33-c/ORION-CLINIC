/**
 * ========================================================================
 * ÓRION EDUCAÇÃO — JAVASCRIPT DAS PÁGINAS INDIVIDUAIS DOS PROGRAMAS
 * ========================================================================
 */
(() => {
  const menu = document.getElementById('courseDetailMenu');
  const nav = document.getElementById('courseDetailNav');
  const progress = document.getElementById('detailProgressBar');

  const setProgress = () => {
    if (!progress) return;
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const value = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.width = `${Math.min(100, Math.max(0, value))}%`;
  };

  window.addEventListener('scroll', setProgress, { passive: true });
  window.addEventListener('resize', setProgress);
  setProgress();

  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menu.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (event) => {
      if (!nav.classList.contains('open')) return;
      if (nav.contains(event.target) || menu.contains(event.target)) return;
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    });
  }

  document.querySelectorAll('.detail-faq-item').forEach((item) => {
    item.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.detail-faq-item.open').forEach((openItem) => openItem.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  const reveals = document.querySelectorAll('.detail-reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

    reveals.forEach((el, index) => {
      el.style.transitionDelay = `${Math.min(index * 55, 260)}ms`;
      io.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  const heroMedia = document.querySelector('.detail-hero-media');
  if (heroMedia && window.matchMedia('(pointer:fine)').matches) {
    heroMedia.addEventListener('pointermove', (event) => {
      const rect = heroMedia.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      heroMedia.style.setProperty('--mx', `${x * 10}px`);
      heroMedia.style.setProperty('--my', `${y * 8}px`);
    });
    heroMedia.addEventListener('pointerleave', () => {
      heroMedia.style.setProperty('--mx', '0px');
      heroMedia.style.setProperty('--my', '0px');
    });
  }
})();
