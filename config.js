const config = {

  // ── TÍTULO DE LA PESTAÑA ──────────────────────────────────
  pageTitle: "Nuestro Aniversario ✦",

  // ── MÚSICA ───────────────────────────────────────────────
  // Deja path vacío si no tienes música todavía.
  // Formatos: .mp3  .ogg  .wav
  music: {
    path: "assets/GustavoCerati-Song1.mp3",          // ej: "assets/nuestra-cancion.mp3"
    volume: 0.50
  },

  // ── PANTALLA DE CARGA ─────────────────────────────────────
  loading: {
    message:    "Con mucho amor y cariño para el amor de mi vida ...",
    hint:       "toca para comenzar",
    buttonText: "Comenzar ✦"
  },

  // ── HERO (PORTADA) ────────────────────────────────────────
  hero: {
    eyebrow:   "nuestra historia",
    // Puedes usar <em>texto</em> para cursiva rosa
    title:     "Desde que<br><em>llegaste a mi vida</em>",
    sub:       "y cada día te amo más",
    scrollText:"Descubre nuestra historia",

    // ⚠️ FECHA DE INICIO  formato: "AAAA-MM-DD"
    startDate: "2022-05-09"
  },

  // ── LÍNEA DE TIEMPO ───────────────────────────────────────
  timelineTitle: "Nuestra historia",
  timeline: [
    {
      title:   "✦ La primera vez que te vi 👀",
      content: "Aun recuerdo con bastante claridad la primera vez que te mire , fue creo que de los primeros dias de clases en segundo , recuerdo que estaban pasando la lista y dijieron angela fuentealba y dijiste presente y yo quede como 'quien es esa' y luego te mire y quede flechado , recuerdo que tenias el cabello suelto y una sonrisa tan hermosa que me fije en ti al instante.",
      // images: ["assets/foto1.jpg", "assets/foto2.jpg"],   // opcional
      footer:  "Ese día lo cambió todo"
    },
    {
      title:   "✦ La primera conversación",
      content: "Describe ese primer mensaje o llamada que cambió todo...",
      footer:  "Desde ese instante, no dejamos de hablar"
    },
    {
      title:   "✦ La primera cita",
      content: "Cuenta los detalles de su primera cita...<br>¿Dónde fueron? ¿Qué hicieron?",
      footer:  "Nervios, risas y mariposas"
    },
    {
      title:   "✦ Oficialmente juntos",
      content: "El día en que decidieron formalizar su relación...",
      footer:  "Y desde entonces, cada día es una nueva aventura"
    }
    // Copia y pega este bloque para agregar más eventos:
    // {
    //   title:   "✦ Nuevo recuerdo",
    //   content: "Descripción...",
    //   images:  ["assets/foto.jpg"],
    //   footer:  "Comentario"
    // },
  ],

  // ── GALERÍA ───────────────────────────────────────────────
  galleryTitle: "Nuestros momentos",
  // Agrega tus fotos aquí.  Si la ruta no existe se muestra un ícono.
  gallery: [
    "assets/Fotitos/foto1.jpg",
    "assets/Fotitos/foto2.jpg",
    "assets/Fotitos/fotito3.jpg",
    "assets/Fotitos/foto4.jpg",
    "assets/Fotitos/foto5.jpg",
    "assets/Fotitos/foto6.jpg",
    "assets/Fotitos/foto7.jpg",
    "assets/Fotitos/foto7(1).jpg",
    "assets/Fotitos/foto8.jpg",
    "assets/placeholder.svg"
    // "assets/foto1.jpg",
    // "assets/foto2.jpg",
    // etc...
  ],

  // ── MENSAJE FINAL ─────────────────────────────────────────
  final: {
    heart:   "❤️‍🔥",
    // Usa <em>texto</em> para cursiva rosa
    message: "Gracias por ser parte<br>de <em>mi vida entera</em>",
    sign:    "— con todo mi amor"
  }

};
// ============================================================
// ✅ ¡Listo!  Guarda y recarga el navegador para ver cambios.
// ============================================================
