document.addEventListener('DOMContentLoaded', () => {
    const update = (tasks) => {
        const completed = tasks.filter(task => !!task.completed).length;
        const taskCount = document.querySelector('#task-count');
        taskCount.innerHTML = `${completed} task${completed === 1 ? '' : 's'}`;
        window.tasks.updateTaskContainer(tasks);
    };

    const asyncCreateTask = (e) => {
        window.tasks.createTask(e);

        const tasks = window.tasks.getTasks();
        update(tasks);
    };

    const tasks = window.tasks.getTasks();
    update(tasks);

    const taskEntry = document.querySelector('#task-entry');
    const taskSubmit = document.querySelector('#task-submit');
    taskEntry.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            asyncCreateTask(e);
        }
    });
    taskSubmit.addEventListener('click', asyncCreateTask)
});
