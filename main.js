const addTaskBtn = document.querySelector(".btn");
const oneTask = document.querySelector(".task.template");
let tasks = document.querySelector(".tasks");
const input = document.querySelector("input[type='text']");
// this function enumerate the tasks
function enumerate() {
  let tasksArr = tasks.querySelectorAll(".task:not(.template)");
  let i = 0;
  tasksArr.forEach((task) => {
    if (getComputedStyle(task).display !== "none") {
      const n = task.querySelector(".nums");
      if (n) n.textContent = ++i;
    }
  });
}
// save Tasks to the local storage

// get tasks onlaod
function onlaodTasks() {
  const saved = JSON.parse(localStorage.getItem("TasksSaved")) || [];
  saved.forEach((task) => {
    let createTask = oneTask.cloneNode(true);
    createTask.classList.remove("template");
    createTask.querySelector(".task-content").textContent = task.data;
    if (task.done) {
      createTask.querySelector(".task-content").classList.add("checked");
    }
    createTask.style.display = "flex";
    tasks.appendChild(createTask);
  });
  enumerate();
}
function saveTasks() {
  let TasksArr = [];
  document.querySelectorAll(".task:not(.template)").forEach((task) => {
    if (getComputedStyle(task).display !== "none") {
      TasksArr.push({
        data: task.querySelector(".task-content").textContent,
        done: task.querySelector(".task-content").classList.contains("checked"),
      });
    }
  });
  localStorage.setItem("TasksSaved", JSON.stringify(TasksArr));
}
// this function create a task and apend it to the task container
function createTaskFunction() {
  let taskContent = input.value;
  if (taskContent.trim() === "") {
    window.alert("You must type Something !");
  } else {
    let createTask = oneTask.cloneNode(true);
    createTask.classList.remove("template");
    createTask.querySelector(".task-content").textContent = taskContent;
    tasks.appendChild(createTask);
    createTask.style.display = "flex";
    document.querySelector("input[type='text']").value = "";
    enumerate();
    saveTasks();
  }
}
// if u click on the btn the task will be created  and added to the task container
addTaskBtn.onclick = createTaskFunction;
// if u click on the enter key in ur keyboard the task will be created
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    createTaskFunction();
  }
});

tasks.addEventListener("click", function (e) {
  if (e.target.closest(".remove-task")) {
    e.target.closest(".task").remove();
    enumerate();
    saveTasks();
  } else if (e.target.closest(".task-done")) {
    e.target
      .closest(".task")
      .querySelector(".task-content")
      .classList.toggle("checked");
    saveTasks();
  }
});

window.addEventListener("DOMContentLoaded", onlaodTasks);
