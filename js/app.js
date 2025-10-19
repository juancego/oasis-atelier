'use strict';

// ===== Datos de ejemplo (reemplaza con tus productos reales) =====
// ====== Productos (5 items, cada uno con 2 fotos) ======
const productos = [
  {
    id: 'velin',
    titulo: 'Velin',
    precio: 40000,
    color: 'blanco',
    disponibilidad: '24-48h',
    descripcion: 'La calma hecha flor. Un suspiro de elegancia en cada pétalo.',
    img: './assets/products/Velin1.jpeg',
    img2: './assets/products/Velin2.jpeg',
    categoria: 'bouquets'
  },
  {
    id: 'rosel',
    titulo: 'Rosel',
    precio: 32000,
    color: 'rosa',
    disponibilidad: '24-48h',
    descripcion: 'Romántico, suave y eterno. Donde el amor florece con sutileza.',
    img: './assets/products/Rosel1.jpeg',
    img2: './assets/products/Rosel2.jpeg',
    categoria: 'bouquets'
  },
  {
    id: 'silven',
    titulo: 'Silven',
    precio: 52000,
    color: 'blanco',
    disponibilidad: '24-48h',
    descripcion: 'Sencillez que brilla. La belleza del equilibrio natural.',
    img: './assets/products/Silven1.jpeg',
    img2: './assets/products/Silven2.jpeg',
    categoria: 'bouquets'
  },
  {
    id: 'kaia',
    titulo: 'Kaia',
    precio: 57000,
    color: 'mixto',
    disponibilidad: '24-48h',
    descripcion: 'Energía viva. Flores que irradian alegría y libertad.',
    img: './assets/products/Kaia1.jpeg',
    img2: './assets/products/Kaia2.jpeg',
    categoria: 'bouquets'
  },
  {
    id: 'lumina',
    titulo: 'Lumina',
    precio: 60000,
    color: 'amarillo',
    disponibilidad: 'a-pedido',
    descripcion: 'Luz y calidez en una sola creación. El sol hecho flor.',
    img: './assets/products/Lumina1.jpeg',
    img2: './assets/products/Lumina2.jpeg',
    categoria: 'canastas'
  }
];

// ====== Card del CATÁLOGO (botón en verde debajo, con 2 imágenes) ======
function cardProducto(p){
  const div = document.createElement('article');
  div.className = 'card';
  div.setAttribute('tabindex', '0'); // para focus/teclado
  div.innerHTML = `
    <div class="card__imgwrap">
      <img class="card__img card__img--primary"  src="${p.img}"  alt="${p.titulo}" loading="lazy" onerror="this.style.display='none'">
      <img class="card__img card__img--secondary" src="${p.img2}" alt="${p.titulo} – vista alterna" loading="lazy" onerror="this.style.display='none'">
    </div>

    <h3 class="card__title">${p.titulo}</h3>

    <div class="card__meta">
      <span>${formatoPrecio(p.precio)}</span>
      <span>•</span>
      <span>${p.color}</span>
    </div>

    <div class="card__cta">
      <button class="btn btn--catalog" data-id="${p.id}" aria-label="Ver ${p.titulo}">Ver</button>
    </div>
  `;
  return div;
}


const colecciones = [
  { id: 'canastas',     titulo: 'Canastas florales',     desc: 'Cestas curadas con flores de temporada.',            img: './assets/categorias/canastas.jpeg' },
  { id: 'bouquets',     titulo: 'Bouquets',              desc: 'Ramos listos para entregar o personalizar.',         img: './assets/categorias/bouquets.jpeg' },
  { id: 'jarron',       titulo: 'Arreglos en jarrón',    desc: 'Composiciones en recipientes elegantes.',            img: './assets/categorias/jarron.jpg' },
  { id: 'corporativos', titulo: 'Arreglos corporativos', desc: 'Decoración floral para espacios y eventos de marca.', img: './assets/categorias/corporativos.jpg' }
];


// ===== Utilidades =====
const $$  = (sel, ctx=document) => ctx.querySelector(sel);
const $$$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

function formatoPrecio(n){
  try {
    return new Intl.NumberFormat('es-CO', { style:'currency', currency:'COP', maximumFractionDigits:0 }).format(n);
  } catch {
    return `$${n}`;
  }
}

