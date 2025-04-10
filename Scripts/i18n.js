document.addEventListener('DOMContentLoaded', function() {
    // Initialiser i18next directement avec les traductions intégrées
    i18next
        .use(i18nextBrowserLanguageDetector)
        .init({
            fallbackLng: 'en',
            debug: true,
            detection: {
                order: ['localStorage', 'navigator'],
                caches: ['localStorage']
            },
            resources: {
                en: {
                    translation: {
                        "header": {
                            "home": "Home",
                            "projects": "Projects",
                            "contact": "Contact",
                            "cv": "Resume"
                        },
                        "welcome": {
                            "title": "Welcome",
                            "subtitle": "to Gwenaëlle Techer's Portfolio"
                        },
                        "about": {
                            "title": "Who Am I?",
                            "text": "Hi, I'm a fullstack developer with a passion for frontend development. I've built a strong foundation in web technologies including HTML, CSS, and JavaScript for creating responsive and engaging user interfaces. As a beginner, I have foundational knowledge in Java and PHP, which allows me to start building server-side applications and understand the basics of database management."
                        },
                        "skills": {
                            "title": "Technical skills"
                        },
                        "projects": {
                            "title": "Projects",
                            "robbie_lens_description": "A photography portfolio website showcasing Robbie Lens's work.",
                            "tippy_type_description": "A typing speed test application to improve your typing skills."
                        },
                        "contact": {
                            "title": "Contact",
                            "or": "or",
                            "send_email": "Send email",
                            "call_me": "Call me"
                        },
                        "footer": {
                            "copyright": "Developed and designed by Gwenaëlle Techer"
                        },
                        "language": {
                            "switch": "FR"
                        }
                    }
                },
                fr: {
                    translation: {
                        "header": {
                            "home": "Accueil",
                            "projects": "Projets",
                            "contact": "Contact",
                            "cv": "CV"
                        },
                        "welcome": {
                            "title": "Bienvenue",
                            "subtitle": "sur le Portfolio de Gwenaëlle Techer"
                        },
                        "about": {
                            "title": "Qui suis-je ?",
                            "text": "Bonjour, je suis une développeuse fullstack passionnée par le développement frontend. J'ai établi une solide base dans les technologies web, notamment HTML, CSS et JavaScript pour créer des interfaces utilisateur réactives et engageantes. En tant que débutante, j'ai des connaissances fondamentales en Java et PHP, ce qui me permet de commencer à construire des applications côté serveur et à comprendre les bases de la gestion de bases de données."
                        },
                        "skills": {
                            "title": "Compétences techniques"
                        },
                        "projects": {
                            "title": "Projets",
                            "robbie_lens_description": "Un site web portfolio de photographie présentant le travail de Robbie Lens.",
                            "tippy_type_description": "Une application de test de vitesse de frappe pour améliorer vos compétences en dactylographie."
                        },
                        "contact": {
                            "title": "Contact",
                            "or": "ou",
                            "send_email": "Envoyez moi un email",
                            "call_me": "Appelez moi"
                        },
                        "footer": {
                            "copyright": "Développé et designé par Gwenaëlle Techer"
                        },
                        "language": {
                            "switch": "EN"
                        }
                    }
                }
            }
        }, function(err, t) {
            if (err) {
                console.error("Erreur d'initialisation i18next:", err);
                return;
            }
            
            console.log("i18next initialisé avec succès. Langue actuelle:", i18next.language);
            
            // Charger les préférences de langue sauvegardées
            const savedLang = localStorage.getItem('preferredLanguage');
            if (savedLang) {
                console.log("Langue sauvegardée trouvée:", savedLang);
                i18next.changeLanguage(savedLang, function() {
                    updateContent(savedLang);
                });
            } else {
                updateContent(i18next.language);
            }
            
            setupLanguageToggle();
        });

    function updateContent(language) {
        console.log("Mise à jour du contenu pour la langue:", language);
        
        // Mettre à jour tous les éléments avec attribut data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = i18next.t(key);
        });

        // Mise à jour du drapeau
        const flagImg = document.getElementById('language-flag');
        if (flagImg) {
            // IMPORTANT: Si on est en français, montrer le drapeau britannique
            // Si on est en anglais, montrer le drapeau français
            if (language === 'fr') {
                flagImg.src = 'Images/icons8-grande-bretagne-50.png';
                flagImg.alt = 'Switch to English';
            } else {
                flagImg.src = 'Images/icons8-la-france-50.png';
                flagImg.alt = 'Passer en français';
            }
            console.log("Drapeau mis à jour pour la langue " + language + ":", flagImg.src);
        } else {
            console.error("Élément #language-flag non trouvé!");
        }

        // Mise à jour du texte du bouton (EN/FR)
        const langText = document.querySelector('[data-i18n="language.switch"]');
        if (langText) {
            langText.textContent = i18next.t('language.switch');
        }
    }

    function setupLanguageToggle() {
        const languageToggle = document.getElementById('language-toggle');
        
        if (!languageToggle) {
            console.error("Élément #language-toggle non trouvé!");
            return;
        }
        
        console.log("Configuration du bouton de langue.");
        
        languageToggle.addEventListener('click', function() {
            console.log("Bouton de langue cliqué!");
            
            const currentLang = i18next.language;
            console.log("Langue actuelle:", currentLang);
            
            const newLang = currentLang === 'fr' ? 'en' : 'fr';
            console.log("Changement de langue vers:", newLang);
            
            i18next.changeLanguage(newLang, function(err, t) {
                if (err) {
                    console.error("Erreur lors du changement de langue:", err);
                    return;
                }
                
                console.log("Langue changée avec succès en:", newLang);
                updateContent(newLang);
                localStorage.setItem('preferredLanguage', newLang);
            });
        });
    }
});