/* ============================================================
   PIZZERIA VAILLANCE — Premium JS
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- YEAR ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- REVEAL ON SCROLL ---------- */
  const reveals = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("show");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );
  reveals.forEach((el) => io.observe(el));

  /* ---------- PROGRESS BAR ---------- */
  const bar = document.getElementById("progressBar");
  const updateBar = () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    if (bar) bar.style.width = scrolled + "%";
  };
  window.addEventListener("scroll", updateBar, { passive: true });

  /* ---------- HEADER HIDE ON HERO POSTER ---------- */
  const heroPoster = document.querySelector(".hero-poster");
  const siteHeader = document.querySelector(".header");
  if (heroPoster && siteHeader) {
    const updateHeaderVisibility = () => {
      const heroBottom = heroPoster.getBoundingClientRect().bottom;
      // Hide page header while the hero image is still mostly in view (image already shows its own header)
      if (heroBottom > 80) {
        document.body.classList.add("on-hero");
      } else {
        document.body.classList.remove("on-hero");
      }
    };
    updateHeaderVisibility();
    window.addEventListener("scroll", updateHeaderVisibility, { passive: true });
    window.addEventListener("resize", updateHeaderVisibility);
  }

  /* ---------- MOBILE DRAWER ---------- */
  const navToggle = document.getElementById("navToggle");
  const drawer = document.getElementById("drawer");
  const drawerLinks = document.querySelectorAll(".drawer-link, .drawer .btn");

  const toggleDrawer = (open) => {
    if (!drawer || !navToggle) return;
    const willOpen = open !== undefined ? open : !drawer.classList.contains("open");
    drawer.classList.toggle("open", willOpen);
    navToggle.classList.toggle("open", willOpen);
    document.body.style.overflow = willOpen ? "hidden" : "";
  };

  if (navToggle) navToggle.addEventListener("click", () => toggleDrawer());
  drawerLinks.forEach((l) => l.addEventListener("click", () => toggleDrawer(false)));

  /* ---------- COOKIE CONSENT (RGPD) ---------- */
  const cookieBanner = document.getElementById("cookieBanner");
  const cookieAccept = document.getElementById("cookieAccept");
  const cookieRefuse = document.getElementById("cookieRefuse");
  const COOKIE_KEY = "vaillance_cookie_consent";
  if (cookieBanner) {
    if (!localStorage.getItem(COOKIE_KEY)) {
      setTimeout(() => { cookieBanner.hidden = false; }, 1200);
    }
    const close = (val) => {
      localStorage.setItem(COOKIE_KEY, val);
      cookieBanner.hidden = true;
      if (val === "accepted") {
        // Hook for GA4 / Meta Pixel here
        console.log("[Cookies] Accepted — analytics can load");
      }
    };
    cookieAccept && cookieAccept.addEventListener("click", () => close("accepted"));
    cookieRefuse && cookieRefuse.addEventListener("click", () => close("refused"));
  }

  /* ---------- RESERVATION MODAL ---------- */
  const rsvOverlay = document.getElementById("rsvOverlay");
  const rsvClose = document.getElementById("rsvClose");
  const rsvForm = document.getElementById("rsvForm");
  const rsvSuccess = document.getElementById("rsvSuccess");
  const openReserve = (e) => { if (e) e.preventDefault(); if (rsvOverlay) { rsvOverlay.hidden = false; document.body.style.overflow = "hidden"; } };
  const closeReserve = () => { if (rsvOverlay) { rsvOverlay.hidden = true; document.body.style.overflow = ""; if (rsvForm) rsvForm.hidden = false; if (rsvSuccess) rsvSuccess.hidden = true; rsvForm && rsvForm.reset(); } };
  // Triggers: header reserve button, contact reserve button, all event card "Réserver" buttons, painted-image reserve hotspot
  const reserveTriggers = document.querySelectorAll('[data-testid="header-reserve-btn"], #openReserveBtn, [data-testid="event-pizzaparty-cta"], [data-testid="event-anniv-cta"], [data-testid="hot-reserve"]');
  reserveTriggers.forEach(b => b.addEventListener("click", openReserve));
  rsvClose && rsvClose.addEventListener("click", closeReserve);
  rsvOverlay && rsvOverlay.addEventListener("click", (e) => { if (e.target === rsvOverlay) closeReserve(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && rsvOverlay && !rsvOverlay.hidden) closeReserve(); });
  if (rsvForm) {
    rsvForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(rsvForm).entries());
      const subject = `Réservation Pizzeria Vaillance — ${data.name} (${data.persons} pers.)`;
      const body = `Bonjour,\n\nJe souhaite réserver une table à la Pizzeria Vaillance :\n\n• Nom : ${data.name}\n• Téléphone : ${data.phone}\n• Email : ${data.email || "—"}\n• Date : ${data.date}\n• Heure : ${data.time}\n• Personnes : ${data.persons}\n• Message : ${data.notes || "—"}\n\nMerci de confirmer.`;
      const mailto = `mailto:info@pizzeriavaillance.be?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      rsvForm.hidden = true;
      if (rsvSuccess) rsvSuccess.hidden = false;
      // Auto close after 4s
      setTimeout(closeReserve, 4500);
    });
  }

  /* ---------- MENU FILTERS ---------- */
  const filters = document.querySelectorAll(".filter");
  const dishes = document.querySelectorAll(".dish");

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.filter;
      filters.forEach((f) => f.classList.remove("active"));
      btn.classList.add("active");

      dishes.forEach((d) => {
        const match = cat === "all" || d.dataset.cat === cat;
        if (match) {
          d.classList.remove("hide");
        } else {
          d.classList.add("hide");
        }
      });
    });
  });

  /* ---------- OPEN NOW BADGE ---------- */
  const openBadge = document.getElementById("openBadge");
  const openText = document.getElementById("openText");

  const checkOpen = () => {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const time = h + m / 60;
    const isOpen = (time >= 11.5 && time < 14.5) || (time >= 18 && time < 22.5);

    if (!openBadge || !openText) return;
    if (isOpen) {
      openBadge.classList.remove("closed");
      openText.textContent = "Ouvert";
    } else {
      openBadge.classList.add("closed");
      openText.textContent = "Fermé";
    }
  };
  checkOpen();
  setInterval(checkOpen, 60000);

  /* ---------- LIGHTBOX ---------- */
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbClose = document.getElementById("lbClose");
  const items = document.querySelectorAll(".g-item");

  const openLB = (src) => {
    if (!lb || !lbImg) return;
    lbImg.src = src;
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
  };
  const closeLB = () => {
    if (!lb) return;
    lb.classList.remove("open");
    document.body.style.overflow = "";
  };

  items.forEach((it) => {
    it.addEventListener("click", () => openLB(it.dataset.src));
  });
  if (lbClose) lbClose.addEventListener("click", closeLB);
  if (lb) lb.addEventListener("click", (e) => { if (e.target === lb) closeLB(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLB();
  });

  /* ---------- PARALLAX HERO (subtle) ---------- */
  const heroBg = document.querySelector(".hero-bg");
  if (heroBg) {
    window.addEventListener("scroll", () => {
      const y = Math.min(window.scrollY, 800);
      heroBg.style.transform = `scale(1.08) translateY(${y * 0.18}px)`;
    }, { passive: true });
  }

  /* ---------- HEADER SHRINK ON SCROLL ---------- */
  const header = document.querySelector(".header");
  let lastY = 0;
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (!header) return;
    header.style.height = y > 50 ? "72px" : "86px";
    header.style.boxShadow = y > 50 ? "0 10px 30px rgba(0,0,0,0.3)" : "none";
    lastY = y;
  }, { passive: true });
});


// Filtre du menu complet
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCategories = document.querySelectorAll('.menu-category');

menuTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const filter = tab.dataset.menuFilter;

    menuTabs.forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');

    menuCategories.forEach((category) => {
      const show = filter === 'all' || category.dataset.category === filter;
      category.classList.toggle('hidden', !show);
    });
  });
});