// ===== Cards =====
function cardProducto(p){
  const div = document.createElement('article');
  div.className = 'card';
  div.innerHTML = `
    <div class="card__imgwrap">
      <img class="card__img" src="${p.img}" alt="${p.titulo}" loading="lazy" onerror="this.style.display='none'" />
    </div>

    <h3 class="card__title">${p.titulo}</h3>

    <div class="card__meta">
      <span>${formatoPrecio(p.precio)}</span>
      <span>•</span>
      <span>${p.color}</span>
    </div>

    <div class="card__cta">
      <button class="btn btn--catalog" data-id="${p.id}" aria-label="Ver ${p.titulo}">Ver</button>
    </div>
  `;
  return div;
}




function cardColeccion(c){
  const div = document.createElement('article');
  div.className = 'card';
  div.innerHTML = `
    <img class="card__img" src="${c.img}" alt="${c.titulo}" onerror="this.style.display='none'" />
    <h3 class="card__title">${c.titulo}</h3>
    <p class="muted">${c.desc}</p>`;
  return div;
}

function renderDestacados(){
  const cont = $$('#destacados');
  if (!cont) return;
  cont.innerHTML = '';
  productos.slice(0,3).forEach(p => cont.appendChild(cardDestacado(p)));
}


function renderCatalogo(lista){
  const grid = $$('#catalogoGrid');
  if (!grid) return;
  grid.innerHTML = '';
  lista.forEach(p => grid.appendChild(cardProducto(p)));
}

function renderColecciones(){
  const grid = $$('#coleccionesGrid');
  if (!grid) return;
  grid.innerHTML = '';
  colecciones.forEach(c => grid.appendChild(cardColeccion(c)));
}

// ===== Filtros y búsqueda =====
function aplicarFiltros(){
  const q = ($$('#buscador')?.value || '').trim().toLowerCase();
  const c = $$('#filtroColor')?.value || '';
  const d = $$('#filtroDisponibilidad')?.value || '';
  const filtrados = productos.filter(p => {
    const coincideTexto = !q || p.titulo.toLowerCase().includes(q) || p.descripcion.toLowerCase().includes(q);
    const coincideColor = !c || p.color === c;
    const coincideDisp = !d || p.disponibilidad === d;
    return coincideTexto && coincideColor && coincideDisp;
  });
  renderCatalogo(filtrados);
}

// ===== Modal de producto =====
function abrirModal(p){
  const dlg = $$('#productoModal');
  if (!dlg) return;
  $$('#modalImg').src = p.img;
  $$('#modalImg').alt = p.titulo;
  $$('#modalTitulo').textContent = p.titulo;
  $$('#modalTexto').textContent = p.descripcion;
  $$('#modalPrecio').textContent = formatoPrecio(p.precio);
  $$('#modalColor').textContent = p.color;
  $$('#modalDisp').textContent = p.disponibilidad;
  const texto = encodeURIComponent(`Hola Oasis, quiero pedir: ${p.titulo} (${formatoPrecio(p.precio)}).`);
  $$('#modalCTA').href = `https://wa.me/573177598416?text=${texto}`;
  dlg.showModal();
}

function cerrarModal(){ $$('#productoModal')?.close(); }

// ===== Navegación móvil =====
function setupMenuMovil(){
  const btn = $$('.menu-toggle');
  const menu = $$('#menu-movil');
  if (!btn || !menu) return;

  const toggle = () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    menu.hidden = expanded;
  };

  btn.addEventListener('click', toggle);
  btn.addEventListener('keydown', (e)=>{
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });

  $$$('#menu-movil a').forEach(a => a.addEventListener('click', () => {
    btn.setAttribute('aria-expanded','false');
    menu.hidden = true;
  }));
}

// ===== Delegación: abrir modal desde cualquier grid (sin romper links) =====
function setupDelegation(){
  const isInteractive = (el) =>
    !!el.closest('a, button, input, select, textarea, label, [contenteditable="true"]');

  // Clicks
  document.body.addEventListener('click', (e) => {
    // 1) Deja que los enlaces (externos/internos) funcionen normal
    if (e.target.closest('a')) return;

    // 2) Botón "Ver" dentro de la card
    const btn = e.target.closest('button[data-id]');
    if (btn){
      const id = btn.getAttribute('data-id');
      const p = productos.find(x => x.id === id);
      if (p) abrirModal(p);
      return;
    }

    // 3) (Opcional) Toda la card abre modal, pero NO si clicas un elemento interactivo dentro
    const card = e.target.closest('.card[data-id], .product-card[data-id]');
    if (!card || isInteractive(e.target)) return;

    const id = card.getAttribute('data-id');
    const p = productos.find(x => x.id === id);
    if (p) abrirModal(p);
  });

  // Teclado (Enter/Espacio) accesible
  document.body.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    if (e.target.closest('a, button, input, select, textarea')) return;

    const target = e.target.closest('.card[data-id], .product-card[data-id], button[data-id]');
    if (!target) return;

    e.preventDefault();
    const id = target.getAttribute('data-id');
    const p = productos.find(x => x.id === id);
    if (p) abrirModal(p);
  });

  $$('.modal__close')?.addEventListener('click', cerrarModal);
  $$('#productoModal')?.addEventListener('click', (e)=>{
    if (e.target === e.currentTarget) cerrarModal();
  });
}


