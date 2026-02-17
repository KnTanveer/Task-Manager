import { storageKey } from "../scripts/tasks.js";
import { renderTasks } from "../scripts/tasks.js";

export let tasks = [];

export function loadTasks() { 
    const oldTasks = localStorage.getItem(storageKey); 
    if (oldTasks) tasks = JSON.parse(oldTasks) 
    renderTasks();
} 
    
export function saveTasks() { 
    const stringTasks = JSON.stringify(tasks)
    localStorage.setItem(storageKey, stringTasks); 
}