window.addEventListener('scroll', function() {
    const welcomeSection = document.querySelector('.Animation-welcome');
    const scrollPosition = window.scrollY;
    
    // Faire disparaître progressivement la section welcome au défilement
    if (scrollPosition < window.innerHeight) {
        const opacity = 1 - (scrollPosition / (window.innerHeight * 0.8));
        welcomeSection.style.opacity = opacity > 0 ? opacity : 0;
    }
});

// Ajouter un bouton de défilement vers le bas (optionnel)
document.addEventListener('DOMContentLoaded', function() {
    const welcomeSection = document.querySelector('.Animation-welcome');
    
    // Créer un bouton de défilement
    const scrollDownBtn = document.createElement('div');
    scrollDownBtn.className = 'scroll-down-btn';
    scrollDownBtn.innerHTML = '↓';
    
    // Ajouter le bouton à la section welcome
    welcomeSection.appendChild(scrollDownBtn);
    
    // Ajouter l'événement de clic pour défiler vers la section suivante
    scrollDownBtn.addEventListener('click', function() {
        document.getElementById('Home').scrollIntoView({ behavior: 'smooth' });
    });
});

//-------------------------------------------------------------------------------------------------//
document.addEventListener('DOMContentLoaded', function() {
    // Pour la section welcome avec son animation déjà existante
    const welcomeSection = document.querySelector('.Animation-welcome');
    
    // Gestion du scroll down button
    const scrollDownBtn = document.createElement('div');
    scrollDownBtn.className = 'scroll-down-btn';
    scrollDownBtn.innerHTML = '↓';
    welcomeSection.appendChild(scrollDownBtn);
    
    scrollDownBtn.addEventListener('click', function() {
        document.getElementById('Home').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Animation au scroll pour toutes les autres sections
    const sections = document.querySelectorAll('.about-me, .technical-skills, .container-websites, .contact');
    
    sections.forEach(section => {
        section.classList.add('fade-in-section');
    });
    
    // Fonction qui vérifie si une section est visible
    function checkSections() {
        const triggerBottom = window.innerHeight * 0.6;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < triggerBottom) {
                section.classList.add('is-visible');
            }
        });
    }
    
    // Vérifiez au chargement initial
    checkSections();
    
    // Vérifiez lors du défilement
    window.addEventListener('scroll', checkSections);
});