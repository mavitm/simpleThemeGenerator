window.addEventListener('load', function () {
    const { animate } = anime;

    document.querySelector('.rip-btn').addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);

        const size = Math.max(this.offsetWidth, this.offsetHeight);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = e.offsetX - size / 2 + 'px';
        ripple.style.top = e.offsetY - size / 2 + 'px';

        animate(ripple, {
            scale: { from: 0, to: 2 },
            opacity: { from: 0.6, to: 0 },
            ease: 'outQuad',
            duration: 600
        }).then(() => ripple.remove());
    });
});