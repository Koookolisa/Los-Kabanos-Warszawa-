document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Link Dots to Cards
    document.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if(href && href.startsWith('#')) {
                const id = href.substring(1);
                const card = document.getElementById(id);
                if(card) {
                    document.querySelectorAll('.player-card').forEach(c => c.classList.remove('highlight'));
                    setTimeout(() => {
                        card.classList.add('highlight');
                        setTimeout(() => card.classList.remove('highlight'), 2000);
                    }, 100);
                }
            }
        });
    });

    // No Chart.js - Pure CSS Bars are used now.
});
