/* Projects Grid Renderer with exact GSAP ScrollTrigger & 3D Tilt */
export async function initProjectsGrid() {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  try {
    const response = await fetch('data/projects.json');
    const projects = await response.json();

    container.innerHTML = projects
      .map(
        (p) => `
        <div class="project-item">
          <div class="project-card" data-id="${p.id}">
            <div class="project-card-inner">
              <div class="project-bg-img" style="background-image: url('${p.imageUrl}')">
                <div class="project-overlay"></div>
              </div>
              <div class="project-content">
                <h3 class="project-title" style="color: ${p.color}">${p.title}</h3>
                <p class="project-desc">${p.description}</p>
                <div class="project-links">
                  <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-icon-btn" aria-label="GitHub Repository">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                  ${
                    p.liveUrl
                      ? `<a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-live">
                          Live Demo
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                        </a>`
                      : ''
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      `
      )
      .join('');

    // Attach 3D Mouse Perspective Tilt Effect
    document.querySelectorAll('.project-card').forEach((card) => {
      const inner = card.querySelector('.project-card-inner');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        if (typeof gsap !== 'undefined') {
          gsap.to(inner, {
            rotationY: x * 20,
            rotationX: -y * 20,
            ease: 'power3.out',
            duration: 0.5,
          });
        } else {
          inner.style.transform = `rotateY(${x * 20}deg) rotateX(${-y * 20}deg)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        if (typeof gsap !== 'undefined') {
          gsap.to(inner, {
            rotationY: 0,
            rotationX: 0,
            ease: 'power3.out',
            duration: 0.5,
          });
        } else {
          inner.style.transform = 'rotateY(0deg) rotateX(0deg)';
        }
      });
    });

    // GSAP ScrollTrigger Scroll Fade In Animation
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      const projectItems = gsap.utils.toArray('.project-item');

      projectItems.forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 100,
          duration: 1,
          ease: 'power4.out',
          delay: i * 0.1,
        });
      });
    }
  } catch (err) {
    console.error('Failed to load projects:', err);
  }
}
