import TaskList, { tasks } from "./taskList.js";

const getTaskList = () => {
  let taskList;
  if (taskList === undefined) taskList = new TaskList();
  return taskList;
};

function addTask() {
  const taskTextField = document.getElementById("taskTextField");
  if (taskTextField.value !== "") {
    getTaskList().add(taskTextField.value);
    render();
    taskTextField.value = "";
  }
}

function listenTaskButtonClicks(event) {
  const clickedTask = tasks.find((obj) => obj.id == event.target.id);
  if (
    event.target.value === "Complete" ||
    event.target.value === "Incomplete"
  ) {
    clickedTask.changeStatus(clickedTask);
  } else if (event.target.value === "Remove") {
    getTaskList().remove(clickedTask);
  }
  render();
}

const createTaskListElement = (task) => {
  let taskElement = document.createElement("li");
  const statusButton =
    task.status == 0
      ? `<input id="${task.id}" type="button" value="Complete" />`
      : `<input id="${task.id}" type="button" value="Incomplete" />`;
  taskElement.innerHTML =
    `<label id="${task.id}">${task.name}</label><input id="${task.id}" type="button" value="Remove" />` +
    statusButton;
  return taskElement;
};

const render = () => {
  const pendingList = document.getElementById("pendingList");
  const completedList = document.getElementById("completedList");
  pendingList.innerHTML = "";
  completedList.innerHTML = "";
  tasks.forEach(function (task) {
    task.status == 0
      ? pendingList.appendChild(createTaskListElement(task))
      : completedList.appendChild(createTaskListElement(task));
  });
};

export { addTask, listenTaskButtonClicks };
