/* Projects Grid Renderer with Direct Inline Data & GSAP 3D Tilt */
const PROJECTS = [
  {
    "id": "1",
    "title": "NextGen Academy — E-Learning Platform",
    "description": "Full-featured online learning management system with course catalog, progress tracking, live chat, interactive notes, dashboards, and an AI study assistant.",
    "imageUrl": "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80",
    "color": "#10b981",
    "githubUrl": "https://github.com/worku404/worku-lms",
    "liveUrl": "https://nextgen.southafricanorth.cloudapp.azure.com"
  },
  {
    "id": "2",
    "title": "My Shop — Django E-Commerce Platform",
    "description": "Production-ready e-commerce platform featuring  localized storefronts, cart and coupon logic, weighted shipping, Stripe checkout, webhook-based payment verification, invoice generation, and asynchronous processing with Celery",
    "imageUrl": "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80",
    "color": "#22d3ee",
    "githubUrl": "https://github.com/worku404/Online-Shop"
  },
  {
    "id": "3",
    "title": "Gold Blog — Django Blog Platform",
    "description": "Full-featured publishing platform with markdown rendering, PostgreSQL trigram search, tagging, comments, RSS feeds, and AI chat assistant integration.",
    "imageUrl": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    "color": "#a855f7",
    "githubUrl": "https://github.com/worku404/django-blog-platform"
  },
  {
    "id": "4",
    "title": "W-Mark — Bookmarking Application",
    "description": "Web bookmarking tool with email authentication, Google OAuth2, automatic image thumbnail generation, and user activity tracking.",
    "imageUrl": "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80",
    "color": "#3b82f6",
    "githubUrl": "https://github.com/worku404/W-Mark"
  }
];

export function initProjectsGrid() {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  container.innerHTML = PROJECTS
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
          start: 'top bottom-=50',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: 'power3.out',
        delay: i * 0.1,
      });
    });
  }
}
