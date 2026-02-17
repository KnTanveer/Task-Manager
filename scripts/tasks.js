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
    if (modal.editingTaskId) {
        console.log(modal.editingTaskId)
        const index = tasks.findIndex(task => task.id === modal.editingTaskId);
        if (index === -1) return;

        console.log(index);
        tasks[index] = { 
            id: modal.editingTaskId,
            name: modal.taskNameEl.value.trim(),
            date: modal.taskDateEl.value
        };

        console.log(tasks[index]);
        modal.editingTaskId = null;
        modal.close();
        renderTasks();
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
    console.log(tasks)
    
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
            console.log(editId);
            console.log(taskName);
            console.log(taskDate);
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