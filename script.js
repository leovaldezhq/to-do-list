document.addEventListener("DOMContentLoaded", () => {
    loadTasks();

    document.getElementById("myInput").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});

function addTask() {
    const input = document.getElementById("myInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    appendTaskToDOM(task);
    saveTask(task);
    input.value = "";
}

function appendTaskToDOM(task) {
    const list = document.getElementById("list");

    const li = document.createElement("li");
    li.dataset.id = task.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", toggleComplete);

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) span.classList.add("checked");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = deleteTask;

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
}

function toggleComplete(e) {
    const li = e.target.closest("li");
    const id = li.dataset.id;
    const span = li.querySelector("span");
    const tasks = getTasks();
    const task = tasks.find(t => t.id == id);
    task.completed = e.target.checked;
    saveTasks(tasks);

    span.classList.toggle("checked", task.completed);
}

function deleteTask(e) {
    const li = e.target.closest("li");
    const id = li.dataset.id;
    li.remove();

    const tasks = getTasks().filter(t => t.id != id);
    saveTasks(tasks);
}

function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(appendTaskToDOM);
}
