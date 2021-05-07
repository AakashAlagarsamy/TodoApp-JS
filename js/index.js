import Task from "./task.js";
const taskTextField = document.getElementById("taskTextField");
const addButton = document.getElementById("addButton");
const $todoList = document.getElementById("todoList");
const $doneList = document.getElementById("doneList");
let taskList = [];
addButton.addEventListener("click", (e) => {
  if (taskTextField.value !== "") {
    let task = new Task(taskTextField.value);
    task.add(task, taskList);
    render();
    taskTextField.value = "";
  }
});

const render = () => {
  console.log(taskList);
  $todoList.innerHTML = "";
  $doneList.innerHTML = "";
  taskList.forEach(function (task) {
    let $taskItem = document.createElement("li");
    if (task.status === 0) {
      $taskItem.innerHTML = `<label id="${task.id}">${task.name}</label><input id="${task.id}" type="button" value="Complete" /><input id="${task.id}" type="button" value="Remove" />`;
      $todoList.appendChild($taskItem);
    } else {
      $taskItem.innerHTML = `<label for="${task.id}">${task.name}</label><input id="${task.id}" type="button" value="Incomplete" /><input id="${task.id}" type="button" value="Remove" />`;
      $doneList.appendChild($taskItem);
    }
  });
};

$todoList.addEventListener("click", (e) => {
  let clickedTask = taskList.find((obj) => obj.id == e.target.id);
  if (e.target.value === "Complete") {
    clickedTask.changeStatus(clickedTask);
  } else if (e.target.value === "Remove") {
    taskList = clickedTask.remove(clickedTask, taskList);
  }
  render();
});

$doneList.addEventListener("click", (e) => {
  let clickedTask = taskList.find((obj) => obj.id == e.target.id);
  if (e.target.value === "Incomplete") {
    clickedTask.changeStatus(clickedTask);
  } else if (e.target.value === "Remove") {
    taskList = clickedTask.remove(clickedTask, taskList);
  }
  render();
});
