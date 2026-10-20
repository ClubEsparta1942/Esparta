// ===== Fixture (datos en fixture.js) =====
function renderFixture() {
  if (typeof FIXTURE === "undefined") return;
  const DIAS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const parse = (f) => new Date(`${f}T${FIXTURE_HORA}:00`);
  const corta = (d) => `${DIAS[d.getDay()]} ${d.getDate()}/${d.getMonth() + 1}`;
  const esEsparta = (p) => p.local === "Esparta" || p.visitante === "Esparta";
  const ahora = new Date();
  // Un partido sin resultado se considera pendiente hasta 3 horas después del inicio
  const pendiente = (p) => !p.resultado && parse(p.fecha).getTime() + 3 * 3600e3 > ahora.getTime();
  const nombre = (t) => (t === "Esparta" ? `<span class="is-esparta">${t}</span>` : t);

  const partidos = FIXTURE.filter(esEsparta);
  const proximo = partidos.find(pendiente);

  // Lista de partidos de Esparta
  document.getElementById("espartaFixture").innerHTML = partidos.map((p) => {
    const d = parse(p.fecha);
    const local = p.local === "Esparta";
    let marcador = `${nombre(p.local)} vs. ${nombre(p.visitante)}`;
    let tag = local ? '<span class="tag tag--home">Local</span>' : '<span class="tag">Visitante</span>';
    if (p.resultado) {
      const [a, b] = p.resultado.split("-").map(Number);
      const gano = local ? a > b : b > a;
      marcador = `${nombre(p.local)} <b>${a}</b> – <b>${b}</b> ${nombre(p.visitante)}`;
      tag = gano ? '<span class="tag tag--win">Ganado</span>' : '<span class="tag tag--loss">Perdido</span>';
    } else if (!pendiente(p)) {
      tag = '<span class="tag">Jugado</span>';
    }
    // Si hay planilla estadística, la etiqueta pasa a ser un link al PDF
    if (p.planilla && !pendiente(p)) {
      tag = tag.replace("<span", `<a href="${p.planilla}" target="_blank" rel="noopener" title="Ver la planilla estadística del partido"`)
        .replace(/>([^<]*)<\/span>$/, '>$1 · Planilla ↗</a>')
        .replace('class="tag', 'class="tag tag--link');
    }
    return `<div class="match${p === proximo ? " is-next" : ""}">
      <span class="match__date"><span class="match__jornada">Jornada ${p.jornada}</span>${corta(d)} · ${FIXTURE_HORA}</span>
      <span class="match__teams">${marcador} <small>Cancha ${p.cancha}</small></span>
      ${tag}
    </div>`;
  }).join("");

  // Próximo partido destacado (en la sección y en la portada)
  if (proximo) {
    const d = parse(proximo.fecha);
    const lugar = proximo.local === "Esparta" ? "Local" : "Visitante";
    const box = document.getElementById("nextMatch");
    box.innerHTML = `<div>
        <div class="next-match__label">Próximo partido · Jornada ${proximo.jornada}</div>
        <div class="next-match__teams">${proximo.local}<span class="vs">vs</span>${proximo.visitante}</div>
        <div class="next-match__info">${lugar} · Cancha ${proximo.cancha}</div>
      </div>
      <div class="next-match__when"><strong>${d.getDate()}/${d.getMonth() + 1}</strong>${DIAS[d.getDay()]} · ${FIXTURE_HORA} h</div>`;
    box.hidden = false;
    document.getElementById("heroNext").innerHTML = `<b>Próximo partido · Primera</b>
      <span class="teams">${proximo.local} vs. ${proximo.visitante}</span>
      <span class="when">${corta(d)} · ${FIXTURE_HORA} h · Cancha ${proximo.cancha}</span>
      <span class="go">Ver fixture →</span>`;
  }

  // Fixture completo de la liga, por jornada
  const jornadas = [...new Set(FIXTURE.map((p) => p.jornada))];
  document.getElementById("leagueFixture").innerHTML = jornadas.map((j) => `
    <h4>Jornada ${j}</h4>
    <div class="table-wrap"><table class="schedule">
      <thead><tr><th>Fecha</th><th>Local</th><th>Visitante</th><th>Resultado</th><th>Cancha</th></tr></thead>
      <tbody>${FIXTURE.filter((p) => p.jornada === j).map((p) => `
        <tr class="${esEsparta(p) ? "has-esparta" : ""}">
          <td>${corta(parse(p.fecha))}</td><td>${p.local}</td><td>${p.visitante}</td>
          <td>${p.resultado
            ? (p.planilla ? `<a href="${p.planilla}" target="_blank" rel="noopener">${p.resultado.replace("-", " – ")} ↗</a>` : p.resultado.replace("-", " – "))
            : "–"}</td><td>${p.cancha}</td>
        </tr>`).join("")}
      </tbody>
    </table></div>`).join("");
}
renderFixture();

// Menú móvil
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open);
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", false);
  })
);

