import { modal } from "./modal.js";
import { renderTasks, addTask } from "./tasks.js";
import { loadTasks } from "../data/data.js";

const saveBtn = document.getElementById('modalSaveBtn');

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    renderTasks();

    modal.init();
    saveBtn.addEventListener('click', addTask);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }    
});
