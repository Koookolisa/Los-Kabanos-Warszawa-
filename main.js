document.addEventListener('DOMContentLoaded', () => {
    
    // Hamburger Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Reveal Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    // Player Interaction
    const playerDots = document.querySelectorAll('.player-dot');
    
    playerDots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetCard = document.getElementById(targetId);

            if(targetCard) {
                document.querySelectorAll('.player-card').forEach(c => c.classList.remove('highlight'));
                
                setTimeout(() => {
                    targetCard.classList.add('highlight');
                    setTimeout(() => {
                        targetCard.classList.remove('highlight');
                    }, 2000);
                }, 100);
            }
        });
    });
});
