document.addEventListener('DOMContentLoaded', () => {
    const tasks = window.tasks.getTasks();
    window.tasks.updateDetailPage(tasks);
});
