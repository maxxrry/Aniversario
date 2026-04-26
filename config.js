
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
      content: `<div class="ig-chat">
        <div class="ig-chat-header">
          <div class="ig-avatar">A</div>
          <span class="ig-username">_.antxx._</span>
        </div>
        <div class="ig-chat-body">
          <div class="ig-date">12 ABR 2022</div>
          <div class="ig-msg ig-sent">Ola</div>
          <div class="ig-msg ig-sent">Cómo tas</div>
          <div class="ig-msg ig-sent">Oye disculpa q te moleste</div>
          <div class="ig-msg ig-sent">Pero me podrías pasar algunos apuntes de química</div>
          <div class="ig-msg ig-sent">Esq siento q me faltan</div>
          <div class="ig-msg ig-sent">Y estoy súper perdido</div>
          <div class="ig-msg ig-sent">Dkdmdndk</div>
          <div class="ig-msg ig-recv">Holi bn y tup?</div>
          <div class="ig-reply-wrap">
            <div class="ig-reply-ref">Pero me podrías pasar algunos apuntes de química</div>
            <div class="ig-msg ig-recv">Yap te mando lo q tengo del repaso y algunos apuntes</div>
          </div>
        </div>
      </div>`,
      footer:  "Así empezó todo... pidiendo apuntes de química 😅"
    },
    {
      title:   "✦ La primera cita",
      content: "fue un 30 de junio nuestra primera cita oficial , recuerdo que me prepare mucho escogiendo el ofuit jsjsjjsjsj , fuimos al parque y nos sentamos en ese arbol kdkfkdfk y hablamos de todo un poco y nos besamos ",
      videos:  ["https://drive.google.com/file/d/1Vma5GxK5kHE0iBxUIZjTCAh-lVGlCaU7/preview"],
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
    "https://drive.google.com/thumbnail?id=13Ksj0fUxuKQkulITUJMk9eZvbpWSKpLM&sz=w1600", // foto1
    "https://drive.google.com/thumbnail?id=1iMea7W2GymyL05Eb95-hrXLErKzpDsPU&sz=w1600", // foto2
    "https://drive.google.com/thumbnail?id=1AHBrhidkx6HFHwRnpBqng8kgXDlgtU4q&sz=w1600", // fotito3
    "https://drive.google.com/thumbnail?id=1K4FIbyuQ2wGQFOT7rZ3WgPzWw4wQgZUN&sz=w1600", // foto4
    "https://drive.google.com/thumbnail?id=1fynE3CiNFyIT0_Vnq2q5UMOlBTP5UEHP&sz=w1600", // foto5
    "https://drive.google.com/thumbnail?id=1GoA5SXgCtnhv_3hAdsA6BzvY6xuACjq6&sz=w1600", // foto6
    "https://drive.google.com/thumbnail?id=1GSn1px36SYG64of3bi45pimT-6IzJizo&sz=w1600",  // foto7
    "https://drive.google.com/thumbnail?id=1Ikn74vR9I3TK6OPrSMC7P2n6TxoiZi6c&sz=w1600", // foto7(1)
    "https://drive.google.com/thumbnail?id=16-jPUw7goB0-pEiM5WCIzPfuPzN_aBZU&sz=w1600", // foto8
    "https://drive.google.com/thumbnail?id=1tRfHfLbUx7hXYqszElmaWNq0UwK3GNZH&sz=w1600", // IMG_1907
    // Para agregar más fotos: "https://drive.google.com/thumbnail?id=FILE_ID&sz=w1600",
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
