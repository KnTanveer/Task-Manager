import { tasks, saveTasks, loadTasks } from "../data/data.js";
import { modal } from "./modal.js";
import { projects } from "../data/data.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const tasksKey = 'tasks';
export const projectsKey = 'projects';

let currentFilter = 'Today'
export function setFilterBtns() {
    document.getElementById('todayView').addEventListener('click', () => {
        currentFilter = 'Today';
        document.getElementById('contentHeader').innerHTML = 'Today';
        renderTasks();
    });

    document.getElementById('upcomingView').addEventListener('click', () => {
        currentFilter = 'Upcoming';
        document.getElementById('contentHeader').innerHTML = 'Upcoming';
        renderTasks();
    });

    document.getElementById('inboxView').addEventListener('click', () => {
        currentFilter = 'Inbox';
        document.getElementById('contentHeader').innerHTML = 'Inbox';
        renderTasks();
    });
    
    projects.forEach((project) => {
        document.getElementById(`${project}View`).addEventListener('click', () => {
            currentFilter = project;
            document.getElementById('contentHeader').innerHTML = project;
            renderTasks();
        });
    });
    return currentFilter;
}

export function addTask() {
    if (modal.editingTaskId) {
        const index = tasks.findIndex(task => task.id === modal.editingTaskId);
        if (index === -1) return;

        tasks[index] = { 
            id: modal.editingTaskId,
            name: modal.taskNameEl.value.trim(),
            date: modal.taskDateEl.value
        };

        modal.editingTaskId = null;
        modal.close();
        renderTasks();
        saveTasks();
        return
    }

    const taskInput = document.getElementById('taskName');
    const taskDate = document.getElementById('taskDate');

    tasks.push({
        id: crypto.randomUUID(),
        name: taskInput.value,
        date: taskDate.value,
        project: 'Inbox'
    });
    
    taskInput.value = '';
    modal.close();
    renderTasks();
    saveTasks();
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
        <div class="task-div">
        <input type="checkbox" class="task-checkbox" data-id="${task.id}" />
        <div class="task-row" data-edit-id="${task.id}"> 
        <span class="task-name" data-task-name="${task.name}">${task.name}</span>
        <span class="task-date ${dateClass}" data-task-date="${task.date}">${task.date}</span>
        <span class="edit-btn"><i class="fas fa-pen"></i></span>
        </div>
        </div>
        </div> `
    });
    tasksDiv.innerHTML = contentsHTML;
    if (filteredTasks.length === 0) tasksDiv.innerHTML = '<p style="color: rgba(194, 194, 194, 0.5);">No tasks yet.</p>';
    
    document.querySelectorAll('.task-checkbox').forEach((checkbox) => {
        checkbox.addEventListener('change', (e) => {
            const id = e.target.dataset.id;
            deleteTask(id);
        });
    });

    document.querySelectorAll('.task-row').forEach((row) => {
        row.addEventListener('click', (e) => {
            const editId = e.currentTarget.dataset.editId;
            const taskName = e.currentTarget.querySelector('.task-name').dataset.taskName;
            const taskDate = e.currentTarget.querySelector('.task-date').dataset.taskDate;
            modal.edit(editId, taskName, taskDate);
        })
    });
}

function deleteTask(id) {
    setTimeout(() => {
        const index = tasks.findIndex(task => task.id === id);
        if (index === -1) return;
        tasks.splice(index ,1);
        renderTasks();   
        saveTasks();
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
    
    if (currentFilter === 'Inbox') {
        return tasks.filter(task => !task.date)
    }
    
    if (projects.includes(currentFilter)) {
        return tasks.filter(task => task.project === currentFilter);
    }
    
    return tasks;
}