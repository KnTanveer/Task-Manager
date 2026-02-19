import { renderProjects } from "../scripts/projects.js";
import { tasksKey, projectsKey } from "../scripts/tasks.js";
import { renderTasks } from "../scripts/tasks.js";

export let tasks = [];
export let projects = [];

export function loadProjects() {
    const oldProjects = localStorage.getItem(projectsKey); 
    if (oldProjects) {
        projects = JSON.parse(oldProjects);

        projects.sort((a, b) => 
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
    }
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