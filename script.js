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
        ${ev.images.map(src => `<img src="${src}" alt="" loading="lazy">`).join('')}
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
      <img src="${src}" alt="Recuerdo ${i+1}" loading="lazy"
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

const triviaFeedbackMsgs = {
  correct: ["¡Exacto! 💕", "¡Lo sabías! 🌙", "¡Perfecto! ✨", "¡Así es! 💫"],
  wrong:   ["Era la otra... 😅", "¡Casi! 🌸", "Jajaja, tenemos que repasar 💕", "Mmm, no exactamente 😄"]
};

const triviaFinalMsgs = [
  { min: 7, msg: "¡Lo sabías todo! Sos lo mejor de mi vida 💕" },
  { min: 4, msg: "Casi perfecto, igual te amo muchísimo 🌙" },
  { min: 0, msg: "Jajaja, tenemos que repasar juntos... 💫" }
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
  triviaNext.style.display = "none";

  const dots = trivia.map((_, i) =>
    `<span class="trivia-dot ${i < triviaIndex ? 'done' : i === triviaIndex ? 'active' : ''}"></span>`
  ).join("");

  triviaBox.innerHTML = `
    <div class="trivia-progress">
      <div class="trivia-dots">${dots}</div>
      <div class="trivia-counter">Pregunta ${triviaIndex + 1} de ${trivia.length}</div>
    </div>
    <div class="trivia-q trivia-slide-in">${item.q}</div>
    <div class="trivia-opts">
      ${item.options.map((opt, i) => `<button class="trivia-opt" data-i="${i}">${opt}</button>`).join("")}
    </div>
    <div class="trivia-feedback"></div>
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
  const feedbackEl = triviaBox.querySelector(".trivia-feedback");

  buttons[item.a].classList.add("correct");
  if (choice !== item.a) btn.classList.add("wrong");

  if (choice === item.a) {
    triviaScore++;
    const msgs = triviaFeedbackMsgs.correct;
    feedbackEl.textContent = msgs[Math.floor(Math.random() * msgs.length)];
    feedbackEl.className = "trivia-feedback correct";
  } else {
    const msgs = triviaFeedbackMsgs.wrong;
    feedbackEl.textContent = msgs[Math.floor(Math.random() * msgs.length)];
    feedbackEl.className = "trivia-feedback wrong";
  }

  triviaScoreEl.textContent = `Puntaje: ${triviaScore}/${trivia.length}`;
  triviaNext.style.display = "";
});

triviaNext.addEventListener("click", () => {
  if (triviaIndex < trivia.length - 1) {
    triviaIndex++;
    triviaBox.classList.add("trivia-exit");
    setTimeout(() => {
      triviaBox.classList.remove("trivia-exit");
      renderTrivia();
    }, 250);
  } else {
    const finalMsg = triviaFinalMsgs.find(f => triviaScore >= f.min);
    triviaBox.innerHTML = `
      <div class="trivia-final">
        <div class="trivia-final-score">${triviaScore}/${trivia.length}</div>
        <div class="trivia-final-msg">${finalMsg.msg}</div>
      </div>
    `;
    triviaNext.style.display = "none";
    triviaScoreEl.textContent = "";
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
// ── NOW PLAYING ──────────────────────────────────────────────
const npChip   = document.getElementById('now-playing');
const npTitle  = document.getElementById('np-title');
const npArtist = document.getElementById('np-artist');

function setNowPlaying(title, artist) {
  npTitle.textContent  = title;
  npArtist.textContent = artist;
  npChip.classList.add('visible');
  npChip.classList.remove('paused');
}

function pauseNowPlaying() { npChip.classList.add('paused'); }
function resumeNowPlaying() { npChip.classList.remove('paused'); }
function hideNowPlaying() { npChip.classList.remove('visible'); }

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
      // si hay src de config (música de fondo), mostrar nombre del archivo
      if (bgm.src && !npChip.classList.contains('visible')) {
        const name = bgm.src.split('/').pop().replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
        setNowPlaying(name, 'música de fondo');
      } else {
        resumeNowPlaying();
      }
    } else {
      bgm.pause();
      btn.textContent = '♫';
      btn.classList.remove('playing');
      pauseNowPlaying();
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
  { title: "Tus ojos",         artist: "Los Cafres",              time: "4:15", cover: "assets/fotoCanciones/tusojos.webp",        src: "" },
  { title: "Signos",           artist: "Soda Stereo",             time: "5:17", cover: "assets/fotoCanciones/signos.webp",         src: "" },
  { title: "Beautiful",        artist: "Gustavo Cerati",          time: "6:14", cover: "assets/fotoCanciones/Beautiful.jpg",       src: "assets/GustavoCerati-Song1.mp3" },
  { title: "Fashion Killa",    artist: "A$AP Rocky",              time: "4:46", cover: "assets/fotoCanciones/fashionkilla.jfif",   src: "" },
  { title: "Thinkin Bout You", artist: "Frank Ocean",             time: "3:21", cover: "assets/fotoCanciones/thinkinboutyou.png", src: "" },
  { title: "prove it",         artist: "21 Savage & Summer Walker", time: "3:28", cover: "assets/fotoCanciones/proveit.jpg",      src: "" },
  { title: "Fui a Jamaica",    artist: "Romeo Santos",            time: "3:56", cover: "assets/fotoCanciones/fuiajamaica.webp",   src: "" },
  { title: "Fashion Killa",    artist: "A$AP Rocky",              time: "4:46", cover: "assets/fotoCanciones/fashionkilla.jfif",  src: "" }
];

const plCarousel = document.getElementById("pl-carousel");
if (plCarousel) {
  plCarousel.innerHTML = fakePlaylist.map((item, i) => `
    <div class="pl-card ${item.src ? '' : 'pl-no-src'}" data-index="${i}">
      <div class="pl-cover">
        <img src="${item.cover}" alt="${item.title}" loading="lazy" onerror="this.style.opacity='0'">
        <div class="pl-play-overlay">
          <span class="pl-play-icon">${item.src ? '▶' : '✕'}</span>
        </div>
      </div>
      <div class="pl-title">${item.title}</div>
      <div class="pl-artist">${item.artist}</div>
    </div>
  `).join("");

  // ── Reproducción al click ────────────────────────────────
  const bgm = document.getElementById('bgm');
  const musicBtn = document.getElementById('music-btn');
  let currentPlIndex = null;

  plCarousel.addEventListener('click', e => {
    const card = e.target.closest('.pl-card');
    if (!card || card.classList.contains('pl-no-src')) return;

    const idx = Number(card.dataset.index);
    const item = fakePlaylist[idx];

    // Si se clickea la que ya suena, pausar/reanudar
    if (idx === currentPlIndex) {
      if (bgm.paused) {
        bgm.play().catch(() => {});
        card.classList.add('pl-playing');
        card.querySelector('.pl-play-icon').textContent = '❚❚';
        resumeNowPlaying();
      } else {
        bgm.pause();
        card.classList.remove('pl-playing');
        card.querySelector('.pl-play-icon').textContent = '▶';
        pauseNowPlaying();
      }
      return;
    }

    // Quitar estado anterior
    if (currentPlIndex !== null) {
      const prev = plCarousel.querySelector(`[data-index="${currentPlIndex}"]`);
      if (prev) {
        prev.classList.remove('pl-playing');
        prev.querySelector('.pl-play-icon').textContent = '▶';
      }
    }

    // Cargar y reproducir nueva canción
    bgm.src = item.src;
    bgm.volume = 0.5;
    bgm.play().catch(() => {});
    currentPlIndex = idx;
    card.classList.add('pl-playing');
    card.querySelector('.pl-play-icon').textContent = '❚❚';
    setNowPlaying(item.title, item.artist);

    // Sincronizar botón de música global
    musicBtn.textContent = '♬';
    musicBtn.classList.add('playing');
  });

  // Cuando el audio termina, resetear el estado visual
  bgm.addEventListener('ended', () => {
    if (currentPlIndex !== null) {
      const card = plCarousel.querySelector(`[data-index="${currentPlIndex}"]`);
      if (card) {
        card.classList.remove('pl-playing');
        card.querySelector('.pl-play-icon').textContent = '▶';
      }
      currentPlIndex = null;
      hideNowPlaying();
    }
  });
}


// ── PLAYLIST NAV ────────────────────────────────────────────
const plPrev = document.querySelector('.pl-nav-prev');
const plNext = document.querySelector('.pl-nav-next');
if (plPrev && plNext && plCarousel) {
  const step = 200;
  plPrev.addEventListener('click', () => plCarousel.scrollBy({ left: -step, behavior: 'smooth' }));
  plNext.addEventListener('click', () => plCarousel.scrollBy({ left:  step, behavior: 'smooth' }));
}

// ── ARRANQUE ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initContent();
  initObserver(); 
  initLightbox();
});
