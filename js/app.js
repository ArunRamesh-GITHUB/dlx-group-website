/* DLX — shared site behaviour (external file so it runs under a strict
   script-src 'self' CSP — inline <script> blocks are blocked in production). */

// ---- Mobile nav ----
(function () {
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  function toggle(e) {
    e.preventDefault();
    var isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggle);
  hamburger.addEventListener('touchend', function (e) {
    e.preventDefault();
    toggle(e);
  }, { passive: false });

  mobileMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  var links = document.querySelectorAll('.nav-links a, .mobile-menu a');
  var current = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// ---- Cookie consent ----
(function () {
  var banner = document.getElementById('cookieBanner');
  if (!banner) return;

  var CONSENT_KEY = 'dlx_cookie_consent';

  function getConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }
  function setConsent(val) {
    try { localStorage.setItem(CONSENT_KEY, val); } catch (e) {}
  }

  if (!getConsent()) banner.classList.add('show');

  var acceptBtn = document.getElementById('cookieAccept');
  var rejectBtn = document.getElementById('cookieReject');
  if (acceptBtn) acceptBtn.addEventListener('click', function () { setConsent('accepted'); banner.classList.remove('show'); });
  if (rejectBtn) rejectBtn.addEventListener('click', function () { setConsent('rejected'); banner.classList.remove('show'); });
})();

// ---- "Build my campaign" contact form (FormSubmit.co) ----
(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var bizEl   = document.getElementById('business');
    var nameEl  = document.getElementById('name');
    var emailEl = document.getElementById('email');
    var hasErr  = false;

    [bizEl, nameEl, emailEl].forEach(function (f) {
      if (!f.value.trim()) { f.classList.add('error'); hasErr = true; }
      else { f.classList.remove('error'); }
    });
    if (hasErr) { bizEl.focus(); return; }

    var btn = document.getElementById('submitBtn');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    document.getElementById('formError').style.display = 'none';

    var payload = {
      'Business Name': bizEl.value.trim(),
      name:            nameEl.value.trim(),
      email:           emailEl.value.trim(),
      'Phone or Instagram':  (document.getElementById('phone') || {}).value || '',
      'What They Sell':      (document.getElementById('sells') || {}).value || '',
      Goal:                  (document.getElementById('goal') || {}).value || '',
      'Current Frustration': (document.getElementById('annoyance') || {}).value || '',
      _subject:  'New "Build My Campaign" Enquiry — DLX',
      _template: 'table'
    };

    fetch('https://formsubmit.co/ajax/support@dlxsolutions.co.uk', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body:    JSON.stringify(payload)
    })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d.success === 'true' || d.success === true) {
          form.style.display = 'none';
          document.getElementById('formSuccess').style.display = 'block';
          window.scrollTo({ top: document.getElementById('formSuccess').getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
        } else {
          throw new Error('not ok');
        }
      })
      .catch(function () {
        document.getElementById('formError').style.display = 'block';
        btn.textContent = 'Build my campaign →';
        btn.disabled = false;
      });
  });

  ['business', 'name', 'email'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('input', function () { el.classList.remove('error'); });
  });
})();

// ---- Creator application form (FormSubmit.co) ----
(function () {
  var form = document.getElementById('creatorForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var nameEl  = document.getElementById('name');
    var emailEl = document.getElementById('email');
    var hasErr  = false;

    [nameEl, emailEl].forEach(function (f) {
      if (!f.value.trim()) { f.classList.add('error'); hasErr = true; }
      else { f.classList.remove('error'); }
    });
    if (hasErr) { nameEl.focus(); return; }

    var btn = document.getElementById('submitBtn');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    document.getElementById('formError').style.display = 'none';

    var payload = {
      name:  nameEl.value.trim(),
      email: emailEl.value.trim(),
      Instagram:        (document.getElementById('instagram') || {}).value || '',
      TikTok:            (document.getElementById('tiktok') || {}).value || '',
      Location:          (document.getElementById('location') || {}).value || '',
      'Follower Range':  (document.getElementById('followers') || {}).value || '',
      Niches:            (document.getElementById('niches') || {}).value || '',
      Portfolio:         (document.getElementById('portfolio') || {}).value || '',
      _subject:  'New Creator Application — DLX',
      _template: 'table'
    };

    fetch('https://formsubmit.co/ajax/support@dlxsolutions.co.uk', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body:    JSON.stringify(payload)
    })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d.success === 'true' || d.success === true) {
          form.style.display = 'none';
          document.getElementById('formSuccess').style.display = 'block';
          window.scrollTo({ top: document.getElementById('formSuccess').getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
        } else {
          throw new Error('not ok');
        }
      })
      .catch(function () {
        document.getElementById('formError').style.display = 'block';
        btn.textContent = 'Join the creator list →';
        btn.disabled = false;
      });
  });

  ['name', 'email'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('input', function () { el.classList.remove('error'); });
  });
})();
