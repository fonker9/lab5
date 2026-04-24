// Working Process
document.addEventListener('DOMContentLoaded', function() {
    const processItems = document.querySelectorAll('.process__item');
    
    // Функция для закрытия всех блоков кроме указанного
    const closeAllExcept = (currentItem) => {
        processItems.forEach(item => {
            if (item !== currentItem && item.classList.contains('process__item--active')) {
                item.classList.remove('process__item--active');
                const toggleIcon = item.querySelector('.process__item-toggle-icon');
                toggleIcon.textContent = '+';
            }
        });
    };
    
    processItems.forEach(item => {
        const header = item.querySelector('.process__item-header');
        const toggleButton = item.querySelector('.process__item-toggle');
        const toggleIcon = item.querySelector('.process__item-toggle-icon');
        
        // Функция для переключения текущего элемента
        const toggleItem = () => {
            const isActive = item.classList.contains('process__item--active');
            
            if (isActive) {
                // Если блок уже открыт - просто закрываем его
                item.classList.remove('process__item--active');
                toggleIcon.textContent = '+';
            } else {
                // Закрываем все другие блоки
                closeAllExcept(item);
                // Открываем текущий блок
                item.classList.add('process__item--active');
                toggleIcon.textContent = '−';
            }
        };
        
        // Клик по заголовку (но не по кнопке)
        header.addEventListener('click', function(e) {
            // Проверяем, не кликнули ли по самой кнопке (чтобы избежать двойного срабатывания)
            if (e.target.closest('.process__item-toggle')) return;
            toggleItem();
        });
        
        // Клик по кнопке
        toggleButton.addEventListener('click', function(e) {
            e.stopPropagation(); // Предотвращаем всплытие события
            toggleItem();
        });
    });
});

