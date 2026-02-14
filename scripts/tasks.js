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
    console.log(tasks);
}