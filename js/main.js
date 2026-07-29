/* Main Application Orchestrator */
import { initTheme } from './utils/theme.js';
import { initCursor } from './components/cursor.js';
import { initScrollProgress } from './components/scroll-progress.js';
import { initNavbar } from './components/navbar.js';
import { initProjectsGrid } from './components/project-grid.js';
import { initRunnerGame } from './components/runner-game.js';
import { initContactMe } from './components/contact-me.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCursor();
  initScrollProgress();
  initNavbar();
  initProjectsGrid();
  initRunnerGame();
  initContactMe();

  // Global GSAP Bottom-Up Scroll Fade-In Animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const scrollTargets = document.querySelectorAll(
      '.about-left, .about-right, .stat-card, .section-header, .game-header, .contact-info, .contact-form-card'
    );

    scrollTargets.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top bottom-=60',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
      });
    });
  }
});
