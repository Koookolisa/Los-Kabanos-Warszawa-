// --- HAMBURGER MENU ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// --- COUNTDOWN ---
const countdownEl = document.getElementById('countdown');
// Set date to February 2026
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

// --- INTERACTIVE RINK ---
const dots = document.querySelectorAll('.dot');
const cards = document.querySelectorAll('.player-card');

dots.forEach(dot => {
    dot.addEventListener('mouseenter', () => {
        const targetId = dot.getAttribute('data-target');
        if (targetId) {
            const card = document.getElementById(targetId);
            if (card) {
                card.classList.add('highlight');
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    dot.addEventListener('mouseleave', () => {
        cards.forEach(c => c.classList.remove('highlight'));
    });
});

// --- PIN SYSTEM ---
const personnelBtn = document.getElementById('personnel-btn');
const authModal = document.getElementById('auth-modal');
const secureModal = document.getElementById('secure-modal');
const closeModalBtns = document.querySelectorAll('.close-modal');
const pinInput = document.getElementById('pin-input');

let currentPin = "";
const CORRECT_PIN = "0981";

personnelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    authModal.classList.remove('hidden');
    currentPin = "";
    pinInput.value = "";
});

closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        authModal.classList.add('hidden');
        secureModal.classList.add('hidden');
    });
});

window.addPin = function(val) {
    if (val === 'C') {
        currentPin = "";
        pinInput.value = "";
        return;
    }

    if (val === 'OK') {
        if (currentPin === CORRECT_PIN) {
            authModal.classList.add('hidden');
            secureModal.classList.remove('hidden');
        } else {
            pinInput.style.borderColor = "red";
            setTimeout(() => pinInput.style.borderColor = "#333", 500);
            currentPin = "";
            pinInput.value = "ERR";
            setTimeout(() => pinInput.value = "", 500);
        }
        return;
    }

    if (currentPin.length < 4) {
        currentPin += val;
        pinInput.value = currentPin.replace(/./g, '•');
    }
};

// --- SCROLL REVEAL (Simple) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.arena-box, .player-card, .intel-panel').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});
