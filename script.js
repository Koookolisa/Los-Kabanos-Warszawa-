// --- HAMBURGER MENU ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        // Toggle display/class for mobile menu
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.right = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = '#111';
            navLinks.style.padding = '20px';
            navLinks.style.zIndex = '999';
        }
    });
}

// --- COUNTDOWN ---
const countdownEl = document.getElementById('countdown');
const targetDate = new Date('2026-02-01T00:00:00');

function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        countdownEl.innerText = "00:00:00:00";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdownEl.innerText =
        `${days}d ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// --- SHOP PRICE LOGIC ---
const toggles = document.querySelectorAll('.personalization-check');

toggles.forEach(toggle => {
    toggle.addEventListener('change', (e) => {
        // Find the price tag sibling in the shop item container
        // Hierarchy: toggle -> label -> div.shop-controls -> div.shop-item -> div.price-tag
        const shopItem = e.target.closest('.shop-item');
        const priceTag = shopItem.querySelector('.price-tag');
        const basePrice = parseInt(e.target.getAttribute('data-base-price'));

        if (e.target.checked) {
            priceTag.innerText = (basePrice + 1) + " PLN";
            priceTag.style.color = "var(--accent-orange)";
            priceTag.style.borderColor = "var(--accent-orange)";
        } else {
            priceTag.innerText = basePrice + " PLN";
            priceTag.style.color = "#fff";
            priceTag.style.borderColor = "#444";
        }
    });
});

// --- SCROLL REVEAL ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.shop-item, .intel-panel, .field-zone, .player-card').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});
