(() => {
  const menu = document.getElementById('educationMenu');
  const nav = document.getElementById('educationNav');

  if (menu && nav) {
    menu.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    }));
  }

  document.querySelectorAll('[data-flip-card]').forEach(card => {
    const toggle = () => {
      const flipped = card.classList.toggle('is-flipped');
      card.setAttribute('aria-pressed', String(flipped));
    };

    card.addEventListener('click', event => {
      if (event.target.closest('a, button')) return;
      toggle();
    });

    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
      }
    });
  });

  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => item.classList.toggle('open'));
  });

  const reveal = document.querySelectorAll('.reveal-edu');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveal.forEach((el, index) => {
      el.style.transitionDelay = `${Math.min(index * 45, 240)}ms`;
      observer.observe(el);
    });
  } else reveal.forEach(el => el.classList.add('visible'));

  const hero = document.querySelector('.education-hero');
  const glow = document.querySelector('.education-glow');
  if (hero && glow && window.matchMedia('(pointer:fine)').matches) {
    hero.addEventListener('pointermove', e => {
      const rect = hero.getBoundingClientRect();
      glow.style.transform = `translate(${e.clientX - rect.left - rect.width * .5}px, ${e.clientY - rect.top - rect.height * .5}px)`;
    });
  }
})();
