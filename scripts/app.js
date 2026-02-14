import { tasks } from "../data/data.js";
import { modal } from "./modal.js";

console.log(tasks);

document.addEventListener('DOMContentLoaded', () => {
    modal.init();
});