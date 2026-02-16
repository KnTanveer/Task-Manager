import { tasks } from "../data/data.js";
import { modal } from "./modal.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

let currentFilter = 'Today';

document.getElementById('todayView').addEventListener('click', () => {
    console.log('todayClicked')
    currentFilter = 'Today';
    renderTasks();
});

document.getElementById('upcomingView').addEventListener('click', () => {
    console.log('upcomingClicked')
    currentFilter = 'Upcoming'
    renderTasks();
});

export function addTask() {
    const taskInput = document.getElementById('taskName');
    const taskDate = document.getElementById('taskDate');

    tasks.push({
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
    sortedTasks.forEach((task, idx) => {
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
                <input type="checkbox" class="taskCheckbox" data-idx="${idx}" />
                <span class="task-name">${task.name}</span>
                <span class="task-date ${dateClass}">${task.date}</span>
            </label>
        </div> `
    });
    tasksDiv.innerHTML = contentsHTML;
    
    document.querySelectorAll('.taskCheckbox').forEach((checkbox) => {
        checkbox.addEventListener('change', (e) => {
            const idx = Number(e.target.dataset.idx);
            deleteTask(idx);
        });
    });
}

function deleteTask(idx) {
    setTimeout(() => {
        tasks.splice(idx ,1);
        renderTasks();
    }, 500);
}

function getFilteredTasks() {
    if (currentFilter === 'Today') {
        return tasks.filter(task =>
            dayjs(task.date).isSame(dayjs(), 'day')
        );
    }

    if (currentFilter === 'Upcoming') {
        return tasks.filter(task =>
            dayjs(task.date).isAfter(dayjs(), 'day')
        );
    }

    return tasks;
}
