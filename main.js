document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // 2. Scroll Reveal Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.reveal');
    hiddenElements.forEach((el) => observer.observe(el));

    // 3. Player Highlight Logic
    // Po kliknięciu w kropkę, karta gracza mignie, żeby było widać o kogo chodzi
    const playerDots = document.querySelectorAll('.player-dot');
    
    playerDots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            // Pobieramy ID celu z atrybutu href (np. #card-9)
            const targetId = this.getAttribute('href').substring(1);
            const targetCard = document.getElementById(targetId);

            if(targetCard) {
                // Usuwamy klasę highlight ze wszystkich kart
                document.querySelectorAll('.player-card').forEach(c => c.classList.remove('highlight'));
                
                // Dodajemy do wybranej po małym opóźnieniu (żeby scroll zdążył ruszyć)
                setTimeout(() => {
                    targetCard.classList.add('highlight');
                    // Usuwamy podświetlenie po 2 sekundach
                    setTimeout(() => {
                        targetCard.classList.remove('highlight');
                    }, 2000);
                }, 100);
            }
        });
    });
});
