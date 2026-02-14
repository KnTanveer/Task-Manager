import { tasks } from "../data/data.js";
import { modal } from "./modal.js";

const taskInput = document.getElementById('taskName');
const taskDate = document.getElementById('taskDate');
const saveBtn = document.getElementById('modalSaveBtn');

function addTask() {
    tasks.push({
        name: taskInput.value,
        date: taskDate.value,
        project: 'Inbox'
    });
    
    taskInput.value = '';
    modal.close();
    renderTasks();
}

function renderTasks() {
    console.log(tasks);
}

renderTasks();

saveBtn.addEventListener('click', (e) => {
    addTask();
});

document.addEventListener('DOMContentLoaded', () => {
    
});