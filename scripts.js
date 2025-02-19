document.addEventListener('DOMContentLoaded', function () {
    const dots = Array.from(document.querySelectorAll('.small_dot'));
    const visibleDots = new Set();
    const minVisible = 5;

    const vacancyLeftButton = document.getElementById('left_vacancy');
    const vacancyRightButton = document.getElementById('right_vacancy');
    const vacancyContainer = document.querySelector('.vacancy-cards');

    vacancyLeftButton.addEventListener('click', () => {
        vacancyContainer.scrollBy({ left: -580, behavior: 'smooth' });
      });
    
      vacancyRightButton.addEventListener('click', () => {
        vacancyContainer.scrollBy({ left: 580, behavior: 'smooth' });
    });

    const leftButton1 = document.getElementById('left_but1');
    const rightButton1 = document.getElementById('right_but1');
    const leftButton2 = document.getElementById('left_but2');
    const rightButton2 = document.getElementById('right_but2');
    const cardsContainer = document.querySelector('.feedback-cards');

    // Обработчик для первой группы кнопок
    leftButton1.addEventListener('click', () => {
        cardsContainer.scrollBy({ left: -580, behavior: 'smooth' });
    });

    rightButton1.addEventListener('click', () => {
        cardsContainer.scrollBy({ left: 580, behavior: 'smooth' });
    });

    // Обработчик для второй группы кнопок
    leftButton2.addEventListener('click', () => {
        cardsContainer.scrollBy({ left: -340, behavior: 'smooth' });
    });

    rightButton2.addEventListener('click', () => {
        cardsContainer.scrollBy({ left: 340, behavior: 'smooth' });
    });

    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    function animateOnScroll() {
        const boxes = document.querySelectorAll('.single_box');
    
        boxes.forEach(box => {
            if (isInViewport(box)) {
                box.classList.add('show');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    function getRandomDots(array, count) {
        let shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    function showDots() {
        if (visibleDots.size < minVisible) {
            let needed = minVisible - visibleDots.size;
            let newDots = getRandomDots(dots.filter(dot => !visibleDots.has(dot)), needed);
            newDots.forEach(dot => {
                visibleDots.add(dot);
                dot.style.opacity = '1';
            });
        }

        let countToShow = Math.random() < 0.5 ? 2 : 3;
        let newDots = getRandomDots(dots.filter(dot => !visibleDots.has(dot)), countToShow);
        
        newDots.forEach(dot => {
            visibleDots.add(dot);
            dot.style.opacity = '1';
        });

        setTimeout(hideDots, 1000);
    }

    function hideDots() {
        let countToHide = Math.random() < 0.5 ? 1 : 2;
        let dotsToHide = getRandomDots([...visibleDots], countToHide);

        dotsToHide.forEach(dot => {
            dot.style.opacity = '0';
            visibleDots.delete(dot);
        });

        setTimeout(showDots, 800);
    }

    dots.forEach(dot => {
        dot.style.opacity = '0';
        dot.style.transform = 'scale(1)';
    });

    showDots();

    //модалка
    const menuToggle = document.getElementById("menuToggle");
    const modal = document.getElementById("modalMenu");
    const closeModal = document.querySelector(".close-modal");
    
    // Открытие модального окна
    menuToggle.addEventListener("click", () => {
        modal.classList.add("show");
        document.body.classList.add("no-scroll");
    });
    
    // Закрытие модального окна при клике на крестик
    closeModal.addEventListener("click", () => {
        modal.classList.remove("show");
        document.body.classList.remove("no-scroll");
    });
    
    // Закрытие модального окна при клике внутри содержимого, но не на ссылке
    modal.addEventListener("click", (event) => {
        if (event.target !== event.currentTarget && !event.target.closest("a")) {
            modal.classList.remove("show");
            document.body.classList.remove("no-scroll");
        }
    });
    
    // Закрытие модального окна при клике на ссылку
    const links = modal.querySelectorAll("a");
    links.forEach(link => {
        link.addEventListener("click", (event) => {
            // Можно добавить дополнительную логику для обработки клика по ссылке, если нужно
            modal.classList.remove("show");
            document.body.classList.remove("no-scroll");
        });
    });
});
