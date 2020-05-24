const TASK_CONTAINER_EMPTY = 'task-container-empty';

const getTasks = () => {
    const rawTasks = window.localStorage.getItem('tasks');
    try {
        const tasks = JSON.parse(rawTasks);
        if (!tasks) return [];
        return tasks;
    } catch (e) {
        // handle non-JSON tasks by resetting localStorage
        window.localStorage.setItem('tasks', JSON.stringify([]));
        return [];
    }
};

const createTask = (e) => {
    e.preventDefault();
    const taskEntry = document.querySelector('#task-entry');
    if (!taskEntry.value || !taskEntry.value.trim()) {
        return;
    }

    const newTask = {
        id: Math.floor(Math.random() * 100000),
        text: taskEntry.value,
        completed: false,
    };
    const tasks = [...getTasks(), newTask];
    taskEntry.value = '';
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
};

const setActiveTask = () => {

};

const getActiveTask = () => {

};

const updateActiveTask = () => {

};

const createTaskCard = (task) => {
    const taskCard = document.createElement('div');
    taskCard.classList.add('card');
    taskCard.classList.add('has-margin-bottom');
    const taskCardContent = document.createElement('div');
    taskCardContent.classList.add('card-content');
    taskCard.appendChild(taskCardContent);
    const taskCardTitle = document.createElement('p');
    taskCardTitle.classList.add('title');
    taskCardTitle.innerHTML = task.text;
    taskCardContent.appendChild(taskCardTitle);

    return taskCard;
};

const updateTaskContainer = (tasks) => {
    const taskContainer = document.querySelector('#task-container');

    if (!tasks || !tasks.length) {
        taskContainer.innerHTML = '';
        taskContainer.classList.add(TASK_CONTAINER_EMPTY);

        const getStarted = document.createElement('h1');
        getStarted.classList.add('title');
        getStarted.innerHTML = 'Let\'s Get Started';

        const getStartedByline = document.createElement('p');
        getStartedByline.innerHTML = 'Create your first task today!';

        taskContainer.appendChild(getStarted);
        taskContainer.appendChild(getStartedByline);

        return;
    }

    taskContainer.innerHTML = '';
    taskContainer.classList.remove(TASK_CONTAINER_EMPTY);

    for (const task of tasks) {
        const card = createTaskCard(task);
        taskContainer.append(card);
    }
};

window.tasks = {
    getTasks,
    createTask,
    setActiveTask: (id) => {
    },
    getActiveTask: (id) => {
    },
    updateActiveTask: (id) => {
    },
    updateTaskContainer,
};
