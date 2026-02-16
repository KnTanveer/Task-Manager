import { modal } from "./modal.js";
import { renderTasks, addTask } from "./tasks.js";

const saveBtn = document.getElementById('modalSaveBtn');

document.addEventListener('DOMContentLoaded', () => {
    renderTasks();

    modal.init();
    saveBtn.addEventListener('click', addTask);
    
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }    
});
