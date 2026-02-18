import { projects } from "../data/data.js";

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
            <button class="projects-options" id="${project}View">
                <i class="fas fa-hashtag"></i><span>${project}</span>
            </button>
        `
    });

    projectsDiv.innerHTML = projectsHTML;

    projectsHTML = ""; 
    projects.forEach((project) => {
        projectsHTML += `
            <button class="view-item" id="${project}View">
                <i class="fas fa-hashtag"></i><span>${project}</span>
            </button>
        `
    });
    projectsSidebar.innerHTML = projectsHTML;
}

class Project {
    updateContents() {
        document.getElementById('contentHeader').innerHTML = 'Projects';
    }
}