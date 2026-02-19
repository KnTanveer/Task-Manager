class Modal {
    modal = document.getElementById("modal");
    openBtn = document.getElementById("openModal");
    closeBtn = document.getElementById("closeModal");
    taskNameEl = document.getElementById("taskName");
    taskDateEl = document.getElementById("taskDate");

    editingTaskId = null;

    constructor() {
            this.handleKey = this.handleKey.bind(this);
    }

    init() {
        this.openBtn.addEventListener('click', () => { this.open(); });
        this.closeBtn.addEventListener('click', () => { this.close(); });

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        document.querySelector('.project-list').addEventListener('click', (e) => {
                const btn = e.target.closest('.projects-options');
                if (!btn) return;

                document.querySelectorAll('.projects-options')
                    .forEach(b => b.classList.remove('active'));

                btn.classList.add('active');

                this.taskProject = btn.dataset.projectBtn;
            });

        document.addEventListener('keydown', this.handleKey);
    }

    open() {
        this.modal.classList.add('active');

        requestAnimationFrame(() => {
            this.taskNameEl.focus();
            this.taskNameEl.select();
        });
    }

    edit(editId, taskName, taskDate, taskProject) {
        this.editingTaskId = editId;
        this.taskNameEl.value = taskName;
        this.taskDateEl.value = taskDate;
        this.taskProject = taskProject;

        document.querySelectorAll('.projects-options').forEach(btn => {
            btn.classList.remove('active');

            if (btn.dataset.projectBtn === taskProject) {
                btn.classList.add('active');
            }
        });
        
        this.open();
    }
    
    close() {
        this.modal.classList.remove('active');
        document.querySelectorAll('.projects-options').forEach(b => b.classList.remove('active'));
        this.taskNameEl.value = "";
        this.taskDateEl.value = "";
        this.taskProject = 'Inbox';    
    }

    handleKey(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    }
}

export const modal = new Modal();