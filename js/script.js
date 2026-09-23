const intro = document.getElementById('intro');
const site = document.getElementById('site');
const header = document.getElementById('header');
const nav = document.getElementById('nav');
const menuToggle = document.getElementById('menuToggle');
const modal = document.getElementById('procedureModal');
const modalImage = document.getElementById('modalImage');
const modalVideo = document.getElementById('modalVideo');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalThumbs = document.getElementById('modalThumbs');
const modalDescription = document.getElementById('modalDescription');
const modalWhatsapp = document.getElementById('modalWhatsapp');
const modalClose = document.getElementById('modalClose');
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
  ]
};

const descriptions = {
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
