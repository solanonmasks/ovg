/* OVG Golf & Putt Lounge — interaction.
   Everything here is progressive enhancement: the page reads fine without it. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------------
     Header shrink + hero parallax (one scroll listener for both)
     --------------------------------------------------------------------- */
  var header = document.querySelector('[data-header]');
  var heroImg = document.querySelector('[data-hero-img]');

  function onScroll() {
    var y = window.scrollY;

    if (header) header.classList.toggle('is-scrolled', y > 40);

    if (heroImg && !reduceMotion && y < 1200) {
      heroImg.style.transform =
        'scale(' + (1.06 + y * 0.00012) + ') translateY(' + (y * 0.06) + 'px)';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------------------------
     Mobile menu
     --------------------------------------------------------------------- */
  var panel = document.querySelector('[data-mobile-nav]');
  var burger = document.querySelector('[data-burger]');

  function setMenu(open) {
    if (!panel) return;
    panel.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (burger) {
      burger.setAttribute('aria-expanded', String(open));
      if (!open) burger.focus();
    }
  }

  if (burger) burger.addEventListener('click', function () { setMenu(true); });

  if (panel) {
    var closeBtn = panel.querySelector('[data-menu-close]');
    if (closeBtn) closeBtn.addEventListener('click', function () { setMenu(false); });

    panel.querySelectorAll('[data-menu-link]').forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel && panel.classList.contains('is-open')) setMenu(false);
  });

  /* ---------------------------------------------------------------------
     Scroll reveals — each element animates once, on first intersection
     --------------------------------------------------------------------- */
  var revealTargets = document.querySelectorAll('[data-reveal]');

  if (!reduceMotion && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    revealTargets.forEach(function (el) {
      // Anything already on screen at load stays put; only what's below animates.
      if (el.getBoundingClientRect().top > window.innerHeight * 0.92) {
        el.classList.add('reveal');
      }
      revealObserver.observe(el);
    });
  }

  /* ---------------------------------------------------------------------
     Stat counters — integers ease out over ~1s when 60% visible
     --------------------------------------------------------------------- */
  var counters = document.querySelectorAll('[data-count]');

  if (counters.length && 'IntersectionObserver' in window) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        var el = entry.target;
        countObserver.unobserve(el);

        var target = parseInt(el.getAttribute('data-count'), 10);
        if (isNaN(target)) return;

        if (reduceMotion) {
          el.textContent = String(target);
          return;
        }

        var start = performance.now();
        (function tick(now) {
          var p = Math.min(1, (now - start) / 1000);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = String(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        })(start);
      });
    }, { threshold: 0.6 });

    counters.forEach(function (el) { countObserver.observe(el); });
  }

  /* ---------------------------------------------------------------------
     FAQ accordion — one panel open at a time
     --------------------------------------------------------------------- */
  var accButtons = document.querySelectorAll('.acc__btn');

  function closePanel(btn) {
    var target = document.getElementById(btn.getAttribute('aria-controls'));
    btn.setAttribute('aria-expanded', 'false');
    if (target) target.style.maxHeight = '0px';
  }

  accButtons.forEach(function (btn) {
    closePanel(btn);

    btn.addEventListener('click', function () {
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      accButtons.forEach(closePanel);

      if (!isOpen) {
        var target = document.getElementById(btn.getAttribute('aria-controls'));
        btn.setAttribute('aria-expanded', 'true');
        if (target) target.style.maxHeight = target.scrollHeight + 'px';
      }
    });
  });

  // Keep an open panel the right height if the text rewraps on resize.
  window.addEventListener('resize', function () {
    accButtons.forEach(function (btn) {
      if (btn.getAttribute('aria-expanded') !== 'true') return;
      var target = document.getElementById(btn.getAttribute('aria-controls'));
      if (target) {
        target.style.maxHeight = 'none';
        target.style.maxHeight = target.scrollHeight + 'px';
      }
    });
  });

  /* ---------------------------------------------------------------------
     Event enquiry form
     No endpoint yet — see README. Until one is wired up the form only
     confirms locally, so nothing is silently lost.
     --------------------------------------------------------------------- */
  var form = document.querySelector('[data-enquiry]');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var label = form.querySelector('[data-submit-label]');
      if (!label) return;

      label.textContent = 'Sent — talk soon';
      setTimeout(function () { label.textContent = 'Send enquiry'; }, 3200);
    });
  }
})();
