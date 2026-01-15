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
    let typeSpeed = 30; // Vitesse d'écriture divisée par 2 (très rapide)

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, characterIndex - 1);
            characterIndex--;
            typeSpeed = 15; // Effacement quasi instantané
        } else {
            textElement.textContent = currentPhrase.substring(0, characterIndex + 1);
            characterIndex++;
            typeSpeed = 35; // Écriture nerveuse
        }

        if (!isDeleting && characterIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 800; // Pause très courte quand la phrase est finie (0.8s)
        } else if (isDeleting && characterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 200; // Redémarrage quasi immédiat
        }

        setTimeout(type, typeSpeed);
    }

    type();
	
	
	
    // Menu mobile
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

    // Défilement fluide vers les sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = targetId === '#' ? document.body : document.querySelector(targetId);

            if (targetElement) {
                const targetPosition = targetElement.offsetTop;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Bouton retour en haut
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
});





// --- ANIMATION APPARITION TITRES (BOUCLE INFINIE) ---
    const observerOptions = {
        threshold: 0.1 // Déclenche l'animation dès que 10% du titre est visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // On ajoute la classe quand le titre entre
                entry.target.classList.add('reveal');
            } else {
                // On retire la classe quand le titre sort de l'écran
                // C'est cette ligne qui permet de rejouer l'animation au retour
                entry.target.classList.remove('reveal');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-title').forEach(title => {
        sectionObserver.observe(title);
    });
	
	
	
	
	// On réutilise le même observateur pour les cartes de certification
    document.querySelectorAll('.certif-card').forEach(card => {
        sectionObserver.observe(card);
    });
	
	
	// --- GESTION DU MODE SOMBRE ---
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    // Vérifier si l'utilisateur a déjà choisi un mode auparavant
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun'); // Change lune en soleil
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        
        if (theme === 'dark') {
            // Repasser en mode clair
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            icon.classList.replace('fa-sun', 'fa-moon');
        } else {
            // Passer en mode sombre
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    });