document.addEventListener('DOMContentLoaded', () => {
    // --- EFFET MACHINE À ÉCRIRE VERSION TURBO ---
    const textElement = document.getElementById('typewriter');
    const phrases = [
        "passionné par l'administration système.",
        "passionné par l'infrastructure réseau.",
        "passionné par la cybersécurité.",
        "en quête d'excellence technique."
    ];

    let phraseIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;
    let typeSpeed = 35; 

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, characterIndex - 1);
            characterIndex--;
            typeSpeed = 15; 
        } else {
            textElement.textContent = currentPhrase.substring(0, characterIndex + 1);
            characterIndex++;
            typeSpeed = 35; 
        }

        if (!isDeleting && characterIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 800; 
        } else if (isDeleting && characterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 200; 
        }

        setTimeout(type, typeSpeed);
    }

    if (textElement) {
        type();
    }

    // --- MENU MOBILE ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('active'));
        });
    }

    // --- DÉFILEMENT FLUIDE ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const targetPosition = targetElement.offsetTop;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- BOUTON RETOUR EN HAUT ---
    const scrollToTopButton = document.getElementById('scroll-to-top');
    if (scrollToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) scrollToTopButton.classList.add('show');
            else scrollToTopButton.classList.remove('show');
        });
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- ANIMATION APPARITION TITRES ET CARTES ---
    const observerOptions = {
        threshold: 0.1 
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            } else {
                entry.target.classList.remove('reveal');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-title, .certif-card').forEach(element => {
        sectionObserver.observe(element);
    });

// --- 1. GESTION DU MODE SOMBRE (AVEC MÉMOIRE) ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        
        // Appliquer le thème sauvegardé
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (icon) icon.classList.replace('fa-moon', 'fa-sun');
        }

        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            
            if (theme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                if (icon) icon.classList.replace('fa-sun', 'fa-moon');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                if (icon) icon.classList.replace('fa-moon', 'fa-sun');
            }
        });
    }
});

// --- MESSAGE DYNAMIQUE DE L'ONGLET ---
    const originalTitle = document.title;

    window.addEventListener('blur', () => {
        document.title = "Tu n’as pas fini de regarder !";
    });

    window.addEventListener('focus', () => {
        document.title = originalTitle;
    });
	
	
	
let pattern = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']; // Version courte
let current = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === pattern[current]) {
        current++;
        if (pattern.length === current) {
            current = 0;
            alert("💻 Qu'est-ce que tu fais...");
        }
    } else {
        current = 0;
    }
	
document.addEventListener('contextmenu', () => {
        console.log("%c [ALERTE INTRUSION] %c Analyse du code source détectée...", 
            "background: red; color: white; font-weight: bold; padding: 2px 5px; border-radius: 3px;", 
            "color: red;");
    });
});


function finishLoading() {
    const loader = document.querySelector('#loader');
    if (loader) {
        loader.classList.add('loader-hidden');
        // Optionnel : on retire l'élément du DOM après l'animation pour libérer des ressources
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
}

window.addEventListener('load', () => {
    const loaderText = document.querySelector('#loader-text');
    
    if (loaderText) {
        // Logique pour l'INDEX avec messages
        const messages = [
            "Encore un petit instant...",
            "Vous y êtes presque..."
        ];
        let step = 0;

        const interval = setInterval(() => {
            if (step < messages.length) {
                loaderText.textContent = messages[step];
                step++;
            } else {
                clearInterval(interval);
                finishLoading();
            }
        }, 750);
    } else {
        // Logique pour CV et DETAILS (chargement immédiat)
        finishLoading();
    }
});


