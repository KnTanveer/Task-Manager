import { projects, tasks, saveProjects, loadProjects } from "../data/data.js";

export function projectsMenu() {
    const projectBtn = document.querySelector('.project-btn');
    const projectList = document.querySelector('.project-list');

    projectBtn.addEventListener('click', () => {
        const isOpen = projectBtn.classList.toggle('open');

        if (isOpen) {
            projectBtn.innerHTML = 'Projects <i class="fas fa-eye"></i>';
            projectList.style.display = 'block';
            renderProjects();
        } else {
            projectBtn.innerHTML = 'Projects <i class="fas fa-eye-slash"></i>';
            projectList.style.display = 'none';
        }
    })
}

export function renderProjects() {
    let projectsDiv = document.querySelector('.project-list')
    let projectsSidebar = document.querySelector('.projects-sidebar-list')
    let projectsHTML = "";
    
    projects.forEach((project) => {
        projectsHTML += `
            <button class="projects-options" 
                    data-project-btn="${project}">
                    <span>${project}</span>
            </button>
        `;
    });

    projectsDiv.innerHTML = projectsHTML;

    projectsHTML = ""; 
    projects.forEach((project) => {
        projectsHTML += `
            <button class="view-item" id="${project}View" data-current-project="${project}">
                <i class="fas fa-hashtag"></i><span>${project}</span>
            </button>
        `
    });
    projectsSidebar.innerHTML = projectsHTML;
}

function addProject() {
    const projectInput = document.querySelector('.newProjectName');
    projects.push(projectInput.value);
    manageProjects();
    renderProjects();
    saveProjects();
}

export function manageProjects() {
    document.getElementById('contentHeader').innerHTML = 'Projects';
    let editDiv = document.querySelector('.tasks');

    let projectsHTML = "";
    projects.forEach((project, idx) => {
        projectsHTML += `
            <div class="task">
                <div class="task-div">
                    <button class="delete-project"  data-idx="${idx}">Delete</button>
                    <div class="task-row" data-idx="${idx}">
                        <span class="task-name">${project}</span>
                        <span class="edit-btn"><i class="fas fa-pen"></i></span>
                    </div>
                </div>
            </div> `
    });
    editDiv.innerHTML = `
        <div class="task">
            <div class="task-div">
                <div class="task-row">
                <input class="newProjectName" type="text" placeholder="new project name">
                </div>
                <button id="newProjectBtn">Add</button>
            </div>
        </div>` + projectsHTML;

    document.querySelectorAll('.delete-project').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const idx = Number(e.currentTarget.dataset.idx);
            const projectName = projects[idx];

            const confirmed = confirm(`Delete "${projectName}"?`);

            if (confirmed) {
                deleteProject(idx);
            }
        });
    });

    document.querySelectorAll('.edit-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const taskRow = e.currentTarget.closest('.task-row');
            const idx = Number(taskRow.dataset.idx);
            const currentName = projects[idx];

            const newName = prompt("Edit project name:", currentName);

            if (newName && newName.trim() !== "") {
                editProject(idx, newName.trim());
            }
        });
    });

    document.getElementById('newProjectBtn').addEventListener('click', addProject);
}

function editProject(idx, newName) {
    const oldName = projects[idx];

    if (projects.includes(newName)) {
        alert("Project name already exists.");
        return;
    }
    
    projects[idx] = newName;

    tasks.forEach(task => {
        if (task.project === oldName) {
            task.project = newName;
        }
    });
    manageProjects();
    renderProjects();
    saveProjects();
    saveTasks();
}


function deleteProject(idx) {
    projects.splice(idx, 1);
    manageProjects();
    renderProjects();
    saveProjects();
}