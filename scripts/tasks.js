import { tasks } from "../data/data.js";
import { modal } from "./modal.js";


export function addTask() {
    const taskInput = document.getElementById('taskName');
    const taskDate = document.getElementById('taskDate');

    tasks.push({
        name: taskInput.value,
        date: taskDate.value,
        project: 'Inbox',
        idx: 0
    });
    
    taskInput.value = '';
    taskDate.value = '';
    modal.close();
    renderTasks();
}

export function renderTasks() {
    let tasksDiv = document.querySelector('.tasks');
    
    let contentsHTML = "";
    tasks.forEach((task, idx) => {
        task.idx = idx;

        contentsHTML += `
            <div class="task">
                <label class="task-label">
                <input type="checkbox" />
                <span>${task.name}</span>
                </label>
            </div>  `

         onclick="deleteTask(${task.idx})"
    });

    tasksDiv.innerHTML = contentsHTML;
}

function deleteTask(idx) {
    tasks.splice(idx ,1);
    renderTasks();
}