const tasksData = {};

const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');
let draggedItem = null;
const toggleModalButton = document.querySelector('#toggle-modal');
const modal = document.querySelector('.modal');
const modalBg = document.querySelector('.modal .bg')
const tasks = document.querySelectorAll('.tasks');
const addNewTaskButton = document.querySelector('#add-new-task');
const columns = [todo, progress, done];
let count = null;

function addTask(title, desc, column) {
    const div = document.createElement('div');
    div.classList.add('tasks');
    div.setAttribute("draggable", "true");
    div.innerHTML = `<h2>${title}</h2><p>${desc}</p><button>Delete</button>`;
    column.appendChild(div);
    div.addEventListener("drag", () => {
        draggedItem = div;
    });
    return div;
};

function updateTaskCount() {
    columns.forEach(col => {
        const tasks = col.querySelectorAll('.tasks');
        const count = col.querySelector('.right');
        tasksData[col.id] = Array.from(tasks).map(t => {
            return {
                title: t.querySelector("h2").innerText,
                desc: t.querySelector("p").innerText
            }
        });
        localStorage.setItem("tasks", JSON.stringify(tasksData));
        count.innerText = tasks.length;
    });
}

if(localStorage.getItem("tasks")){
    const data = JSON.parse(localStorage.getItem("tasks"));
    console.log(data);
    for (const col in data){
        const column = document.querySelector(`#${col}`);
        data[col].forEach(task => {
            addTask(task.title, task.desc, column);
        });

        updateTaskCount();
    }
}

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
        column.appendChild(draggedItem);
        column.classList.remove('hover-over');
        
        updateTaskCount();
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

// modal logic
addNewTaskButton.addEventListener("click", () => {
    const taskTitle = document.querySelector("#task-title").value;
    const taskDesc = document.querySelector("#task-desc").value;
    addTask(taskTitle, taskDesc, todo);
    updateTaskCount();
    modal.classList.remove('active');
});
