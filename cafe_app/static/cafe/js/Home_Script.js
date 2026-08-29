const hero = document.querySelector(".hero");

let targetX = 50;
let targetY = 50;

let currentX = 50;
let currentY = 50;


/* =========================
   MOUSE MOVEMENT
========================= */

document.addEventListener("mousemove", (e) => {

    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;

    targetX = 50 + (x - 50) * 0.08;
    targetY = 50 + (y - 50) * 0.08;

});


/* =========================
   FINGER / TOUCH MOVEMENT
========================= */

document.addEventListener("touchmove", (e) => {

    if (!e.touches.length) return;

    const touch = e.touches[0];

    const x = (touch.clientX / window.innerWidth) * 100;
    const y = (touch.clientY / window.innerHeight) * 100;

    targetX = 50 + (x - 50) * 0.12;
    targetY = 50 + (y - 50) * 0.12;

}, { passive: true });


/* =========================
   SMOOTH ANIMATION
========================= */

function animateHero() {

    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    hero.style.backgroundPosition =
        `${currentX}% ${currentY}%`;

    requestAnimationFrame(animateHero);
}

animateHero();