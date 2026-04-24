// Карусель
document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('testimonialsTrack');
    const slides = Array.from(document.querySelectorAll('.testimonials__slide'));
    const nextBtn = document.getElementById('nextTestimonial');
    const prevBtn = document.getElementById('prevTestimonial');
    const dotsContainer = document.querySelector('.testimonials__dots');
    const sliderBox = document.querySelector('.testimonials__box');

    if (!track || slides.length === 0 || !nextBtn || !prevBtn || !sliderBox) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    let slideWidth, gap = 30;

    // Функция для пересчета размеров
    function recalculateSizes() {
        slideWidth = slides[0].offsetWidth;
    }

    // Создаем точки
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('testimonials__dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    // Функция для расчета смещения
    function getOffsetForIndex(index) {
        recalculateSizes();
        
        // Смещение для центрирования определенного слайда
        // Мы хотим, чтобы слайд с индексом index был вторым (по центру) из трех видимых
        const containerWidth = sliderBox.offsetWidth;
        const visibleSlides = 3;
        
        // Центр контейнера
        const containerCenter = containerWidth / 2;
        
        // Позиция левого края целевого слайда
        const targetSlideLeft = index * (slideWidth + gap);
        
        // Центр целевого слайда
        const slideCenter = targetSlideLeft + (slideWidth / 2);
        
        // Смещение, чтобы центр целевого слайда оказался в центре контейнера
        return containerCenter - slideCenter;
    }

    // Функция обновления карусели
    function updateCarousel(animate = true) {
        if (!animate) {
            track.style.transition = 'none';
        }
        
        const offset = getOffsetForIndex(currentIndex);
        track.style.transform = `translateX(${offset}px)`;
        
        if (!animate) {
            setTimeout(() => {
                track.style.transition = 'transform 0.5s ease-in-out';
            }, 50);
        }

        // Обновляем точки
        const dots = document.querySelectorAll('.testimonials__dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Переход к слайду
    function goToSlide(index) {
        if (index < 0) {
            currentIndex = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        updateCarousel(true);
    }

    // Обработчики кнопок
    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });

    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });

    // Автопрокрутка
    let autoScrollInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 4000);

    sliderBox.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });

    sliderBox.addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 4000);
    });

    // Адаптивность
    window.addEventListener('resize', () => {
        updateCarousel(false);
    });

    // Инициализация
    setTimeout(() => {
        recalculateSizes();
        updateCarousel(false);
    }, 100);
});