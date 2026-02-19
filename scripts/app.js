import { modal } from "./modal.js";
import { renderTasks, addTask, setFilterBtns } from "./tasks.js";
import { loadTasks } from "../data/data.js";
import { projectsMenu, renderProjects } from "./projects.js";

const saveBtn = document.getElementById('modalSaveBtn');
const modalEl = document.querySelector('.modal-wrapper');

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    renderTasks();

    projectsMenu();
    renderProjects();
    modal.init();
    setFilterBtns();
    saveBtn.addEventListener('click', addTask);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && modalEl.classList.contains('active')) {
        addTask();
    }    
});
