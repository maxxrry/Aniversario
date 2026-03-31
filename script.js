// ============================================================
//  script.js  —  lógica principal  (no editar)
// ============================================================

// ── ESTRELLAS ────────────────────────────────────────────────
(function initStars() {
  const c   = document.getElementById('stars');
  const ctx = c.getContext('2d');
  let W, H, stars = [];

  function resize() {
    W = c.width  = window.innerWidth;
    H = c.height = window.innerHeight;
    stars = Array.from({ length: 200 }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  Math.random() * 1.3 + 0.2,
      a:  Math.random(),
      da: (0.2 + Math.random() * 0.3) * (Math.random() > 0.5 ? 1 : -1) * 0.005
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      s.a += s.da;
      if (s.a <= 0.05 || s.a >= 1) s.da *= -1;
      s.a = Math.max(0.05, Math.min(1, s.a));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,245,235,${s.a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
})();

// ── CONTADOR DE TIEMPO ────────────────────────────────────────
function updateCounter() {
  const [y, m, d] = config.hero.startDate.split('-').map(Number);
  const start = new Date(y, m - 1, d);
  const now   = new Date();
  const diff  = now - start;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hrs  = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('counter').textContent =
    `${days} días · ${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
}
setInterval(updateCounter, 1000);
updateCounter();

// ── INICIALIZAR CONTENIDO DESDE CONFIG ───────────────────────
function initContent() {
  // Título
  document.title = config.pageTitle;

  // Loader
  document.getElementById('ldr-msg').textContent    = config.loading.message;
  document.getElementById('ldr-hint').textContent   = config.loading.hint;
  document.getElementById('ldr-btn').textContent    = config.loading.buttonText;

  // Hero
  document.getElementById('hero-eyebrow').textContent = config.hero.eyebrow;
  document.getElementById('hero-title').innerHTML      = config.hero.title;
  document.getElementById('hero-sub').textContent      = config.hero.sub;
  document.getElementById('scroll-text').textContent   = config.hero.scrollText;

  // Timeline heading
  document.getElementById('tl-heading').textContent = config.timelineTitle;

  // Timeline items
  const wrap = document.getElementById('tl-wrap');
  config.timeline.forEach(ev => {
    let imgsHtml = '';
    if (ev.images && ev.images.length) {
      imgsHtml = `<div class="tl-images">
        ${ev.images.map(src => `<img src="${src}" alt="">`).join('')}
      </div>`;
    }

    const item = document.createElement('div');
    item.className = 'tl-item';
    item.innerHTML = `
      <div class="tl-stem">
        <div class="tl-dot"></div>
        <div class="tl-line"></div>
      </div>
      <div class="tl-body">
        <div class="tl-card" onclick="this.classList.toggle('open')">
          <div class="tl-header">
            <div class="tl-title">${ev.title}</div>
            <span class="tl-toggle">▾</span>
          </div>
          <div class="tl-content">
            ${ev.content}
            ${imgsHtml}
          </div>
        </div>
        ${ev.footer ? `<div class="tl-footer">${ev.footer}</div>` : ''}
      </div>`;
    wrap.appendChild(item);
  });

  // Gallery heading
  document.getElementById('gallery-heading').textContent = config.galleryTitle;

  // Gallery items
  const emojis = ['🌸','🌙','✨','💫','🌿','🦋','🌺','💎','🌊','🕊️','🍃','⭐'];
  const gg = document.getElementById('gallery-grid');
  config.gallery.forEach((src, i) => {
    const ph = document.createElement('div');
    ph.className = 'g-photo';
    // Try image; fallback to emoji placeholder
    ph.innerHTML = `
      <div class="g-tape"></div>
      <img src="${src}" alt="Recuerdo ${i+1}"
           onerror="this.style.display='none';this.nextSibling.style.display='flex'">
      <div class="ph" style="display:none">${emojis[i % emojis.length]}</div>
      <div class="g-photo-num">${String(i + 1).padStart(2, '0')}</div>`;
    gg.appendChild(ph);
  });



// ── TRIVIA ──────────────────────────────────────────────────
const trivia = [
  { q: "Donde fue nuestra primera cita?", type: "mc", options: ["En el centro", "En el parque", "En el cine"], a: 1 },
  { q: "Quien dijo te amo primero?", type: "mc", options: ["Yo", "Tu", "Los dos al mismo tiempo"], a: 0 },
  { q: "Nombre de nuestra hija?", type: "mc", options: ["clotilde", "pelusa", "Cloy"], a: 2 },
  { q: "Es verdad que me enamore de tu sonrisa?", type: "tf", options: ["Verdadero", "Falso"], a: 0 },
  { q: "Cuantos aniversarios hemos celebrado?", type: "mc", options: ["1", "2", "3"], a: 2 },
  { q: "Nuestra cancion especial es?", type: "mc", options: ["(cancion 1)", "(cancion 2)", "(cancion 3)"], a: 0 },
  { q: "Aun me haces mariposas?", type: "tf", options: ["Verdadero", "Falso"], a: 0 }
];
  
let triviaIndex = 0;
let triviaScore = 0;
let locked = false;

const triviaBox = document.getElementById("trivia-box");
const triviaNext = document.getElementById("trivia-next");
const triviaScoreEl = document.getElementById("trivia-score");

function renderTrivia() {
  const item = trivia[triviaIndex];
  locked = false;
  triviaBox.innerHTML = `
    <div class="trivia-q">${item.q}</div>
    <div class="trivia-opts">
      ${item.options.map((opt, i) => `<button class="trivia-opt" data-i="${i}">${opt}</button>`).join("")}
    </div>
  `;
  triviaScoreEl.textContent = `Puntaje: ${triviaScore}/${trivia.length}`;
}

triviaBox.addEventListener("click", (e) => {
  const btn = e.target.closest(".trivia-opt");
  if (!btn || locked) return;
  locked = true;

  const item = trivia[triviaIndex];
  const choice = Number(btn.dataset.i);
  const buttons = [...triviaBox.querySelectorAll(".trivia-opt")];

  buttons[item.a].classList.add("correct");
  if (choice !== item.a) btn.classList.add("wrong");
  if (choice === item.a) triviaScore++;
  triviaScoreEl.textContent = `Puntaje: ${triviaScore}/${trivia.length}`;
});

triviaNext.addEventListener("click", () => {
  if (triviaIndex < trivia.length - 1) {
    triviaIndex++;
    renderTrivia();
  } else {
    triviaBox.innerHTML = `<div class="trivia-q">Final! Tu puntaje fue ${triviaScore}/${trivia.length}.</div>`;
    triviaNext.style.display = "none";
  }
});

renderTrivia();

// Optional: fake play toggle
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".pl-play");
  if (!btn) return;
  btn.textContent = btn.textContent === "Play" ? "Pause" : "Play";
});



  // Final section
  document.getElementById('final-heart').textContent   = config.final.heart;
  document.getElementById('final-msg').innerHTML       = config.final.message;
  document.getElementById('final-sign').textContent    = config.final.sign;

  // Music
  const bgm = document.getElementById('bgm');
  if (config.music.path) {
    bgm.src    = config.music.path;
    bgm.volume = config.music.volume || 0.35;
  }
}

// ── LOADER ────────────────────────────────────────────────────
document.getElementById('ldr-btn').addEventListener('click', () => {
  document.getElementById('loader').classList.add('out');
  document.getElementById('music-btn').classList.add('visible');
});

// ── MÚSICA ───────────────────────────────────────────────────
(function initMusic() {
  const btn = document.getElementById('music-btn');
  const bgm = document.getElementById('bgm');
  let playing = false;

  btn.addEventListener('click', () => {
    if (!playing) {
      bgm.play().catch(() => {});
      btn.textContent = '♬';
      btn.classList.add('playing');
    } else {
      bgm.pause();
      btn.textContent = '♫';
      btn.classList.remove('playing');
    }
    playing = !playing;
  });
})();

// ── SCROLL OBSERVER ───────────────────────────────────────────
function initObserver() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.15 });

  document.querySelectorAll('.tl-item').forEach(el => obs.observe(el));
}

// ── LIGHTBOX ────────────────────────────────────────────────
function initLightbox() {
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.innerHTML = `
    <button class="lightbox-close" id="lightbox-close" aria-label="Cerrar imagen">×</button>
    <img id="lightbox-image" alt="Imagen ampliada">
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = document.getElementById('lightbox-image');

  function openLightbox(src, alt) {
    lightboxImage.src = src;
    lightboxImage.alt = alt || 'Imagen ampliada';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lightboxImage.src = '';
  }

  document.addEventListener('click', e => {
    const img = e.target.closest('#gallery-grid img, .tl-images img');
    if (!img || img.style.display === 'none') return;
    openLightbox(img.src, img.alt);
  });

  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
}

// ── PLAYLIST CAROUSEL ───────────────────────────────────────
const fakePlaylist = [
  { title: "Tu cancion especial", artist: "Nosotros", time: "3:21" },
  { title: "Recuerdo del primer dia", artist: "Tu y Yo", time: "2:58" },
  { title: "Solo contigo", artist: "Siempre", time: "3:44" },
  { title: "Mirada bonita", artist: "Amor", time: "4:02" },

];

const plCarousel = document.getElementById("pl-carousel");
if (plCarousel) {
  plCarousel.innerHTML = fakePlaylist.map(item => `
    <div class="pl-card">
      <div class="pl-cover">✦</div>
      <div class="pl-title">${item.title}</div>
      <div class="pl-artist">${item.artist}</div>
      <div class="pl-row">
        <button class="pl-play">Play</button>
        <div class="pl-time">${item.time}</div>
      </div>
    </div>
  `).join("");
}


// ── ARRANQUE ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initContent();
  initObserver(); 
  initLightbox();
});
