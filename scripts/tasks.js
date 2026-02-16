import { tasks } from "../data/data.js";
import { modal } from "./modal.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

let currentFilter = 'Today';

document.getElementById('todayView').addEventListener('click', () => {
    currentFilter = 'Today';
    document.getElementById('contentHeader').innerHTML = 'Today';
    renderTasks();
});

document.getElementById('upcomingView').addEventListener('click', () => {
    currentFilter = 'Upcoming'
    document.getElementById('contentHeader').innerHTML = 'Upcoming';
    renderTasks();
});

export function addTask() {
    const taskInput = document.getElementById('taskName');
    const taskDate = document.getElementById('taskDate');

    tasks.push({
        id: crypto.randomUUID(),
        name: taskInput.value,
        date: taskDate.value,
        project: 'Inbox'
    });
    
    taskInput.value = '';
    taskDate.value = '';
    modal.close();
    renderTasks();
}

export function renderTasks() {
    let tasksDiv = document.querySelector('.tasks');

    let contentsHTML = "";
    const today = dayjs().format('YYYY-MM-DD');
    const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');
    let filteredTasks = getFilteredTasks();

    let sortedTasks = filteredTasks.toSorted((a, b) => {return new Date(a.date) - new Date(b.date)});
    sortedTasks.forEach((task) => {
        let dateClass;
        
        if (task.date === today) {
            dateClass = 'today'
        } else if (dayjs(task.date).isBefore(today)) {
            dateClass = 'yesterday'
        } else if (task.date === tomorrow) {
            dateClass = 'tomorrow'
        }
        
        contentsHTML += `
        <div class="task">
            <label class="task-label">
                <input type="checkbox" class="taskCheckbox" data-id="${task.id}" />
                <span class="task-name">${task.name}</span>
                <span class="task-date ${dateClass}">${task.date}</span>
            </label>
        </div> `
    });
    tasksDiv.innerHTML = contentsHTML;
    
    document.querySelectorAll('.taskCheckbox').forEach((checkbox) => {
        checkbox.addEventListener('change', (e) => {
            const id = e.target.dataset.id;
            deleteTask(id);
        });
    });
}

function deleteTask(id) {
    setTimeout(() => {
        const index = tasks.findIndex(task => task.id === id);
        if (index === -1) { return }
        tasks.splice(index ,1);
        renderTasks();   
    }, 500);
}

function getFilteredTasks() {
    if (currentFilter === 'Today') {
        return tasks.filter(task =>
            dayjs(task.date).isSame(dayjs(), 'day') || dayjs(task.date).isBefore(dayjs(), 'day')
        );
    }

    if (currentFilter === 'Upcoming') {
        return tasks.filter(task =>
            dayjs(task.date).isAfter(dayjs(), 'day')
        );
    }

    return tasks;
}