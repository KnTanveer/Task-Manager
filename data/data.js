import { renderProjects } from "../scripts/projects.js";
import { tasksKey, projectsKey } from "../scripts/tasks.js";
import { renderTasks } from "../scripts/tasks.js";

export let tasks = [];
export let projects = ['Project 0', 'Project 1', 'Project 2'];

export function loadProjects() {
    const oldTasks = localStorage.getItem(projectsKey); 
    if (oldTasks) tasks = JSON.parse(oldTasks) 
    renderProjects();
}

export function saveProjects() {
    const stringProjects = JSON.stringify(projects);
    localStorage.setItem(projectsKey, stringProjects);
}

export function loadTasks() { 
    const oldTasks = localStorage.getItem(tasksKey); 
    if (oldTasks) tasks = JSON.parse(oldTasks) 
    renderTasks();
} 
    
export function saveTasks() { 
    const stringTasks = JSON.stringify(tasks)
    localStorage.setItem(tasksKey, stringTasks); 
}