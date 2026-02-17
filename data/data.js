import { storageKey } from "../scripts/tasks.js";
import { renderTasks } from "../scripts/tasks.js";

export let tasks = [{
    name: 'task name',
    date: '2026-02-13',
    project: 'Inbox'
}, {     
    name: 'today task',
    date: '2026-02-16',
    project: 'Inbox'
}, {     
    name: 'tomorrow task',
    date: '2026-02-17',
    project: 'Inbox'
}];

export function loadTasks() { 
    const oldTasks = localStorage.getItem(storageKey); 
    if (oldTasks) tasks = JSON.parse(oldTasks) 
    renderTasks();
} 
    
export function saveTasks() { 
    const stringTasks = JSON.stringify(tasks)
    localStorage.setItem(storageKey, stringTasks); 
}