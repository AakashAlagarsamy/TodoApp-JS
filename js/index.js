import TaskList, { tasks } from "./taskList.js";

export default class Main {
  listenEvents = (id, functionName) => {
    document.getElementById(id).addEventListener("click", functionName);
  };

  getTaskList = () => {
    let taskList;
    if (taskList === undefined) taskList = new TaskList();
    return taskList;
  };

  addTask = () => {
    const taskTextField = document.getElementById("taskTextField");
    if (taskTextField.value !== "") {
      this.getTaskList().add(taskTextField.value);
      this.render();
      taskTextField.value = "";
    }
  };

  listenTaskButtonClicks = (event) => {
    const clickedTask = tasks.find((obj) => obj.id == event.target.id);
    if (
      event.target.value === "Complete" ||
      event.target.value === "Incomplete"
    ) {
      clickedTask.changeStatus(clickedTask);
    } else if (event.target.value === "Remove") {
      this.getTaskList().remove(clickedTask);
    }
    this.render();
  };

  createTaskListElement = (task) => {
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

  render = () => {
    const pendingList = document.getElementById("pendingList");
    const completedList = document.getElementById("completedList");
    pendingList.innerHTML = "";
    completedList.innerHTML = "";
    let _this = this;
    tasks.forEach(function (task) {
      task.status == 0
        ? pendingList.appendChild(_this.createTaskListElement(task))
        : completedList.appendChild(_this.createTaskListElement(task));
    });
  };
}
