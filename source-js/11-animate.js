window.addEventListener('click', function (e) {
    const effects = [
        { class: 'rip-btn', handler: handleRipple },
    ];

    for (const { class: cls, handler } of effects) {
        const el = e.target.closest(`.${cls}`);
        if (el) return handler(e, el);
    }
});

function handleRipple(e, el) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    el.appendChild(ripple);

    const size = Math.max(el.offsetWidth, el.offsetHeight);
    const rect = el.getBoundingClientRect();
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    anime.animate(ripple, {
        scale: { from: 0, to: 2 },
        opacity: { from: 0.6, to: 0 },
        easing: 'outQuad',
        duration: 600
    }).then(() => ripple.remove());
}
