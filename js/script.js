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

const expertiseModal = document.getElementById('expertiseModal');
const expertiseClose = document.getElementById('expertiseClose');
const expertiseCategory = document.getElementById('expertiseCategory');
const expertiseIndex = document.getElementById('expertiseIndex');
const expertiseTitle = document.getElementById('expertiseTitle');
const expertiseLead = document.getElementById('expertiseLead');
const expertiseContent = document.getElementById('expertiseContent');
const expertiseSource = document.getElementById('expertiseSource');
const expertiseWhatsapp = document.getElementById('expertiseWhatsapp');

const expertiseData = {
  hof: {
    index: '01',
    category: 'HOF · HARMONIZAÇÃO OROFACIAL',
    title: 'Harmonização Orofacial',
    lead: 'HOF é a sigla para Harmonização Orofacial: uma abordagem que considera a face como um conjunto, relacionando proporções, contornos, tecidos, expressão e, quando aplicável, aspectos funcionais. No trabalho público do Dr. Jeean, a área aparece associada à estética avançada, atualização científica e educação profissional.',
    cards: [
      ['O que significa HOF', 'Equilíbrio facial', 'A proposta é olhar o rosto de forma integrada, evitando tratar uma característica isoladamente quando a avaliação pede uma visão mais ampla.'],
      ['Planejamento', 'Análise individual', 'A indicação de qualquer procedimento depende de avaliação profissional, histórico, anatomia, objetivos e limites de cada caso.'],
      ['Temas clínicos', 'Estrutura e regeneração', 'Entre os conteúdos públicos associados ao Dr. Jeean estão sustentação facial, preenchedores, bioestimuladores, fios faciais e estratégias de regeneração tecidual.'],
      ['Atuação pública', 'Ciência e educação', 'Programações de congressos registram o Dr. Jeean em temas como Evolution Derme, Skin Regeneration Concept e bases anatômicas de sustentação com preenchedores e bioestimuladores.'],
      ['Face', 'Contorno e proporção', 'A HOF pode envolver diferentes regiões e ferramentas, sempre respeitando indicação, habilitação profissional, segurança e planejamento clínico.'],
      ['Importante', 'Avaliação antes de tratar', 'O conteúdo do site é informativo. A equipe deve confirmar a indicação, técnica e possibilidade de realização para cada pessoa durante o atendimento.']
    ],
    source: 'Referências públicas: Sociedade Brasileira de Toxina Botulínica e Implantes Faciais; Conselho Regional de Odontologia; programas de congressos com participação do Dr. Jeean Bernardes.',
    whatsapp: 'Olá! Gostaria de entender melhor a atuação do Dr. Jeean Bernardes em HOF e saber como funciona a avaliação.'
  },
  trend: {
    index: '02',
    category: 'HOF TREND XPERIENCE',
    title: 'HOF TREND XPERIENCE',
    lead: 'Um congresso dedicado à ciência, inovação e evolução da harmonização facial e corporal. A edição de 2026 foi apresentada como uma experiência que conecta conteúdo avançado, prática clínica, tecnologia, networking e atualização profissional.',
    cards: [
      ['Conceito', 'Ciência + prática', 'O evento reúne conteúdo científico, tendências e aplicação clínica em uma experiência voltada a profissionais da estética.'],
      ['Prática', 'Hands on', 'A programação divulgada incluiu práticas ao vivo, permitindo uma experiência mais próxima da rotina clínica.'],
      ['Anatomia', 'Cadáver lab', 'A divulgação do evento informou transmissão ao vivo de cadáver lab, com planos anatômicos e pontos de risco relacionados a procedimentos estéticos.'],
      ['Mercado', 'Marcas e tecnologia', 'O congresso também contou com espaço para stands de empresas, produtos, tecnologias e soluções do setor.'],
      ['Conexões', 'Networking', 'Além das palestras, a proposta inclui contato entre profissionais, professores, marcas e participantes.'],
      ['Jeean Bernardes', 'Direção científica', 'Fonte pública da Biodermis identifica Jeean Bernardes como diretor científico do Congresso HOF TREND XPERIENCE.']
    ],
    source: 'Referências públicas: Sympla — Congresso HOF TREND XPERIENCE; Biodermis — Estética In. A edição de 2026 ocorreu em Parauapebas e o evento foi produzido pelo Instituto Dr Jeean Bernardes.',
    whatsapp: 'Olá! Gostaria de receber mais informações sobre o HOF TREND XPERIENCE e sobre os projetos de educação do Dr. Jeean Bernardes.'
  }
};

