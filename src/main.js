document.addEventListener('DOMContentLoaded', () => {
    const asyncCreateTask = (e) => {
        window.tasks.createTask(e);

        const newTasks = window.tasks.getTasks();
        window.tasks.updateTaskContainer(newTasks);

    };

    const tasks = window.tasks.getTasks();
    window.tasks.updateTaskContainer(tasks);

    const taskEntry = document.querySelector('#task-entry');
    const taskSubmit = document.querySelector('#task-submit');
    taskEntry.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            asyncCreateTask(e);
        }
    });
    taskSubmit.addEventListener('click', asyncCreateTask)


    const activateCarouselIndex = (prevIndex, nextIndex) => {
        const prevCarousel = document.querySelector(`#carousel-${prevIndex}`);
        prevCarousel.classList.remove('active');
        setTimeout(() => { prevCarousel.classList.add('hidden')}, 500);
        const nextCarousel = document.querySelector(`#carousel-${nextIndex}`);
        nextCarousel.classList.remove('hidden');
        nextCarousel.classList.add('active');
        const carouselIcons = document.querySelectorAll('.carousel-jump');
        carouselIcons[prevIndex].childNodes[1].childNodes[1].classList.remove('fas');
        carouselIcons[prevIndex].childNodes[1].childNodes[1].classList.add('far');
        carouselIcons[nextIndex].childNodes[1].childNodes[1].classList.remove('far');
        carouselIcons[nextIndex].childNodes[1].childNodes[1].classList.add('fas');
    };

    let activeCarouselIndex = 0;

    const carouselIcons = document.querySelectorAll('.carousel-jump');
    carouselIcons.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            activateCarouselIndex(activeCarouselIndex, index);
            activeCarouselIndex = index;
        });
    });

    const carouselLeft = document.querySelector('#carousel-left');
    carouselLeft.addEventListener('click', (e) => {
        let nextIndex = activeCarouselIndex - 1 >= 0 ? activeCarouselIndex - 1 : carouselIcons.length - 1;
        activateCarouselIndex(activeCarouselIndex, nextIndex);
        activeCarouselIndex = nextIndex;
    });
    const carouselRight = document.querySelector('#carousel-right');
    carouselRight.addEventListener('click', (e) => {
        let nextIndex = activeCarouselIndex + 1 < carouselIcons.length ? activeCarouselIndex + 1 : 0;
        activateCarouselIndex(activeCarouselIndex, nextIndex);
        activeCarouselIndex = nextIndex;
    });
});
