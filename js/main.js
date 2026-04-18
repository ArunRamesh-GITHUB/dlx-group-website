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

// ---- Nav shadow on scroll ----
(function () {
  var navEl = document.querySelector('nav');
  if (!navEl) return;
  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      navEl.classList.add('nav-scrolled');
    } else {
      navEl.classList.remove('nav-scrolled');
    }
  }, { passive: true });
})();

// ---- Scroll-triggered animations ----
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Section text elements (exclude hero — it uses CSS keyframes instead)
  var textSelectors = [
    '.section .section-eyebrow',
    '.section .section-title',
    '.section h2',
    '.section .section-sub',
    '.cta-section h2',
    '.cta-section p',
    '.solution-meta h3',
    '.solution-meta p',
    '.usp-content h2',
    '.usp-content p',
    '.hero-inner > div > h1',  // handled by index.html css, skip
  ];

  textSelectors.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      if (!el.closest('.hero') && !el.classList.contains('anim-up')) {
        el.classList.add('anim-up');
      }
    });
  });

  // Grid / list children — staggered entrance
  var gridSelectors = [
    '.services-grid',
    '.systems-grid',
    '.leak-grid',
    '.feature-grid',
    '.industries-grid',
    '.metrics-grid',
    '.pain-grid',
    '.stat-grid',
    '.include-grid',
    '.outcomes-list',
    '.value-list',
    '.steps',
    '.does-grid',
    '.pricing-grid',
    '.usp-cards',
    '.footer-top > div',
  ];

  gridSelectors.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (container) {
      Array.from(container.children).forEach(function (child, i) {
        if (!child.classList.contains('anim-up')) {
          child.classList.add('anim-up');
          child.style.transitionDelay = Math.min(i * 0.08, 0.48) + 's';
        }
      });
    });
  });

  // Observe everything
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  document.querySelectorAll('.anim-up').forEach(function (el) {
    observer.observe(el);
  });
})();
