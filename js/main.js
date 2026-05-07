// Exomarine — Static site interactions

// Header scroll state
const header = document.querySelector('.site-header');
const onScroll = () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 20);
  // Hero parallax
  const bg = document.querySelector('.hero-bg');
  if (bg) bg.style.transform = `translateY(${window.scrollY * 0.35}px) scale(1.1)`;
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-mobile');
if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Counters
document.querySelectorAll('[data-count]').forEach(el => {
  const end = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '+';
  const cIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const start = performance.now(); const dur = 1600;
      const tick = (t) => {
        const p = Math.min((t - start) / dur, 1);
        el.textContent = Math.floor(end * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      cIO.disconnect();
    });
  }, { threshold: 0.4 });
  cIO.observe(el);
});

// Footer year
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();

// Contact form (no backend — simple confirmation)
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (btn) btn.innerHTML = 'Message sent — thank you!';
  });
}
