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

        document.addEventListener('keydown', this.handleKey);
    }

    open() {
        this.modal.classList.add('active');

        requestAnimationFrame(() => {
            this.taskNameEl.focus();
            this.taskNameEl.select();
        });
    }

    edit(editId, taskName, taskDate) {
        this.editingTaskId = editId;
        this.taskNameEl.value = taskName;
        this.taskDateEl.value = taskDate;
        this.open();
    }

    close() {
        this.modal.classList.remove('active');
    }

    handleKey(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    }
}

export const modal = new Modal();