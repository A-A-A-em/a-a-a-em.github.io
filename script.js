// Navigation et gestion des sections
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Fonction pour afficher une section spécifique
    function showSection(targetId) {
        // Masquer toutes les sections
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Afficher la section cible
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Mettre à jour les liens de navigation
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Activer le lien correspondant
        const activeLink = document.querySelector(`.nav-link[href="${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Gestion des clics sur les liens de navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            showSection(targetId);
            
            // Fermer le menu mobile si ouvert
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Gestion du menu hamburger (mobile)
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fermer le menu mobile en cliquant ailleurs
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Animation des barres de compétences
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const skillsSection = document.querySelector('#skills');
        
        if (skillsSection.classList.contains('active')) {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }
    }

    // Observer pour déclencher les animations
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
            }
        });
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Gestion du formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Validation basique
            if (!name || !email || !subject || !message) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Validation email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Veuillez entrer une adresse email valide.');
                return;
            }
            
            // Simuler l'envoi du formulaire
            const submitBtn = this.querySelector('.btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            // Simulation d'un délai d'envoi
            setTimeout(() => {
                alert('Message envoyé avec succès ! Je vous répondrai bientôt.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Effet de défilement fluide pour les liens internes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                showSection(targetId);
            }
        });
    });

    // Animation au scroll pour les éléments
    function animateOnScroll() {
        const elements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .highlight-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Initialiser les styles pour l'animation
    function initAnimations() {
        const elements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .highlight-item');
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }

    // Charger les animations
    initAnimations();
    
    // Écouter le scroll pour déclencher les animations
    window.addEventListener('scroll', animateOnScroll);

    // Animation initiale pour la page d'accueil
    showSection('#home');
    
    // Déclencher l'animation des compétences quand on visite la section
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const targetId = this.getAttribute('href');
            if (targetId === '#skills') {
                setTimeout(animateSkillBars, 300);
            }
        });
    });

    // Gestion du redimensionnement de la fenêtre
    window.addEventListener('resize', function() {
        // Fermer le menu mobile en cas de redimensionnement
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Amélioration de l'accessibilité - navigation au clavier
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Fonction pour mettre à jour l'année dans le footer
    function updateFooterYear() {
        const footer = document.querySelector('footer p');
        if (footer) {
            const currentYear = new Date().getFullYear();
            footer.innerHTML = footer.innerHTML.replace(/\d{4}/, currentYear);
        }
    }
    
    updateFooterYear();
    
    // Effet de typing pour le titre principal (optionnel)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Activer l'effet de typing sur le titre principal
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Décommenter la ligne suivante pour activer l'effet de typing
        // typeWriter(heroTitle, originalText, 80);
    }

    // Gestion des liens vers les projets externes
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Remplacer par les vrais liens de vos projets
            const projectLinks = {
                0: { live: 'https://your-ecommerce-demo.com', github: 'https://github.com/your-username/ecommerce-project' },
                1: { live: 'https://your-dashboard-demo.com', github: 'https://github.com/your-username/dashboard-project' },
                2: { live: 'https://your-mobile-demo.com', github: 'https://github.com/your-username/mobile-project' }
            };
            
            // Cette partie serait à personnaliser selon vos vrais projets
            alert('Lien vers le projet - À personnaliser avec vos vraies URLs !');
        });
    });

    // Performance: Lazy loading pour les images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        // Observer toutes les images avec data-src
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    console.log('Portfolio chargé avec succès! 🚀');
});