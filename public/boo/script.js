const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const valentinesCard = document.getElementById('valentines-card');
const successState = document.getElementById('success-state');

// Evasion threshold in pixels
const THRESHOLD = 100;

let isFixed = false;

document.addEventListener('mousemove', (e) => {
    const btnRect = noBtn.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    const dx = e.clientX - btnCenterX;
    const dy = e.clientY - btnCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < THRESHOLD) {
        moveButton(e.clientX, e.clientY);
    }
});

function moveButton(mouseX, mouseY) {
    if (!isFixed) {
        const rect = noBtn.getBoundingClientRect();

        // Move button to body to avoid containing block issues with the card
        // This ensures the button stays relative to the viewport
        document.body.appendChild(noBtn);

        noBtn.style.position = 'fixed';
        noBtn.style.width = `${rect.width}px`;
        noBtn.style.height = `${rect.height}px`;
        noBtn.style.left = `${rect.left}px`;
        noBtn.style.top = `${rect.top}px`;
        noBtn.style.margin = '0';
        noBtn.style.zIndex = '9999';
        isFixed = true;
    }
    setNewPosition(mouseX, mouseY);
}

function setNewPosition(mouseX, mouseY) {
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    const padding = 20;

    // Use documentElement client dimensions for maximum reliability
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;

    let newX, newY;
    let attempts = 0;

    do {
        // Random position within actual visible viewport
        newX = Math.random() * (vw - btnWidth - padding * 2) + padding;
        newY = Math.random() * (vh - btnHeight - padding * 2) + padding;

        // Ensure distance from mouse
        const dist = Math.sqrt(Math.pow(newX + btnWidth / 2 - mouseX, 2) + Math.pow(newY + btnHeight / 2 - mouseY, 2));
        if (dist > THRESHOLD * 2) break;
        attempts++;
    } while (attempts < 20);

    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
}

yesBtn.addEventListener('click', () => {
    valentinesCard.classList.add('hidden');
    successState.classList.remove('hidden');

    // Hide the No button (which might be detached from the card)
    noBtn.style.display = 'none';

    // Trigger full-screen confetti
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    console.log("She said YES! ❤️");
});

// Prevent clicking via keyboard or other means
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveButton(0, 0); // Move away if they somehow click it
});
