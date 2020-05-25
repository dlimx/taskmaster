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
    taskSubmit.addEventListener('click', asyncCreateTask);

    const exportButton = document.querySelector('#task-export');
    exportButton.addEventListener('click', (e) => {
        e.preventDefault();
        const tasks = window.tasks.getTasks();

        let csvData = 'data:text/csv;charset=utf-8,';
        csvData += 'ID,TEXT,COMPLETED,CREATED,UPDATED\n';
        tasks.forEach(task => {
            csvData += `${task.id},${task.text},${task.completed},${dayjs(task.created).format('YYYY-MM-DD HH:mm:ss')},${dayjs(task.updated).format('YYYY-MM-DD HH:mm:ss')}\n`
        });

        const encodedURI = encodeURI(csvData);
        const download = document.createElement('a');
        download.setAttribute('href', encodedURI);
        download.setAttribute('download', 'tasks-data.csv');
        document.body.appendChild(download);
        download.click();
    });
});