function openExpertise(type) {
  const data = expertiseData[type];
  if (!data || !expertiseModal) return;
  expertiseIndex.textContent = data.index;
  expertiseCategory.textContent = data.category;
  expertiseTitle.textContent = data.title;
  expertiseLead.textContent = data.lead;
  expertiseContent.innerHTML = data.cards.map(card => `
    <article class="expertise-content-card">
      <small>${card[0]}</small>
      <h3>${card[1]}</h3>
      <p>${card[2]}</p>
    </article>
  `).join('');
  expertiseSource.innerHTML = data.source;
  expertiseWhatsapp.href = waUrl(data.whatsapp);
  expertiseModal.classList.add('open');
  expertiseModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lock');
}

function closeExpertise() {
  if (!expertiseModal) return;
  expertiseModal.classList.remove('open');
  expertiseModal.setAttribute('aria-hidden', 'true');
  if (!modal?.classList.contains('open') && !courseModal?.classList.contains('open')) document.body.classList.remove('lock');
}

document.querySelectorAll('.expertise-card').forEach(card => {
  card.addEventListener('click', () => openExpertise(card.dataset.expertise));
});

if (expertiseClose) expertiseClose.addEventListener('click', closeExpertise);
if (expertiseModal) expertiseModal.querySelector('.expertise-backdrop')?.addEventListener('click', closeExpertise);


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
        button.innerHTML = '<small>VÍDEO</small>';
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

function finishIntro() {
  if (!intro) return;
  intro.classList.add('hide');
  if (site) site.classList.add('ready');
  document.body.classList.remove('lock');
}

// A intro é apenas uma abertura visual: o site nunca depende dela para funcionar.
document.body.classList.add('lock');
setTimeout(finishIntro, 4800);

document.body.classList.add('motion-ready');
const revealTargets = document.querySelectorAll('.section-head, .procedure-card, .specialist-heading, .specialist-info h2, .specialist-copy, .specialist-feature-grid, .credentials-modern, .course-feature, .education-strip, .gallery figure, .location-copy, .map-card');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
revealTargets.forEach(target => revealObserver.observe(target));

window.addEventListener('load', () => {
  // Mantém o tempo de leitura da marca, mas garante que o conteúdo apareça.
  setTimeout(finishIntro, 300);
});

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40));

if (menuToggle && nav) menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

if (nav) nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.procedure-card').forEach(card => {
  card.addEventListener('click', () => openProcedure(card));
});

if (modalClose) modalClose.addEventListener('click', closeProcedure);
if (modal) modal.querySelector('.modal-backdrop')?.addEventListener('click', closeProcedure);

if (courseOpen) courseOpen.addEventListener('click', openCourseModal);
if (courseClose) courseClose.addEventListener('click', closeCourse);
if (courseModal) courseModal.querySelector('.course-backdrop')?.addEventListener('click', closeCourse);

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (expertiseModal?.classList.contains('open')) closeExpertise();
  if (modal.classList.contains('open')) closeProcedure();
  if (courseModal.classList.contains('open')) closeCourse();
});

const sections = [...document.querySelectorAll('main section[id]')];
const links = nav ? [...nav.querySelectorAll('a')] : [];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => observer.observe(section));
