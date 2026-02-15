import { tasks } from "../data/data.js";
import { modal } from "./modal.js";


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
    tasks.forEach((task, idx) => {
        task.idx = idx;
        
        contentsHTML += `
        <div class="task">
        <label class="task-label">
        <input type="checkbox" class="taskCheckbox" data-idx="${idx}"/>
        <span>${task.name}</span>
        </label>
        </div>  `
    });
    tasksDiv.innerHTML = contentsHTML;
    
    document.querySelectorAll('.taskCheckbox').forEach((checkbox) => {
        checkbox.addEventListener('change', (e) => {
            const idx = Number(e.target.dataset.idx);
            deleteTask(idx);
        });
    });
    console.log(tasks);
}



function deleteTask(idx) {
    setTimeout(() => {
        tasks.splice(idx ,1);
        renderTasks();
    }, 500);
}