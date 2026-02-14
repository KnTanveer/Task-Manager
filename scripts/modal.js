class Modal {
    modal = document.getElementById("modal");
    openBtn = document.getElementById("openModal");
    closeBtn = document.getElementById("closeModal");
    taskName = document.getElementById("taskName");

    constructor() {
            this.handleEsc = this.handleEsc.bind(this);
    }

    init() {
        this.openBtn.addEventListener('click', () => { this.open(); });
        this.closeBtn.addEventListener('click', () => { this.close(); });

        this.modal.addEventListener('click', (e) => {
            if (e.target === 'modal') {
                this.close();
            }
        });

        document.addEventListener('keydown', this.handleEsc);
    }

    open() {
        this.modal.classList.add('active');

        requestAnimationFrame(() => {
            this.taskName.focus();
            this.taskName.select();
        });
    }

    close() {
        this.modal.classList.remove('active');
    }

    handleEsc(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    }
}

export const modal = new Modal();