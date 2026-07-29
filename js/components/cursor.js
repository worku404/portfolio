/* Custom Mouse Cursor Follower & CSS 3D Cube Mouse Parallax */
export function initCursor() {
  const cursor = document.getElementById('custom-cursor');
  const dot = document.getElementById('custom-cursor-dot');
  const iconGroup = document.getElementById('floating-icons');
  const cssCube = document.getElementById('css-cube');
  const glowAura = document.getElementById('cube-glow-aura');

  if (!cursor || !dot) return;

  let mouseX = -100, mouseY = -100;
  let cursorX = -100, cursorY = -100;
  let targetX = 0, targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;

    // Normalized mouse coordinates from -0.5 to 0.5
    const nx = e.clientX / window.innerWidth - 0.5;
    const ny = e.clientY / window.innerHeight - 0.5;

    // Floating icons micro-shift matching useParallax(1.5) in live app (max 1.5px)
    if (iconGroup) {
      iconGroup.style.transform = `translate3d(${nx * 1.5}px, ${ny * 1.5}px, 0)`;
    }

    targetX = nx * 35;
    targetY = ny * 35;
  });

  function animate() {
    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    // Move CSS 3D Cube and background glow aura dynamically with cursor
    if (cssCube && glowAura) {
      cssCube.style.transform = `translate3d(${targetX * 0.8}px, ${targetY * 0.8}px, 0) rotateX(${25 - targetY * 0.5}deg) rotateY(${targetX * 0.7}deg)`;
      glowAura.style.transform = `translate3d(${targetX * 1.4}px, ${targetY * 1.4}px, 0)`;
    }

    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('mouseover', (e) => {
    const target = e.target;
    if (
      target.tagName.toLowerCase() === 'a' ||
      target.tagName.toLowerCase() === 'button' ||
      target.closest('button') ||
      target.closest('a') ||
      target.classList.contains('project-card') ||
      target.closest('.project-card')
    ) {
      cursor.classList.add('hover');
      dot.classList.add('hover');
    } else {
      cursor.classList.remove('hover');
      dot.classList.remove('hover');
    }
  });
}
