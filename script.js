document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const progress = document.getElementById("progress");
  const updateProgress = () => {
    const h = document.documentElement;
    const total = h.scrollHeight - h.clientHeight;
    progress.style.width = total > 0 ? (h.scrollTop / total * 100) + "%" : "0%";
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  if (burger && nav) {
    burger.addEventListener("click", () => nav.classList.toggle("open"));
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
  }

  const reveals = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  reveals.forEach(el => io.observe(el));

  document.querySelectorAll(".filter").forEach(btn => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.filter;
      document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll(".dish").forEach(d => {
        d.classList.toggle("hide", !(cat === "all" || d.dataset.cat === cat));
      });
    });
  });

  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const closeLb = document.getElementById("closeLb");
  document.querySelectorAll(".g-item").forEach(item => {
    item.addEventListener("click", () => {
      lbImg.src = item.dataset.src;
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });
  const close = () => {
    lb.classList.remove("open");
    document.body.style.overflow = "";
  };
  if (closeLb) closeLb.addEventListener("click", close);
  if (lb) lb.addEventListener("click", e => { if (e.target === lb) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
});