// Filtro de horarios
document.querySelectorAll(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    const f = btn.dataset.filter;
    document.querySelectorAll(".schedule tbody tr").forEach((tr) => {
      tr.classList.toggle("is-hidden", f !== "todos" && tr.dataset.cat !== f);
    });
  });
});

// Contadores animados de la portada
function animateCount(el) {
  const target = +el.dataset.count;
  const start = target > 1000 ? target - 60 : 0; // el año arranca cerca, no desde 0
  const duration = 1200;
  const t0 = performance.now();
  function step(t) {
    const p = Math.min((t - t0) / duration, 1);
    el.textContent = Math.round(start + (target - start) * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
document.querySelectorAll("[data-count]").forEach(animateCount);

// Aparición al hacer scroll
const revealEls = document.querySelectorAll(".section h2, .news-card, .brief, .match, .timeline li, .steps li, .form");
revealEls.forEach((el) => el.classList.add("reveal"));
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.15 }
);
revealEls.forEach((el) => io.observe(el));

// Formulario de asociación: arma el mensaje y lo abre en WhatsApp del club
const form = document.getElementById("joinForm");
const msg = document.getElementById("formMsg");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll("[required]").forEach((input) => {
    const valid = input.value.trim() && input.checkValidity();
    input.classList.toggle("is-invalid", !valid);
    if (!valid) ok = false;
  });
  if (!ok) {
    msg.textContent = "Revisá los campos marcados.";
    msg.className = "form__msg error";
    return;
  }
  const texto = [
    "¡Hola Esparta! Quiero asociarme al club.",
    `Nombre: ${form.nombre.value.trim()}`,
    form.telefono.value.trim() && `Teléfono: ${form.telefono.value.trim()}`,
    `Actividad: ${form.actividad.value}`,
    form.mensaje.value.trim() && `Mensaje: ${form.mensaje.value.trim()}`,
  ].filter(Boolean).join("\n");
  window.open(`https://wa.me/59899084346?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
  msg.textContent = `¡Gracias, ${form.nombre.value.trim().split(" ")[0]}! Se abrió WhatsApp con tu mensaje listo para enviar.`;
  msg.className = "form__msg ok";
  form.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();

// Noticias: "Leer más" abre la noticia completa en una ventana
const modal = document.getElementById("newsModal");
document.querySelectorAll("[data-news]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".news-card");
    const img = card.querySelector(".news-card__img img");
    const modalImg = modal.querySelector(".news-modal__img img");
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modal.querySelector(".news-card__meta").innerHTML = card.querySelector(".news-card__meta").innerHTML;
    modal.querySelector("h3").textContent = card.querySelector("h3").textContent;
    modal.querySelector(".news-modal__content").innerHTML = card.querySelector(".news__full").innerHTML;
    modal.querySelector(".news-modal__text").scrollTop = 0;
    modal.showModal();
  });
});
modal.querySelector("[data-close]").addEventListener("click", () => modal.close());
// Cerrar al hacer clic fuera del contenido
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.close();
});

// Carrusel de beneficios: flechas, puntitos y avance automático
(function () {
  const root = document.getElementById("benefitsCarousel");
  if (!root) return;
  const track = root.querySelector(".carousel__track");
  const slides = [...track.children];
  const dots = root.querySelector(".carousel__dots");
  dots.innerHTML = slides.map(() => "<span></span>").join("");
  const step = () => slides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0);
  const atEnd = () => track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;
  const go = (dir) => {
    if (dir > 0 && atEnd()) track.scrollTo({ left: 0 });
    else if (dir < 0 && track.scrollLeft <= 5) track.scrollTo({ left: track.scrollWidth });
    else track.scrollBy({ left: dir * step() });
  };
  const marcarPunto = () => {
    const i = Math.round(track.scrollLeft / step());
    [...dots.children].forEach((d, k) => d.classList.toggle("is-active", k === Math.min(i, slides.length - 1)));
  };
  track.addEventListener("scroll", marcarPunto, { passive: true });
  marcarPunto();
  let reiniciar = () => {};
  document.querySelectorAll("#beneficios .carousel__btn").forEach((b) =>
    b.addEventListener("click", () => { go(+b.dataset.dir); reiniciar(); })
  );

  // Avanza solo cada 4 segundos, se pausa al pasar el mouse o tocarlo
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let timer = null, pausado = false, visible = false;
  reiniciar = () => {
    clearInterval(timer);
    timer = setInterval(() => { if (!pausado && visible) go(1); }, 4000);
  };
  root.addEventListener("mouseenter", () => (pausado = true));
  root.addEventListener("mouseleave", () => (pausado = false));
  track.addEventListener("touchstart", () => { pausado = true; }, { passive: true });
  track.addEventListener("touchend", () => { setTimeout(() => (pausado = false), 5000); }, { passive: true });
  new IntersectionObserver((e) => (visible = e[0].isIntersecting), { threshold: 0.3 }).observe(root);
  reiniciar();
})();
