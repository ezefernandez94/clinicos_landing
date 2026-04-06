/* ═══════════════════════════════════════════
   ClinicOS — main.js
   ═══════════════════════════════════════════ */

'use strict';

// ─── NAV: scroll state ────────────────────────────────
const nav = document.getElementById('nav');

function onScroll() {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load

// ─── NAV: mobile burger ───────────────────────────────
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav__links');

burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  });
});

// ─── SCROLL REVEAL ────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => observer.observe(el));

// ─── CONTACT FORM ─────────────────────────────────────
const form = document.getElementById('contact-form');
const formMsg = document.getElementById('form-msg');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name  = form.name.value.trim();
  const email = form.email.value.trim();

  if (!name || !email) {
    formMsg.textContent = 'Please fill in your name and email.';
    formMsg.style.color = '#fa9190';
    return;
  }

  // Simulate submission (replace with real endpoint)
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending…';

  setTimeout(() => {
    formMsg.textContent = '✓ Thanks! We\'ll be in touch shortly.';
    formMsg.style.color = '#86efac';
    btn.textContent = 'Sent!';
    form.reset();

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Contact Us';
      formMsg.textContent = '';
    }, 5000);
  }, 1000);
});

// ─── SMOOTH ACTIVE NAV LINK HIGHLIGHT ─────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));
