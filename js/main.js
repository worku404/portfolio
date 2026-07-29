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
});
