/* ═══════════════════════════════════════════════════
   PIZZERIA VAILLANCE — Premium Animations Engine
   Creative by Astra Agency
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. PAGE LOADER ── */
  const loader = document.querySelector('.loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('done'), 900);
    });
    setTimeout(() => loader.classList.add('done'), 3000);
  }


  /* ── 2. CURSEUR CUSTOM ── */
  const cursor = document.querySelector('.cursor');
  const ring   = document.querySelector('.cursor-ring');
  if (cursor && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; });
    (function animRing() { rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; ring.style.left = rx + 'px'; ring.style.top  = ry + 'px'; requestAnimationFrame(animRing); })();
    document.querySelectorAll('a,button,.g-item,.review-card,.food-card,.value,.parking-card').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
    document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
    document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));
  }


  /* ── 3. PROGRESS BAR ── */
  const progress = document.querySelector('.progress');
  if (progress) {
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      progress.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
    }, { passive: true });
  }


  /* ── 4. HEADER SCROLL ── */
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 80), { passive: true });
  }


  /* ── 5. BURGER ── */
  const burger = document.querySelector('.burger');
  const nav    = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      burger.classList.remove('open');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }


  /* ── 6. SCROLL REVEAL (IntersectionObserver) ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-clip');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObs.observe(el));


  /* ── 7. PARALLAX BG-WORD ── */
  document.querySelectorAll('[data-parallax]').forEach(el => {
    window.addEventListener('scroll', () => {
      const speed = parseFloat(el.dataset.parallax);
      const rect  = el.parentElement.getBoundingClientRect();
      el.style.transform = `translateX(-50%) translateY(${(rect.top / innerHeight) * 100 * speed}px)`;
    }, { passive: true });
  });


  /* ── 8. HERO PARALLAX ── */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      heroBg.style.transform = `translateY(${scrollY * 0.22}px)`;
    }, { passive: true });
  }


  /* ── 9. TILT 3D CARTES ── */
  document.querySelectorAll('.review-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - .5;
      const y = (e.clientY - r.top)  / r.height - .5;
      card.style.transition = 'none';
      card.style.transform = `perspective(800px) rotateX(${-y*10}deg) rotateY(${x*10}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform .6s cubic-bezier(0.34,1.56,0.64,1)';
      card.style.transform = '';
    });
  });


  /* ── 10. COUNT-UP STATS ── */
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const isFloat = el.dataset.float === 'true';
    let done = false;
    new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || done) return;
      done = true;
      const start = performance.now();
      const dur = 2000;
      function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const val = ease * target;
        el.textContent = isFloat ? val.toFixed(1) : Math.round(val);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = isFloat ? target.toFixed(1) : target;
      }
      requestAnimationFrame(tick);
    }, { threshold: .5 }).observe(el);
  });


  /* ── 11. PARTICLES HERO ── */
  const pCont = document.getElementById('particles');
  if (pCont) {
    for (let i = 0; i < 28; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.setProperty('--d',  (6 + Math.random() * 10) + 's');
      p.style.setProperty('--dl', (Math.random() * 15) + 's');
      p.style.left   = Math.random() * 100 + '%';
      const s = (1.5 + Math.random() * 3.5) + 'px';
      p.style.cssText += `width:${s};height:${s};`;
      const clrs = ['rgba(200,151,58,.9)','rgba(232,184,106,.7)','rgba(245,212,154,.5)','rgba(248,242,232,.35)'];
      p.style.background = clrs[Math.floor(Math.random() * clrs.length)];
      pCont.appendChild(p);
    }
  }


  /* ── 12. MENU FILTRES ── */
  document.querySelectorAll('.filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      document.querySelectorAll('.food-card').forEach(c => {
        const show = cat === 'all' || c.dataset.cat === cat;
        c.classList.toggle('hide', !show);
        if (show) { c.classList.remove('visible'); setTimeout(() => c.classList.add('visible'), 60); }
      });
    });
  });


  /* ── 13. LIGHTBOX GALERIE ── */
  const lb    = document.querySelector('.lightbox');
  const lbImg = document.querySelector('#lbImg');
  const lbCls = document.querySelector("#lbClose");
  if (lb && lbImg) {
    document.querySelectorAll('.g-item[data-src]').forEach(el => {
      el.addEventListener('click', () => { lbImg.src = el.dataset.src; lb.classList.add('open'); document.body.style.overflow = 'hidden'; });
    });
    const closeLb = () => { lb.classList.remove('open'); document.body.style.overflow = ''; lbImg.src = ''; };
    lbCls?.addEventListener('click', closeLb);
    lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
  }


  /* ── 14. SMOOTH SCROLL ANCRES ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });


  /* ── 15. FOOTER YEAR ── */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();


  /* ── 16. MAGNETIC BUTTONS ── */
  document.querySelectorAll('.btn-gold, .cta-nav').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width  / 2) * .25;
      const y = (e.clientY - r.top  - r.height / 2) * .25;
      btn.style.transform = `translateX(${x}px) translateY(${y - 4}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });


  console.log('%c🍕 Pizzeria Vaillance | Creative by Astra Agency', 'color:#c8973a;font-size:14px;font-weight:900;letter-spacing:.1em');
});