// ===== Header: opacidad/sombra al hacer scroll =====
window.addEventListener('scroll', () => {
  if (window.scrollY > 8) document.body.classList.add('scrolled');
  else document.body.classList.remove('scrolled');
});

function setupNavBubble(){
  const menu = document.querySelector('.menu');
  if (!menu) return;

  // Crear/obtener la burbuja
  let indicator = menu.querySelector('.nav-indicator');
  if (!indicator) {
    indicator = document.createElement('span');
    indicator.className = 'nav-indicator';
    menu.appendChild(indicator);
  }

  const links = Array.from(menu.querySelectorAll('a[href^="#"]')).filter(a => a.offsetParent !== null);
  if (!links.length) return;

  // Helpers
  const menuLeft = () => menu.getBoundingClientRect().left + window.scrollX;

  const moveTo = (el, instant = false) => {
    if (!el) return;
    links.forEach(a => a.removeAttribute('aria-current'));
    el.setAttribute('aria-current', 'page');

    const rect = el.getBoundingClientRect();
    const x = rect.left + window.scrollX - menuLeft();
    const w = rect.width;

    if (instant) {
      const prev = indicator.style.transition;
      indicator.style.transition = 'none';
      indicator.style.setProperty('--x', x + 'px');
      indicator.style.setProperty('--w', w + 'px');
      indicator.style.opacity = '1';
      requestAnimationFrame(() => { indicator.style.transition = prev || ''; });
    } else {
      indicator.style.setProperty('--x', x + 'px');
      indicator.style.setProperty('--w', w + 'px');
      indicator.style.opacity = '1';
    }
  };

  // --- BLOQUEO del scrollspy mientras hacemos smooth scroll por click ---
  let locked = false;
  let lockTimer = null;
  const lock = (ms = 700) => {
    locked = true;
    clearTimeout(lockTimer);
    lockTimer = setTimeout(() => { locked = false; }, ms);
  };

  // rAF Scrollspy (ignora mientras locked = true)
  let ticking = false;
  const sections = links.map(a => {
    const id = a.getAttribute('href');
    return { id, link: a, el: document.querySelector(id) };
  }).filter(s => s.el);

  const onScroll = () => {
    if (locked || ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const vpCenter = window.scrollY + window.innerHeight * 0.33;
      let best = null, bestDist = Infinity;
      for (const s of sections) {
        const top = s.el.getBoundingClientRect().top + window.scrollY;
        const bottom = top + (s.el.offsetHeight || 0);
        const center = (top + bottom) / 2;
        const d = Math.abs(center - vpCenter);
        if (d < bestDist) { best = s; bestDist = d; }
      }
      if (best) moveTo(best.link, false);
      ticking = false;
    });
  };

  // Click/tecla → mover burbuja instantáneo y bloquear scrollspy
  links.forEach(a => {
    const go = () => { moveTo(a, true); lock(800); };
    a.addEventListener('click', go);
    a.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
    });
  });

  // Desbloques adicionales cuando termina el desplazamiento
  window.addEventListener('hashchange', () => lock(0));           // llegó al destino
  // scrollend no está en todos los navegadores; si existe, úsalo
  if ('onscrollend' in window) window.addEventListener('scrollend', () => lock(0));

  // Recalcular en resize
  window.addEventListener('resize', () => {
    const current = menu.querySelector('a[aria-current="page"]') || links[0];
    moveTo(current, true);
  });

  // Init
  window.addEventListener('load', () => {
    const hash = window.location.hash || links[0]?.getAttribute('href');
    const target = links.find(a => a.getAttribute('href') === hash) || links[0];
    moveTo(target, true);
    onScroll();
  });

  window.addEventListener('scroll', onScroll, { passive: true });
}



