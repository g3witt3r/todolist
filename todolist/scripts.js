document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const footer = document.getElementById('footer');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const clearCompletedBtn = document.getElementById('clear-completed-btn');
    const itemsLeft = document.getElementById('items-left');
    const toggleAll = document.getElementById('toggle-all');

    let tasks = [];
    let listVisible = true;

    const renderTasks = (filter = 'all') => {
        todoList.innerHTML = '';
        const filteredTasks = tasks.filter(task => {
            if (filter === 'completed') return task.completed;
            if (filter === 'in-progress') return !task.completed;
            return true;
        });

        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `todo-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <div class="circle ${task.completed ? 'completed' : ''}"></div>
                <span class="task-text">${task.text}</span>
                <span class="delete-btn">&times;</span>
            `;

            li.querySelector('.circle').addEventListener('click', () => toggleTaskStatus(task.id));
            li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.id));

            todoList.appendChild(li);
        });

        updateItemsLeft();

        
        footer.style.display = tasks.length > 0 ? 'block' : 'none';
    };

    const addTask = (text) => {
        const newTask = {
            id: Date.now(),
            text,
            completed: false,
        };
        tasks.push(newTask);
        renderTasks();
    };

    const deleteTask = (id) => {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    };

    const toggleTaskStatus = (id) => {
        tasks = tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        renderTasks();
    };

    const clearCompletedTasks = () => {
        tasks = tasks.filter(task => !task.completed);
        renderTasks();
    };

    const updateItemsLeft = () => {
        const activeTasks = tasks.filter(task => !task.completed).length;
        itemsLeft.textContent = `${activeTasks} item${activeTasks !== 1 ? 's' : ''} left`;
    };

    const toggleListVisibility = () => {
        listVisible = !listVisible;
        todoList.style.display = listVisible ? 'block' : 'none';
        footer.style.display = listVisible && tasks.length > 0 ? 'block' : 'none';
        toggleAll.style.transform = listVisible ? 'rotate(90deg)' : 'rotate(0deg)';
    };

    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const text = todoInput.value.trim();
            if (text) {
                addTask(text);
                todoInput.value = '';
            }
        }
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            renderTasks(filter);
        });
    });

    clearCompletedBtn.addEventListener('click', clearCompletedTasks);
    toggleAll.addEventListener('click', toggleListVisibility);

    renderTasks();
});
