let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

window.onload = function () {
    tasks.forEach(task => renderTask(task));
    updateCounter();
};

// ➕ ADD TASK
function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();

    if (text === "") return;

    let task = {
        id: Date.now(),
        text: text
    };

    tasks.push(task);
    save();
    renderTask(task);

    input.value = "";
    updateCounter();
}

// 🖥️ RENDER TASK
function renderTask(task) {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = task.text;

    let actions = document.createElement("div");
    actions.className = "actions";

    // EDIT
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = function () {
        let newText = prompt("Edit task:", task.text);
        if (newText) {
            task.text = newText;
            save();
            refreshUI();
        }
    };

    // DELETE
    let delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "delete";
    delBtn.onclick = function () {
        tasks = tasks.filter(t => t.id !== task.id);
        save();
        refreshUI();
    };

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    li.appendChild(span);
    li.appendChild(actions);

    document.getElementById("taskList").appendChild(li);
}

// 🔄 REFRESH UI
function refreshUI() {
    document.getElementById("taskList").innerHTML = "";
    tasks.forEach(task => renderTask(task));
    updateCounter();
}

// 💾 SAVE
function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 📊 COUNTER
function updateCounter() {
    document.getElementById("counter").textContent =
        "Total Tasks: " + tasks.length;
}

// 🌙 DARK MODE
function toggleTheme() {
    document.body.classList.toggle("dark");
}