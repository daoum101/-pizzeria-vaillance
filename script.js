/* ═══════════════════════════════════════════════
   🎬 PIZZERIA VAILLANCE — Animations Premium
   Fusion : product-kit animations + original JS
═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────
     1. ANNÉE FOOTER
  ────────────────────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ──────────────────────────────────────────
     2. CURSEUR PERSONNALISÉ (product-kit)
  ────────────────────────────────────────── */
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');

  if (cursor && follower) {
    let mx = 0, my = 0, fx = 0, fy = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });

    (function animateCursor() {
      fx += (mx - fx) * 0.1;
      fy += (my - fy) * 0.1;
      follower.style.left = fx + 'px';
      follower.style.top  = fy + 'px';
      requestAnimationFrame(animateCursor);
    })();

    const hoverTargets = 'a, button, .tilt-card, .g-item, .filter, .value-item, .hq-item';
    document.querySelectorAll(hoverTargets).forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        follower.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        follower.classList.remove('hover');
      });
    });
  }


  /* ──────────────────────────────────────────
     3. BARRE DE PROGRESSION AU SCROLL
  ────────────────────────────────────────── */
  const progress = document.getElementById('progress');
  const updateProgress = () => {
    const h = document.documentElement;
    const total = h.scrollHeight - h.clientHeight;
    progress.style.width = total > 0 ? (h.scrollTop / total * 100) + '%' : '0%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();


  /* ──────────────────────────────────────────
     4. HEADER — fond au scroll (product-kit)
  ────────────────────────────────────────── */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });


  /* ──────────────────────────────────────────
     5. BURGER MENU
  ────────────────────────────────────────── */
  const burger = document.getElementById('burger');
  const nav    = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        nav.classList.remove('open');
      });
    });
  }


  /* ──────────────────────────────────────────
     6. PARALLAX — bg-word (product-kit)
  ────────────────────────────────────────── */
  const bgWords = document.querySelectorAll('[data-parallax]');
  window.addEventListener('scroll', () => {
    bgWords.forEach(el => {
      const speed  = parseFloat(el.dataset.parallax);
      const rect   = el.parentElement.getBoundingClientRect();
      const offset = (rect.top / window.innerHeight) * 100 * speed;
      el.style.transform = `translateX(-50%) translateY(${offset}px)`;
    });
  }, { passive: true });


  /* ──────────────────────────────────────────
     7. TILT 3D sur les cartes (product-kit)
  ────────────────────────────────────────── */
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transition = 'none';
      card.style.transform = `perspective(700px) rotateX(${-y * 13}deg) rotateY(${x * 13}deg) scale(1.03)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform .55s cubic-bezier(0.34,1.56,0.64,1)';
      card.style.transform  = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });


  /* ──────────────────────────────────────────
     8. SCROLL REVEAL directionnel (product-kit)
  ────────────────────────────────────────── */
  const revealEls = document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right, .reveal-scale'
  );
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  revealEls.forEach(el => revealObs.observe(el));


  /* ──────────────────────────────────────────
     9. PARTICULES HERO (product-kit)
  ────────────────────────────────────────── */
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    for (let i = 0; i < 24; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.setProperty('--dur',   (7 + Math.random() * 9) + 's');
      p.style.setProperty('--delay', (Math.random() * 14) + 's');
      p.style.left   = Math.random() * 100 + '%';
      const size = (1.5 + Math.random() * 3.5) + 'px';
      p.style.width  = size;
      p.style.height = size;
      const colors = [
        'rgba(217,164,65,.9)',
        'rgba(240,198,109,.7)',
        'rgba(194,69,31,.6)',
        'rgba(250,245,236,.4)'
      ];
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      particlesContainer.appendChild(p);
    }
  }


  /* ──────────────────────────────────────────
     10. SMOOTH SCROLL ancres
  ────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ──────────────────────────────────────────
     11. FILTRES MENU (original)
  ────────────────────────────────────────── */
  document.querySelectorAll('.filter').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.filter;
      document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.dish').forEach(d => {
        const hide = !(cat === 'all' || d.dataset.cat === cat);
        d.classList.toggle('hide', hide);
        if (!hide) {
          d.classList.remove('visible');
          requestAnimationFrame(() => {
            requestAnimationFrame(() => d.classList.add('visible'));
          });
        }
      });
    });
  });


  /* ──────────────────────────────────────────
     12. LIGHTBOX GALERIE (original amélioré)
  ────────────────────────────────────────── */
  const lb     = document.getElementById('lightbox');
  const lbImg  = document.getElementById('lbImg');
  const closeLb = document.getElementById('closeLb');

  document.querySelectorAll('.g-item').forEach(item => {
    item.addEventListener('click', () => {
      lbImg.src = item.dataset.src;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  };
  if (closeLb)  closeLb.addEventListener('click', closeLightbox);
  if (lb)       lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });


  /* ──────────────────────────────────────────
     13. HERO IMAGE PARALLAX SUBTILE
  ────────────────────────────────────────── */
  const heroPicture = document.querySelector('.hero picture, .hero > img');
  if (heroPicture) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY * 0.28;
      heroPicture.style.transform = `translateY(${y}px)`;
    }, { passive: true });
  }

  console.log('%c🍕 Pizzeria Vaillance — Premium animé', 'color:#d9a441;font-size:14px;font-weight:bold');
});
