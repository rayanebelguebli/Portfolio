document.addEventListener('DOMContentLoaded', () => {
    initFilterButtons();
    initMenuToggle();
    initSmoothScrolling();
    initTypingEffect();
    injectRevealStyles();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', revealOnScroll);
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('scroll', checkSkillsVisibility);
});

function initFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            projectCards.forEach(card => {
                // Cacher ou afficher la carte selon le filtre
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hidden');
                    // Forcer la révélation de la carte visible immédiatement
                    setTimeout(() => {
                        card.classList.add('revealed');
                    }, 10);
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('revealed');
                }
            });
        });
    });
}

function initMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.getElementById('menu');

    if (!menuToggle || !menu) return;

    menuToggle.addEventListener('click', () => menu.classList.toggle('active'));

    document.querySelectorAll('#menu a').forEach(link => {
        link.addEventListener('click', () => menu.classList.remove('active'));
    });

    document.addEventListener('click', event => {
        if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
            menu.classList.remove('active');
        }
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
            }
        });
    });
}

function handleScroll() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        nav.style.background = 'rgba(10, 10, 10, 0.9)';
        nav.style.boxShadow = 'none';
    }
}

function revealOnScroll() {
    const revealElements = document.querySelectorAll('.section-title, .about-content, .timeline-item, .skills-category, .project-card:not(.hidden), .experience-item, .contact-item');
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        element.classList.toggle('revealed', elementTop < windowHeight - revealPoint);
    });
}

function injectRevealStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .section-title, .about-content, .timeline-item, .skills-category, .project-card, .experience-item, .contact-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .section-title.revealed, .about-content.revealed, .timeline-item.revealed, 
        .skills-category.revealed, .project-card.revealed, 
        .experience-item.revealed, .contact-item.revealed {
            opacity: 1;
            transform: translateY(0);
        }

        .timeline-item:nth-child(2) { transition-delay: 0.2s; }
        .timeline-item:nth-child(3) { transition-delay: 0.4s; }
        .skills-category:nth-child(2) { transition-delay: 0.2s; }
        .skills-category:nth-child(3) { transition-delay: 0.4s; }
        .skills-category:nth-child(4) { transition-delay: 0.6s; }
        .project-card:nth-child(2) { transition-delay: 0.2s; }
        .project-card:nth-child(3) { transition-delay: 0.4s; }
        
        /* Masquer les éléments avec la classe hidden */
        .hidden {
            display: none !important;
        }
    `;
    document.head.appendChild(style);
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');

    skillBars.forEach(bar => {
        const progress = bar.querySelector('.skill-progress');
        const width = progress.style.width;
        progress.style.width = '0';

        setTimeout(() => {
            progress.style.transition = 'width 1.5s ease-in-out';
            progress.style.width = width;
        }, 200);
    });
}

let skillsAnimated = false;
function checkSkillsVisibility() {
    if (skillsAnimated) return;

    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const sectionTop = skillsSection.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight * 0.75) {
        animateSkillBars();
        skillsAnimated = true;
    }
}

function typeEffect(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = "";

    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

function initTypingEffect() {
    const subtitle = document.querySelector('.hero-content p');
    if (!subtitle) return;

    const originalText = subtitle.textContent;
    setTimeout(() => typeEffect(subtitle, originalText, 70), 500);
}