(function() {
  var path = window.location.pathname;
  var page = path.split('/').pop().replace('.html', '') || 'index';

  var pages = [
    { id: 'index', label: 'Home', href: 'index.html' },
    { id: 'demo-video', label: 'Demo', href: 'demo-video.html' },
    { id: 'story', label: 'Story', href: 'story.html' },
    { id: 'vision', label: 'Vision', href: 'vision.html' },
    { id: 'how', label: 'How I Made This', href: 'how.html' },
  ];

  // Inject CSS
  var s = document.createElement('style');
  s.textContent = '.nav-hamburger{position:fixed;top:16px;right:16px;z-index:1001;background:none;border:none;cursor:pointer;padding:10px;display:flex;flex-direction:column;gap:5px}.nav-hamburger span{display:block;width:20px;height:2px;background:rgba(255,255,255,.7);border-radius:1px;transition:all .3s ease}.nav-hamburger:hover span{background:rgba(255,255,255,1)}.nav-hamburger.open span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}.nav-hamburger.open span:nth-child(2){opacity:0}.nav-hamburger.open span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}.nav-dropdown{position:fixed;top:52px;right:16px;z-index:999;background:rgba(30,28,36,.92);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:10px;padding:8px 0;min-width:160px;box-shadow:0 8px 30px rgba(0,0,0,.25);opacity:0;pointer-events:none;transform:translateY(-8px);transition:opacity .2s ease,transform .2s ease}.nav-dropdown.open{opacity:1;pointer-events:auto;transform:translateY(0)}.nav-dropdown a{display:block;font-family:"DM Sans",sans-serif;font-weight:400;font-size:.95rem;color:rgba(255,255,255,.55);text-decoration:none;padding:9px 20px;transition:all .15s}.nav-dropdown a:hover{color:#fff;background:rgba(255,255,255,.06)}.nav-dropdown a.current{color:#fff;font-weight:600}';
  document.head.appendChild(s);

  // Create hamburger button — just three lines, no background
  var btn = document.createElement('button');
  btn.className = 'nav-hamburger';
  btn.setAttribute('aria-label', 'Menu');
  btn.innerHTML = '<span></span><span></span><span></span>';

  // Create dropdown
  var dd = document.createElement('div');
  dd.className = 'nav-dropdown';
  dd.innerHTML = pages.map(function(p) {
    return '<a href="' + p.href + '"' + (p.id === page ? ' class="current"' : '') + '>' + p.label + '</a>';
  }).join('');

  // Toggle
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    btn.classList.toggle('open');
    dd.classList.toggle('open');
  });

  // Close on click outside
  document.addEventListener('click', function() {
    btn.classList.remove('open');
    dd.classList.remove('open');
  });

  dd.addEventListener('click', function(e) {
    e.stopPropagation();
  });

  // Insert into page
  document.body.appendChild(btn);
  document.body.appendChild(dd);

  // Scroll chevron — centered at bottom of first screen, fades on scroll
  var chevStyle = document.createElement('style');
  chevStyle.textContent = '.scroll-chevron{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:998;opacity:.5;transition:opacity .4s ease;pointer-events:none}.scroll-chevron svg{width:28px;height:28px;animation:chevBounce 2s ease-in-out infinite}.scroll-chevron.hidden{opacity:0}@keyframes chevBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}';
  document.head.appendChild(chevStyle);

  var chev = document.createElement('div');
  chev.className = 'scroll-chevron';
  chev.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.7)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';
  document.body.appendChild(chev);

  var scrolled = false;
  window.addEventListener('scroll', function() {
    if (!scrolled && window.scrollY > 80) {
      scrolled = true;
      chev.classList.add('hidden');
    }
    if (scrolled && window.scrollY < 20) {
      scrolled = false;
      chev.classList.remove('hidden');
    }
  });
})();
