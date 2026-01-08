const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');
let draggedItem = null;
const toggleModalButton = document.querySelector('#toggle-modal');
const modal = document.querySelector('.modal');
const modalBg = document.querySelector('.modal .bg')
const tasks = document.querySelectorAll('.tasks');
const addNewTaskButton = document.querySelector('#add-new-task');
const deleteButton = document.querySelector('#deleteButton');
let count = null;

tasks.forEach(task => {
    task.addEventListener("drag", e => {
        // console.log("dragging", e);
        draggedItem = task;
    })
});

function addDragEventOnColumn(column) {
    column.addEventListener("dragenter", event => {
        event.preventDefault();
        column.classList.add("hover-over");
    });
    column.addEventListener("dragleave", event => {
        event.preventDefault();
        column.classList.remove("hover-over");
    });
    column.addEventListener("dragover", event => {
        event.preventDefault();
    });
    column.addEventListener("drop", event => {
        event.preventDefault();
        console.log("dropped", draggedItem, column);
        column.appendChild(draggedItem);
        column.classList.remove('hover-over');
        [todo, progress, done].forEach(col => {
            const tasks = col.querySelectorAll('.tasks');
            const count = col.querySelector('.right');
            count.innerText = tasks.length;
        }); 
    });
};

addDragEventOnColumn(todo);
addDragEventOnColumn(progress);
addDragEventOnColumn(done);

toggleModalButton.addEventListener("click", () => {
    modal.classList.toggle("active");
});

modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
})

addNewTaskButton.addEventListener("click", () => {
    const taskTitle = document.querySelector('#task-title').value;
    const taskDesc = document.querySelector('#task-desc').value;          
    const div = document.createElement('div');
    div.classList.add("tasks");
    div.setAttribute("draggable", "true");
    div.innerHTML = `<h2>${taskTitle}</h2><p>${taskDesc}</p><button>Delete</button>`
    todo.appendChild(div);
    modal.classList.remove("active");
    div.addEventListener("drag", () => {
        draggedItem = div;
    })
});

