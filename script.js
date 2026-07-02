// ── Typer animation ──
  const phrases = [
    'python manage.py runserver',
    'git commit -m "ship it"',
    'docker build -t myapp .',
    'SELECT * FROM projects WHERE status = "production"',
    'pytest --cov=. tests/',
    'nginx -t && systemctl reload nginx',
  ];
  let pi = 0, ci = 0, deleting = false;
  const el = document.getElementById('typer-text');
  function type() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; return setTimeout(type, 1800); }
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; return setTimeout(type, 400); }
    }
    setTimeout(type, deleting ? 30 : 55);
  }
  type();

  // ── Scroll reveal ──
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ── LeetCode bars (set your real numbers here) ──
  const lcData = { easy: 107, med: 287, hard: 32 };  // ← update these when you have real counts
  const maxEasy = 951, maxMed = 2074, maxHard = 948;
  function animateBars() {
    const bars = document.querySelectorAll('.lc-bar');
    bars[0].style.width = lcData.easy ? (lcData.easy / maxEasy * 100) + '%' : '2%';
    bars[1].style.width = lcData.med  ? (lcData.med  / maxMed  * 100) + '%' : '2%';
    bars[2].style.width = lcData.hard ? (lcData.hard / maxHard * 100) + '%' : '2%';
    document.getElementById('lc-easy').textContent = lcData.easy || '–';
    document.getElementById('lc-med').textContent  = lcData.med  || '–';
    document.getElementById('lc-hard').textContent = lcData.hard || '–';
  }
  const lcObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateBars(); lcObs.disconnect(); }
  }, { threshold: 0.3 });
  lcObs.observe(document.querySelector('.lc-wrap'));