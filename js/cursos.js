/**
 * ================================================================
 * ÓRION EDUCAÇÃO — INTERAÇÕES DA PÁGINA DE PROGRAMAS
 * ================================================================
 * Este arquivo controla:
 * 1. O menu mobile.
 * 2. O efeito de virar dos cards.
 * 3. A navegação segura dos botões dos cards.
 * 4. O FAQ.
 * 5. As animações de entrada por IntersectionObserver.
 *
 * IMPORTANTE:
 * Os botões dos cards ficam dentro de elementos 3D transformados.
 * Por isso, a navegação é isolada explicitamente para impedir que
 * o clique do botão também acione o flip do card.
 * ================================================================
 */
(() => {
  'use strict';

  /* --------------------------------------------------------------
     MENU MOBILE
     -------------------------------------------------------------- */
  const menu = document.getElementById('educationMenu');
  const nav = document.getElementById('educationNav');

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
  }

  /* --------------------------------------------------------------
     CARDS 3D + BOTÕES DE NAVEGAÇÃO
     -------------------------------------------------------------- */
  const flipCards = document.querySelectorAll('[data-flip-card]');
  const detailButtons = document.querySelectorAll('.program-detail-btn');

  /**
   * Alterna o estado visual de um card.
   * A classe CSS .is-flipped aplica rotateY(180deg).
   */
  const toggleCard = (card) => {
    const flipped = card.classList.toggle('is-flipped');
    card.dataset.flipped = String(flipped);
    card.setAttribute('aria-pressed', String(flipped));
  };

  flipCards.forEach((card) => {
    /*
     * Garante que o estado inicial seja conhecido pelo CSS/JS.
     * Não usamos role=button aqui, porque existem links reais dentro
     * do card e o navegador deve tratá-los como links normais.
     */
    card.dataset.flipped = 'false';

    /*
     * Clique no card:
     * - Se veio de um link/botão, não vira o card.
     * - Caso contrário, vira normalmente.
     *
     * O composedPath() deixa a checagem mais robusta em navegadores
     * quando o alvo visual está dentro de elementos transformados.
     */
    // Clique normal no card: somente a área do card fora de links e botões vira.
    // Isso evita que o CTA do verso seja interpretado como um clique no card.
    card.addEventListener('click', (event) => {
      const path = typeof event.composedPath === 'function' ? event.composedPath() : [];
      const interactiveFromPath = path.some((node) => {
        return node instanceof Element && node.matches('a, button, input, select, textarea');
      });

      const interactiveFromTarget = event.target instanceof Element
        ? event.target.closest('a, button, input, select, textarea')
        : null;

      if (interactiveFromPath || interactiveFromTarget) {
        return;
      }

      toggleCard(card);
    });

    /*
     * Acessibilidade:
     * Enter ou Espaço no card também pode alternar o flip.
     * O botão interno não depende deste atalho para navegar.
     */
    card.addEventListener('keydown', (event) => {
      const activeElement = document.activeElement;
      const fromInteractiveElement = activeElement instanceof Element
        ? activeElement.closest('a, button, input, select, textarea')
        : null;

      if (fromInteractiveElement) return;

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleCard(card);
      }
    });
  });

  /*
   * NAVEGAÇÃO DEFINITIVA DOS BOTÕES
   *
   * O problema original era o evento do card 3D disputar o clique
   * com o botão do verso. Aqui o botão recebe prioridade explícita:
   * - pointerdown: impede o evento de continuar para o card;
   * - click: impede o flip e navega diretamente para o href real.
   *
   * Assim o botão sempre abre a página correspondente.
   */
  detailButtons.forEach((button) => {
    button.addEventListener('pointerdown', (event) => {
      event.stopPropagation();
    });

    button.addEventListener('mousedown', (event) => {
      event.stopPropagation();
    });

    button.addEventListener('touchstart', (event) => {
      event.stopPropagation();
    }, { passive: true });

    button.addEventListener('click', (event) => {
      /* Não deixa o clique chegar ao artigo/card. */
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      /* Usa o href verdadeiro do HTML, sem depender de dados paralelos. */
      const destination = button.getAttribute('href');
      if (!destination) return;

      /* Navegação na mesma aba, exatamente como um link tradicional. */
      window.location.assign(destination);
    });
  });

  /* --------------------------------------------------------------
     FAQ
     -------------------------------------------------------------- */
  document.querySelectorAll('.faq-item').forEach((item) => {
    item.addEventListener('click', () => {
      const open = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach((el) => {
        el.classList.remove('open');
      });

      if (!open) item.classList.add('open');
    });
  });

  /* --------------------------------------------------------------
     ANIMAÇÕES DE ENTRADA
     -------------------------------------------------------------- */
  const reveal = document.querySelectorAll('.reveal-edu');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -4% 0px'
    });

    reveal.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min(index * 35, 220)}ms`;
      io.observe(element);
    });
  } else {
    /* Fallback para navegadores sem IntersectionObserver. */
    reveal.forEach((element) => element.classList.add('visible'));
  }
})();
