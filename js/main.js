/* DLX Solutions Group — Main JS */

// ---- Mobile nav ----
(function () {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
    });
  }

  // Highlight active nav link
  const links = document.querySelectorAll('.nav-links a, .mobile-menu a');
  const current = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(function (link) {
    const href = link.getAttribute('href');
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

  // Show banner if no consent recorded
  if (!getConsent()) {
    banner.classList.add('show');
  }

  var acceptBtn = document.getElementById('cookieAccept');
  var rejectBtn = document.getElementById('cookieReject');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      setConsent('accepted');
      banner.classList.remove('show');
      // Only load analytics after consent
      // loadAnalytics();
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener('click', function () {
      setConsent('rejected');
      banner.classList.remove('show');
    });
  }
})();

// ---- Contact form ----
(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var message = document.getElementById('message');
    var service = document.getElementById('service');

    // Basic validation
    var hasError = false;
    [name, email, message].forEach(function (field) {
      if (field && !field.value.trim()) {
        field.style.borderColor = '#dc2626';
        hasError = true;
      } else if (field) {
        field.style.borderColor = '';
      }
    });

    if (hasError) return;

    // Build mailto
    var subject = encodeURIComponent('DLX Solutions Group Enquiry - ' + (service ? service.value : 'General'));
    var body = encodeURIComponent(
      'Name: ' + name.value + '\n' +
      'Email: ' + email.value + '\n' +
      'Service: ' + (service ? service.value : 'N/A') + '\n\n' +
      message.value
    );

    window.location.href = 'mailto:support@dlxsolutions.co.uk?subject=' + subject + '&body=' + body;

    // Show confirmation message
    var confirm = document.getElementById('formConfirm');
    if (confirm) {
      confirm.style.display = 'block';
      form.style.display = 'none';
    }
  });
})();
