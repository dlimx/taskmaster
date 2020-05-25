const SERVER_ROOT = 'https://cors-anywhere.herokuapp.com/http://web.engr.oregonstate.edu/~zhangluy/tools/class-content/form_tests/check_request.php';

const getTasks = () => {
    // TODO - move to server side
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
    // TODO - move to server side
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
        created: Date.now(),
        updated: Date.now(),
    };

    fetch(SERVER_ROOT, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
    }).then(data => console.log(data)).catch(console.error);

    const tasks = [...getTasks(), newTask];
    taskEntry.value = '';
    saveTasks(tasks);
};

const getActiveId = () => {
    const id = window.localStorage.getItem('taskId');
    if (id) {
        return id;
    }

    const tasks = getTasks();
    if (tasks.length) {
        setActiveId(tasks[0].id);
        return tasks[0].id;
    }

    window.location = '/';
};

const setActiveId = (id) => {
    return window.localStorage.setItem('taskId', id);
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
                updated: Date.now(),
            };
            tasks[index] = newTask;
            break;
        }
    }
    saveTasks(tasks);

    try {
        updateTaskContainer(tasks);
    } catch (error) {
        // handle detail page errors
    }

    try {
        updateDetailPage(tasks);
    } catch (error) {
        // handle detail page errors
    }
};

const createTaskCard = (task) => {
    const taskCard = document.createElement('div');
    taskCard.classList.add('card');
    taskCard.classList.add('has-margin-bottom');
    taskCard.setAttribute('id', task.id);

    const taskCardContent = document.createElement('a');
    taskCardContent.classList.add('card-content');
    taskCardContent.classList.add('is-row');
    taskCardContent.setAttribute('role', 'button');
    taskCardContent.addEventListener('click', (e) => {
        e.preventDefault();
        setActiveId(task.id);
        window.location = './detail.html'
    });
    taskCard.appendChild(taskCardContent);

    const taskCardIconContainer = document.createElement('a');
    taskCardIconContainer.classList.add('icon');
    taskCardIconContainer.classList.add('is-large');
    taskCardIconContainer.classList.add(task.completed ? 'has-text-primary' : 'has-text-grey');
    taskCardIconContainer.classList.add('card-icon');
    taskCardIconContainer.setAttribute('role', 'button');
    taskCardIconContainer.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        completeActiveTask(task.id);
    });

    const taskCardChecked = document.createElement('i');
    taskCardChecked.classList.add('far');
    taskCardChecked.classList.add('fa-lg');
    taskCardChecked.classList.add(task.completed ? 'fa-check-square' : 'fa-square');
    taskCardIconContainer.appendChild(taskCardChecked);

    const taskCardCopyContainer = document.createElement('div');

    const taskCardTitle = document.createElement('p');
    taskCardTitle.classList.add('title');
    taskCardTitle.classList.add('is-4');
    taskCardTitle.innerHTML = task.text;

    const taskCardDate = document.createElement('p');
    taskCardDate.classList.add('subtitle');
    taskCardDate.classList.add('is-6');
    taskCardDate.innerHTML = dayjs(task.created).format('MMMM DD');

    taskCardCopyContainer.appendChild(taskCardTitle);
    taskCardCopyContainer.appendChild(taskCardDate);

    taskCardContent.appendChild(taskCardIconContainer);
    taskCardContent.appendChild(taskCardCopyContainer);

    return taskCard;
};

const updateTaskContainer = (tasks) => {
    const taskContainer = document.querySelector('#task-container');
    const TASK_CONTAINER_EMPTY = 'task-container-empty';

    // reset the container so we're not duplicating
    taskContainer.innerHTML = '';

    if (!tasks || !tasks.length) {
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

    taskContainer.classList.remove(TASK_CONTAINER_EMPTY);

    for (const task of tasks) {
        const card = createTaskCard(task);
        taskContainer.append(card);
    }

    try {
        const completed = tasks.filter(task => !!task.completed).length;
        const taskCount = document.querySelector('#task-count');
        taskCount.innerHTML = `${completed} task${completed === 1 ? '' : 's'}`;
    } catch (error) {
        // handling for non-details page
    }
};

const updateDetailPage = (tasks) => {
    const id = getActiveId();
    const task = tasks.filter(item => item.id === Number(id))[0];

    // reset the container so we're not duplicating
    const taskTitleContainer = document.querySelector('#task-title');
    taskTitleContainer.innerHTML = '';
    const taskDetailsContainer = document.querySelector('#task-body');
    taskDetailsContainer.innerHTML = '';

    const taskContent = document.createElement('div');
    taskContent.classList.add('is-row');
    taskTitleContainer.appendChild(taskContent);

    const taskIconContainer = document.createElement('a');
    taskIconContainer.classList.add('icon');
    taskIconContainer.classList.add('is-large');
    taskIconContainer.classList.add(task.completed ? 'has-text-primary' : 'has-text-grey');
    taskIconContainer.classList.add('detail-icon');
    taskIconContainer.setAttribute('role', 'button');
    taskIconContainer.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        completeActiveTask(task.id);
    });

    const taskChecked = document.createElement('i');
    taskChecked.classList.add('far');
    taskChecked.classList.add('fa-2x');
    taskChecked.classList.add(task.completed ? 'fa-check-square' : 'fa-square');
    taskIconContainer.appendChild(taskChecked);

    const taskTitle = document.createElement('p');
    taskTitle.classList.add('title');
    taskTitle.classList.add('is-2');
    taskTitle.innerHTML = task.text;

    taskContent.appendChild(taskIconContainer);
    taskContent.appendChild(taskTitle);

    const taskCreated = document.createElement('p');
    taskCreated.classList.add('subtitle');
    taskCreated.classList.add('is-5');
    taskCreated.innerHTML = dayjs(task.created).format('[Created on] MMMM DD [at] h:mma');

    const taskUpdated = document.createElement('p');
    taskUpdated.classList.add('subtitle');
    taskUpdated.classList.add('is-5');
    taskUpdated.innerHTML = dayjs(task.updated).format('[Last updated on] MMMM DD [at] h:mma');


    taskDetailsContainer.appendChild(taskCreated)
    taskDetailsContainer.appendChild(taskUpdated)
};

window.tasks = {
    getTasks,
    createTask,
    setActiveId,
    getActiveId,
    completeActiveTask,
    updateTaskContainer,
    updateDetailPage,
};
