document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector('.slider');
    const cards = document.querySelectorAll('.slider .card');
    let currentIndex = 0;

    function showCard(index) {
        cards.forEach((card, i) => {
            card.style.transform = `translateX(${(i - index) * 25}%)`;
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        showCard(currentIndex);
    }

    // Iniciar el carrusel automático cada cinco segundos
    setInterval(nextSlide, 5000);
});