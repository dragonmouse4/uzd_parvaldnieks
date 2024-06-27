document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    loadTasks();

    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });

    taskList.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            removeTask(e.target.parentElement);
        }
    });

    function addTask(task) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = task;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Noņemt';
        removeButton.addEventListener('click', function() {
            removeTask(li);
        });

        li.appendChild(span);
        li.appendChild(removeButton);
        taskList.appendChild(li);
        saveTask(task);
    }

    function removeTask(taskItem) {
        taskList.removeChild(taskItem);
        removeTaskFromStorage(taskItem.firstChild.textContent);
    }

    function loadTasks() {
        let tasks = getTasksFromStorage();
        tasks.forEach(function(task) {
            const li = document.createElement('li');
            const span = document.createElement('span');
            span.textContent = task;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Noņemt';
            removeButton.addEventListener('click', function() {
                removeTask(li);
            });

            li.appendChild(span);
            li.appendChild(removeButton);
            taskList.appendChild(li);
        });
    }

    function saveTask(task) {
        let tasks = getTasksFromStorage();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function removeTaskFromStorage(task) {
        let tasks = getTasksFromStorage();
        tasks = tasks.filter(function(t) {
            return t !== task;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function getTasksFromStorage() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks;
    }
});
