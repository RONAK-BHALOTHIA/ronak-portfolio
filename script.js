// Mobile nav toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
 
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });
 
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}
 
// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');
 
const setActiveLink = (id) => {
  navItems.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
  });
};
 
if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });
 
  sections.forEach(section => observer.observe(section));
}
 
// Hero terminal typing effect (single, one-time entrance moment)
const typedEl = document.getElementById('typed-status');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 
if (typedEl) {
  const text = 'open to internships';
 
  if (reduceMotion) {
    typedEl.textContent = `"${text}"`;
  } else {
    let i = 0;
    typedEl.textContent = '"';
    const type = () => {
      if (i < text.length) {
        typedEl.textContent = `"${text.slice(0, i + 1)}`;
        i++;
        setTimeout(type, 45);
      } else {
        typedEl.textContent = `"${text}"`;
      }
    };
    setTimeout(type, 500);
  }
}
 

// Custom cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

if (cursorDot && cursorRing && window.matchMedia('(hover: hover)').matches) {
  let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  const animateRing = () => {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    requestAnimationFrame(animateRing);
  };
  animateRing();

  document.querySelectorAll('a, button, .skill-row, .project-row, .contact-row').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
  });
}