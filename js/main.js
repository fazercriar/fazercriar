/* ==========================================================================
   FazerCriar — Comportamento do site
   Configurações editáveis ficam em js/config.js (não é preciso mexer aqui).
   ========================================================================== */
(function () {
  "use strict";

  var config = window.FAZERCRIAR_CONFIG || {};
  var header = document.querySelector(".site-header");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isLocal = /^(localhost|127\.0\.0\.1|\[::1\]|)$/.test(location.hostname) || location.protocol === "file:";

  /* ---------- WhatsApp ---------- */
  var waNumber = String(config.whatsappNumber || "").replace(/\D/g, "");
  var waConfigured = waNumber.length >= 10;
  var messages = config.whatsappMessages || {};

  function whatsappUrl(key) {
    var text = messages[key] || messages.orcamento || "";
    var base = "https://wa.me/" + (waConfigured ? waNumber : "");
    return text ? base + "?text=" + encodeURIComponent(text) : base;
  }

  document.querySelectorAll("[data-wa]").forEach(function (link) {
    link.href = whatsappUrl(link.getAttribute("data-wa"));
    link.target = "_blank";
    link.rel = "noopener";
  });

  if (!waConfigured) {
    console.warn("[FazerCriar] Número de WhatsApp não configurado. Edite whatsappNumber em js/config.js.");
    if (isLocal) showDevNotice();
  }

  function showDevNotice() {
    var box = document.createElement("div");
    box.className = "dev-notice";
    box.setAttribute("role", "status");
    box.innerHTML =
      "<span>Visível só localmente: configure <code>whatsappNumber</code> em <code>js/config.js</code>.</span>" +
      '<button type="button" aria-label="Fechar aviso">&times;</button>';
    box.querySelector("button").addEventListener("click", function () { box.remove(); });
    document.body.appendChild(box);
  }

  /* ---------- Logo oficial (opcional) ---------- */
  var logo = config.logo || {};
  if (logo.src) {
    document.querySelectorAll("[data-logo]").forEach(function (slot) {
      var img = document.createElement("img");
      img.className = "brand__img";
      img.src = logo.src;
      img.alt = logo.alt || "FazerCriar";
      if (logo.width) img.width = logo.width;
      if (logo.height) img.height = logo.height;
      img.decoding = "async";
      // se o arquivo não carregar, mantém o logotipo em texto
      img.addEventListener("load", function () {
        slot.replaceChildren(img);
      });
    });
  }

  /* ---------- Contatos do rodapé ---------- */
  var instagram = String(config.instagram || "").replace(/^@/, "").trim();
  var email = String(config.email || "").trim();
  setContact("instagram", instagram, "https://www.instagram.com/" + encodeURIComponent(instagram) + "/", "@" + instagram);
  setContact("email", email, "mailto:" + email, email);

  function setContact(name, value, href, label) {
    var item = document.querySelector('[data-config="' + name + '"]');
    if (!item || !value) return;
    var a = item.querySelector("a");
    a.href = href;
    a.querySelector("span").textContent = label;
    item.hidden = false;
  }

  /* ---------- Ano no rodapé ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Galeria de projetos ---------- */
  var iconMap = {
    impressao3d: "i-print3d",
    laser: "i-laser",
    prototipagem: "i-proto",
    personalizados: "i-custom",
    empresas: "i-gift"
  };

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function svgIcon(id) {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("class", "icon");
    svg.setAttribute("aria-hidden", "true");
    var use = document.createElementNS(ns, "use");
    use.setAttribute("href", "#" + id);
    svg.appendChild(use);
    return svg;
  }

  var gallery = document.getElementById("galeria-projetos");
  if (gallery && Array.isArray(config.projetos)) {
    config.projetos.forEach(function (p) {
      var li = el("li");
      li.setAttribute("data-reveal", "");
      var card = el("article", "project");

      var media = el("div", "project__media");
      if (p.imagem) {
        var img = el("img");
        img.src = p.imagem;
        img.alt = p.alt || p.titulo || "";
        img.width = 1200;
        img.height = 900;
        img.loading = "lazy";
        img.decoding = "async";
        media.appendChild(img);
      } else {
        media.classList.add("project__media--placeholder");
        media.setAttribute("role", "img");
        media.setAttribute("aria-label", "Imagem ilustrativa — foto em breve");
        var ph = el("span", "project__ph-icon");
        ph.appendChild(svgIcon(iconMap[p.icone] || "i-proto"));
        media.appendChild(ph);
        media.appendChild(el("span", "project__ph-badge", "Foto em breve"));
      }

      var body = el("div", "project__body");
      if (p.categoria) body.appendChild(el("p", "project__cat", p.categoria));
      body.appendChild(el("h3", "project__title", p.titulo || ""));
      if (p.descricao) body.appendChild(el("p", "project__desc", p.descricao));

      card.appendChild(media);
      card.appendChild(body);
      li.appendChild(card);
      gallery.appendChild(li);
    });
  }

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("menu-principal");
  var mobileQuery = window.matchMedia("(max-width: 1023.98px)");

  function setMenu(open) {
    header.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(!header.classList.contains("is-open"));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("is-open")) {
        setMenu(false);
        toggle.focus();
      }
    });
    mobileQuery.addEventListener("change", function (e) {
      if (!e.matches) setMenu(false);
    });
  }

  /* ---------- Header ao rolar ---------- */
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Link ativo no menu ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = "#" + entry.target.id;
        navLinks.forEach(function (a) {
          var active = a.getAttribute("href") === id;
          a.classList.toggle("is-active", active);
          if (active) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

  /* ---------- Animações de entrada ---------- */
  var revealItems = document.querySelectorAll("[data-reveal]");
  if (!reduceMotion && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealItems.forEach(function (item) { revealObserver.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add("is-visible"); });
  }

  /* ---------- Ilustração do hero: sem movimento se o usuário preferir ---------- */
  var art = document.querySelector(".hero-art");
  if (art && reduceMotion && art.pauseAnimations) {
    art.setCurrentTime(10);
    art.pauseAnimations();
  }
})();
