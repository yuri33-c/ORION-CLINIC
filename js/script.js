const intro = document.getElementById('intro');
const site = document.getElementById('site');
const header = document.getElementById('header');
const nav = document.getElementById('nav');
const menuToggle = document.getElementById('menuToggle');
const modal = document.getElementById('procedureModal');
const modalMedia = document.getElementById('modalMedia');
const modalImage = document.getElementById('modalImage');
const modalVideo = document.getElementById('modalVideo');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalThumbs = document.getElementById('modalThumbs');
const modalDescription = document.getElementById('modalDescription');
const modalWhatsapp = document.getElementById('modalWhatsapp');
const modalClose = document.getElementById('modalClose');
const modalCounter = document.getElementById('modalCounter');
const WHATSAPP = '5531984200339';

const galleries = {
  rinomodelacao: [
    { type: 'image', src: 'assets/procedimentos/rinomodelacao/01.png' },
    { type: 'image', src: 'assets/procedimentos/rinomodelacao/02.png' }
  ],
  'fios-espiculados-pdo': [
    { type: 'image', src: 'assets/procedimentos/fios-espiculados-pdo/01.png' },
    { type: 'image', src: 'assets/procedimentos/fios-espiculados-pdo/02.png' }
  ],
  'preenchimento-labial': [
    { type: 'image', src: 'assets/procedimentos/preenchimento-labial/01.png' },
    { type: 'image', src: 'assets/procedimentos/preenchimento-labial/02.png' },
    { type: 'image', src: 'assets/procedimentos/preenchimento-labial/03.png' },
    { type: 'image', src: 'assets/procedimentos/preenchimento-labial/04.png' },
    { type: 'image', src: 'assets/procedimentos/preenchimento-labial/05.png' }
  ],
  'estetica-corporal': [
    { type: 'image', src: 'assets/procedimentos/estetica-corporal/capa.jpeg' },
    { type: 'video', src: 'assets/videos/estetica-corporal.mp4', poster: 'assets/procedimentos/estetica-corporal/capa.jpeg' }
  ]
};

const descriptions = {
  Rinomodelação: 'Confira os registros de rinomodelação disponibilizados pela clínica. Para saber mais sobre a indicação e a avaliação, converse com a equipe.',
  'Fios Espiculados PDO': 'Confira os registros de fios espiculados PDO disponibilizados pela clínica. A indicação e a abordagem são avaliadas individualmente.',
  'Preenchimento Labial': 'Confira os registros de preenchimento labial disponibilizados pela clínica e fale com a equipe para conhecer a proposta de atendimento.',
  'Estética Corporal': 'Conheça os registros e o vídeo de estética corporal apresentados pela clínica. Para informações sobre os atendimentos disponíveis, converse com a equipe.'
};

const waUrl = (message) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
let currentGallery = [];
let currentIndex = 0;

function syncWhatsAppLinks() {
  document.querySelectorAll('.whatsapp-link').forEach((link) => {
    const message = link.dataset.message;
    if (message) link.href = waUrl(message);
  });
}

function setActiveThumb() {
  modalThumbs?.querySelectorAll('button').forEach((button, i) => {
    button.classList.toggle('active', i === currentIndex);
  });
}

function stopModalVideo() {
  if (!modalVideo) return;
  modalVideo.pause();
  modalVideo.removeAttribute('src');
  modalVideo.removeAttribute('poster');
  modalVideo.load();
}

function setModalMedia(index) {
  if (!currentGallery.length) return;
  currentIndex = (index + currentGallery.length) % currentGallery.length;
  const item = currentGallery[currentIndex];
  stopModalVideo();
  if (modalImage) modalImage.style.display = item.type === 'image' ? 'block' : 'none';
  if (modalVideo) modalVideo.style.display = item.type === 'video' ? 'block' : 'none';

  if (item.type === 'video') {
    modalVideo.src = item.src;
    if (item.poster) modalVideo.poster = item.poster;
    modalVideo.load();
    modalVideo.play().catch(() => {});
    if (modalMedia) modalMedia.style.setProperty('--media-ratio', '448 / 640');
  } else {
    modalImage.src = item.src;
    modalImage.alt = modalTitle?.textContent || 'Imagem do procedimento';
    if (modalMedia) modalMedia.style.setProperty('--media-ratio', 'auto');
  }

  if (modalCounter) {
    modalCounter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(currentGallery.length).padStart(2, '0')}`;
  }
  setActiveThumb();
}

function buildThumb(item, index, title) {
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-label', `${item.type === 'video' ? 'Ver vídeo' : 'Ver imagem'} ${index + 1} de ${title}`);
  if (item.type === 'video') {
    button.classList.add('video-thumb');
    button.innerHTML = `<video src="${item.src}" muted playsinline preload="metadata" poster="${item.poster || ''}"></video><span>▶</span>`;
  } else {
    button.innerHTML = `<img src="${item.src}" alt="">`;
  }
  button.addEventListener('click', () => setModalMedia(index));
  return button;
}

function openProcedure(card) {
  if (!modal || !card) return;
  const title = card.dataset.title || 'Procedimento';
  const category = card.dataset.category || 'PROCEDIMENTO';
  currentGallery = galleries[card.dataset.gallery] || [];
  if (!currentGallery.length) return;

  modalTitle.textContent = title;
  modalCategory.textContent = category.toUpperCase();
  modalDescription.textContent = descriptions[title] || 'Fale com a equipe para conhecer a proposta de atendimento.';
  modalWhatsapp.href = waUrl(`Olá! Gostaria de saber mais sobre ${title} na Órion Clinic.`);

  if (modalThumbs) {
    modalThumbs.innerHTML = '';
    currentGallery.forEach((item, index) => modalThumbs.appendChild(buildThumb(item, index, title)));
  }

  setModalMedia(0);
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lock');
  modalClose?.focus();
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lock');
  stopModalVideo();
}

syncWhatsAppLinks();

document.querySelectorAll('.procedure-card').forEach((card) => {
  card.addEventListener('click', (event) => {
    if (event.target.closest('.card-link') || !event.target.closest('button')) openProcedure(card);
  });
});

modalClose?.addEventListener('click', closeModal);
modal?.querySelector('.modal-backdrop')?.addEventListener('click', closeModal);

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.10 })
  : null;

document.querySelectorAll('.reveal').forEach((el) => {
  if (revealObserver) revealObserver.observe(el);
  else el.classList.add('visible');
});

const sections = [...document.querySelectorAll('main section[id]')];
const sectionLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
if ('IntersectionObserver' in window && sections.length && sectionLinks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach((section) => sectionObserver.observe(section));
}

function startIntro() {
  if (!intro || !site) return;
  document.body.classList.add('lock');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const delay = reduce ? 900 : 7600;
  window.setTimeout(() => {
    intro.classList.add('hide');
    site.classList.add('ready');
    document.body.classList.remove('lock');
  }, delay);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startIntro, { once: true });
} else {
  startIntro();
}

document.addEventListener('keydown', (event) => {
  if (!modal?.classList.contains('open')) return;
  if (event.key === 'Escape') closeModal();
  if (event.key === 'ArrowRight') setModalMedia(currentIndex + 1);
  if (event.key === 'ArrowLeft') setModalMedia(currentIndex - 1);
});
