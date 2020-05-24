const TASK_CONTAINER_EMPTY = 'task-container-empty';

const getTasks = () => {
    const rawTasks = window.localStorage.getItem('tasks');
    try {
        const tasks = JSON.parse(rawTasks);
        if (!tasks) return [];
        return tasks;
    } catch (error) {
        // handle non-JSON tasks by resetting localStorage
        window.localStorage.setItem('tasks', JSON.stringify([]));
        return [];
    }
};

const saveTasks = (tasks) => {
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
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
    saveTasks(tasks);
};

const getActiveId = () => {
    return window.localStorage.getItem('taskId');
};

const setActiveId = (id) => {
    return window.localStorage.setItem('taskId', id);
};


const getActiveTask = () => {

};

const updateActiveTask = () => {

};

const completeActiveTask = (id) => {
    if (!id) {
        id = getActiveId();
    }

    const tasks = getTasks();
    for (const index in tasks) {
        if (tasks[index].id === id) {
            const newTask = {
                ...tasks[index],
                completed: !tasks[index].completed,
            };
            tasks[index] = newTask;
            break;
        }
    }
    saveTasks(tasks);

    try {
        updateTaskContainer(tasks);
    } catch(error) {
        // handle detail page errors
    }

    try {
        updateDetailPage(tasks);
    } catch(error) {
        // handle detail page errors
    }
};

const createTaskCard = (task) => {
    const taskCard = document.createElement('div');
    taskCard.classList.add('card');
    taskCard.classList.add('has-margin-bottom');
    taskCard.setAttribute('id', task.id);

    const taskCardContent = document.createElement('div');
    taskCardContent.classList.add('card-content');
    taskCard.appendChild(taskCardContent);

    const taskCardIconContainer = document.createElement('a');
    taskCardIconContainer.classList.add('icon');
    taskCardIconContainer.classList.add('is-medium');
    taskCardIconContainer.classList.add(task.completed ? 'has-text-primary' : 'has-text-grey');
    taskCardIconContainer.classList.add('card-icon');
    taskCardIconContainer.setAttribute('role', 'button');
    taskCardIconContainer.addEventListener('click', (e) => {
        e.preventDefault();
        completeActiveTask(task.id);
    });

    const taskCardChecked = document.createElement('i');
    taskCardChecked.classList.add('far');
    taskCardChecked.classList.add('fa-lg');
    taskCardChecked.classList.add(task.completed ? 'fa-check-square' : 'fa-square');
    taskCardIconContainer.appendChild(taskCardChecked);

    const taskCardTitle = document.createElement('p');
    taskCardTitle.classList.add('title');
    taskCardTitle.innerHTML = task.text;

    taskCardContent.appendChild(taskCardIconContainer);
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
    completeActiveTask,
    updateTaskContainer,
};
