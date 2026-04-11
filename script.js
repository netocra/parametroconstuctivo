
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-fill').forEach(f => f.classList.add('animated'));
        skillObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.blueprint-card').forEach(c => skillObs.observe(c));

  const sections = document.querySelectorAll('[id]');
  window.addEventListener('scroll', () => {
    const y = window.scrollY + 100;
    sections.forEach(s => {
      const link = document.querySelector(`.nav-links a[href="#${s.id}"]`);
      if (link) link.style.color = (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) ? 'var(--khaki)' : '';
    });
  });

  /*-------- Animacion de barra de estadisticas ------*/
  function animateCount(el, target, suf = '') {
    let start = 0;
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1800, 1);
      el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target) + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

/* ----- INICIO / barra de estadistica -----*/
  const statsObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const n = document.querySelectorAll('.stat-number');
        animateCount(n[0], 0, '+');
        animateCount(n[1], 0, '');
        animateCount(n[2], 0, '%');
        animateCount(n[3], 0, 'M');
        statsObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  const sb = document.querySelector('.stats-bar');
  if (sb) statsObs.observe(sb);
