const intro = document.getElementById('intro');
const site = document.getElementById('site');
const header = document.getElementById('header');
const nav = document.getElementById('nav');
const menuToggle = document.getElementById('menuToggle');
const modal = document.getElementById('procedureModal');
<<<<<<< HEAD
=======
const modalMedia = document.getElementById('modalMedia');
>>>>>>> 5352d06fbb4ad7b5185f3afa4a9c3bafbe41a24e
const modalImage = document.getElementById('modalImage');
const modalVideo = document.getElementById('modalVideo');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalThumbs = document.getElementById('modalThumbs');
const modalDescription = document.getElementById('modalDescription');
const modalWhatsapp = document.getElementById('modalWhatsapp');
const modalClose = document.getElementById('modalClose');
<<<<<<< HEAD
const courseModal = document.getElementById('courseModal');
const courseClose = document.getElementById('courseClose');
const courseOpen = document.querySelector('.course-open');

const WHATSAPP = '5531984200339';

const galleries = {
  'rinomodelacao': [
    'assets/procedimentos/rinomodelacao/01.png',
    'assets/procedimentos/rinomodelacao/02.png'
  ],
  'fios-espiculados-pdo': [
    'assets/procedimentos/fios-espiculados-pdo/01.png',
    'assets/procedimentos/fios-espiculados-pdo/02.png'
  ],
  'preenchimento-labial': [
    'assets/procedimentos/preenchimento-labial/01.png',
    'assets/procedimentos/preenchimento-labial/02.png',
    'assets/procedimentos/preenchimento-labial/03.png',
    'assets/procedimentos/preenchimento-labial/04.png',
    'assets/procedimentos/preenchimento-labial/05.png'
  ],
  'estetica-corporal': [
    { type: 'image', src: 'assets/procedimentos/estetica-corporal/capa.jpeg' },
    { type: 'image', src: 'assets/procedimentos/estetica-corporal/resultado-02.png' },
    { type: 'image', src: 'assets/procedimentos/estetica-corporal/resultado-03.png' },
    { type: 'video', src: 'assets/resultados/resultado-clinica.mp4' }
=======
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
>>>>>>> 5352d06fbb4ad7b5185f3afa4a9c3bafbe41a24e
  ]
};

const descriptions = {
<<<<<<< HEAD
  'Rinomodelação': 'Confira os registros de rinomodelação disponibilizados pela clínica. Para saber se este procedimento é indicado para você, converse com a equipe e agende uma avaliação.',
  'Fios Espiculados PDO': 'Confira os registros de fios espiculados PDO disponibilizados pela clínica. A indicação e a abordagem são avaliadas individualmente durante a consulta.',
  'Preenchimento Labial': 'Confira os registros de preenchimento labial disponibilizados pela clínica e fale com a equipe para conhecer a proposta de atendimento para o seu caso.',
  'Estética Corporal': 'Conheça a área de estética corporal da Órion Clinic e converse com a equipe para saber quais tratamentos estão disponíveis.'
};

function waUrl(message) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll('.whatsapp-link').forEach(link => {
  const message = link.dataset.message;
  if (message) link.href = waUrl(message);
});

function normalizeGalleryItem(item) {
  return typeof item === 'string' ? { type: 'image', src: item } : item;
}

function showModalMedia(item) {
  const media = normalizeGalleryItem(item);

  if (media.type === 'video') {
    modalImage.style.display = 'none';
    modalImage.removeAttribute('src');
    modalVideo.style.display = 'block';
    modalVideo.src = media.src;
    modalVideo.load();
    modalVideo.setAttribute('aria-label', 'Vídeo de Estética Corporal');
    return;
  }

  modalVideo.pause();
  modalVideo.removeAttribute('src');
  modalVideo.load();
  modalVideo.style.display = 'none';

  modalImage.style.display = 'block';
  modalImage.src = media.src;
  modalImage.alt = modalTitle.textContent;
}

function openProcedure(card) {
  const title = card.dataset.title;
  const category = card.dataset.category || 'PROCEDIMENTO';
  const rawGallery = galleries[card.dataset.gallery] || [];
  const gallery = rawGallery.map(normalizeGalleryItem);

  modalTitle.textContent = title;
  modalCategory.textContent = category.toUpperCase();
  modalDescription.textContent = descriptions[title] || 'Conheça esta área de atendimento da Órion Clinic e converse com a equipe para entender a proposta de atendimento.';
  modalThumbs.innerHTML = '';

  if (gallery.length) {
    showModalMedia(gallery[0]);

    gallery.forEach((media, index) => {
      const button = document.createElement('button');
      button.className = `modal-thumb${index === 0 ? ' active' : ''}${media.type === 'video' ? ' modal-thumb-video' : ''}`;
      button.type = 'button';
      button.setAttribute('aria-label', media.type === 'video'
        ? `Reproduzir vídeo de ${title}`
        : `Ver imagem ${index + 1} de ${title}`);

      if (media.type === 'video') {
        button.innerHTML = '<span class="thumb-play">▶</span><small>VÍDEO</small>';
      } else {
        const img = document.createElement('img');
        img.src = media.src;
        img.alt = '';
        button.appendChild(img);
      }

      button.addEventListener('click', () => {
        showModalMedia(media);
        document.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
        button.classList.add('active');
      });

      modalThumbs.appendChild(button);
    });
  } else {
    modalVideo.pause();
    modalVideo.style.display = 'none';
    modalImage.style.display = 'block';
    modalImage.removeAttribute('src');
  }

  modalWhatsapp.href = waUrl(`Olá! Gostaria de agendar uma avaliação sobre ${title} na Órion Clinic.`);
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lock');
}
function openCourseModal() {
  courseModal.classList.add('open');
  courseModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lock');
}

function closeProcedure() {
  modalVideo.pause();
  modalVideo.removeAttribute('src');
  modalVideo.load();
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  if (!courseModal.classList.contains('open')) document.body.classList.remove('lock');
}

function closeCourse() {
  courseModal.classList.remove('open');
  courseModal.setAttribute('aria-hidden', 'true');
  if (!modal.classList.contains('open')) document.body.classList.remove('lock');
}

window.addEventListener('load', () => {
  document.body.classList.add('lock');
  setTimeout(() => {
    intro.classList.add('hide');
    site.classList.add('ready');
    document.body.classList.remove('lock');
  }, 4800);
});

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40));

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.procedure-card').forEach(card => {
  card.addEventListener('click', () => openProcedure(card));
});

modalClose.addEventListener('click', closeProcedure);
modal.querySelector('.modal-backdrop').addEventListener('click', closeProcedure);

courseOpen.addEventListener('click', openCourseModal);
courseClose.addEventListener('click', closeCourse);
courseModal.querySelector('.course-backdrop').addEventListener('click', closeCourse);

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (modal.classList.contains('open')) closeProcedure();
  if (courseModal.classList.contains('open')) closeCourse();
});

const sections = [...document.querySelectorAll('main section[id]')];
const links = [...nav.querySelectorAll('a')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => observer.observe(section));
=======
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
>>>>>>> 5352d06fbb4ad7b5185f3afa4a9c3bafbe41a24e