// ===== Año footer =====
function setupYear(){
  const el = $$('#anio');
  if (el) el.textContent = new Date().getFullYear();
}

// ===== Init =====
window.addEventListener('DOMContentLoaded', () => {
  setupYear();

  // Render inicial
  renderDestacados();
  renderCatalogo(productos);
  renderColecciones();

  // Filtros
  $$('#buscador')?.addEventListener('input', aplicarFiltros);
  $$('#filtroColor')?.addEventListener('change', aplicarFiltros);
  $$('#filtroDisponibilidad')?.addEventListener('change', aplicarFiltros);

  // Navegación y modal
  setupMenuMovil();
  setupDelegation();

  // Menú con burbuja + scrollspy
  setupNavBubble();
});

// Vista inicial: solo categorías
mostrarCategorias();

// Click en categorías (tarjetas con imagen)
$$$('#catalogoCategorias .cat-card').forEach(card => {
  const open = () => {
    const key = card.dataset.cat;
    const etiqueta = card.querySelector('.cat-card__title')?.textContent.trim() || '';
    mostrarCategoria(key, etiqueta);
  };
  card.addEventListener('click', open);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
  });
});

// Volver a categorías (esto ya existía en tu HTML)
$$('#btnVolverCat')?.addEventListener('click', mostrarCategorias);

function cardDestacado(p){
  const div = document.createElement('article');
  div.className = 'card';
  div.innerHTML = `
    <div class="card__imgwrap">
      <img class="card__img" src="${p.img}" alt="${p.titulo}" loading="lazy" onerror="this.style.display='none'"/>
      <div class="card__overlay">
      </div>
    </div>
    <h3 class="card__title">${p.titulo}</h3>
    <div class="card__meta">
      <span>${formatoPrecio(p.precio)}</span>
      <span>•</span>
      <span>${p.color}</span>
    </div>
  `;
  return div;
}

// Vista inicial: solo categorías
mostrarCategorias();

// Click/teclado en la tarjeta completa (imagen o texto)
$$$('#catalogoCategorias .cat-card').forEach(card => {
  const open = () => {
    const key = card.dataset.cat;
    const etiqueta = card.querySelector('.cat-caption')?.textContent.trim() || '';
    mostrarCategoria(key, etiqueta);
  };
  card.addEventListener('click', open);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
  });
});

// Volver a categorías (si no lo tienes ya)
$$('#btnVolverCat')?.addEventListener('click', mostrarCategorias);

// --- Compensa la altura real del header y corrige anclas ---
function setupAnchorOffset(){
  const header = document.querySelector('.site-header');
  const setH = () => {
    if (!header) return;
    const h = header.offsetHeight || 88;
    document.documentElement.style.setProperty('--header-h', h + 'px');
  };
  setH();
  window.addEventListener('resize', setH);
  window.addEventListener('load', () => {
    setH();
    // Si abriste con un #hash, reubica para respetar el nuevo offset
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({block:'start'});
    }
  });
}

// Filtra el catálogo por la propiedad "categoria" y navega a #catalogo
function mostrarColeccion(catKey, etiqueta = ""){
  // limpia búsqueda y selects
  const busc = document.querySelector('#buscador');
  const selColor = document.querySelector('#filtroColor');
  const selDisp  = document.querySelector('#filtroDisponibilidad');
  if (busc) busc.value = '';
  if (selColor) selColor.value = '';
  if (selDisp) selDisp.value = '';

  // filtra por categoría y renderiza
  const lista = productos.filter(p => p.categoria === catKey);
  renderCatalogo(lista);

  // opcional: cambia el título si quieres mostrar la etiqueta actual
  // document.querySelector('#catalogo-title')?.replaceChildren(document.createTextNode(`Catálogo · ${etiqueta}`));

  // navega al catálogo
  const target = document.querySelector('#catalogo');
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Forzar que los enlaces externos en .contacto__social abran en nueva pestaña
(() => {
  const cont = document.querySelector('.contacto__social');
  if (!cont) return;

  cont.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-external="true"]');
    if (!a) return;

    // Evita cualquier preventDefault aguas arriba
    e.preventDefault();
    e.stopPropagation();

    // Abre sí o sí
    window.open(a.href, '_blank', 'noopener');
  });
})();

// Forzar apertura de enlaces externos marcados con data-external, sin que nada los intercepte
document.addEventListener('click', function(e){
  const a = e.target.closest('a[data-external="true"]');
  if (!a) return;
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  window.open(a.href, '_blank', 'noopener');
}, { capture: true });
