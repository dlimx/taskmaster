document.addEventListener('DOMContentLoaded', () => {
    const asyncCreateTask = (e) => {
        window.tasks.createTask(e);

        const tasks = window.tasks.getTasks();
        window.tasks.updateTaskContainer(tasks);

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
});
