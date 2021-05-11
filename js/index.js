import TaskList from "./taskList.js";

export default class Main {
  constructor() {
    this.taskList = new TaskList();
    this.listenEvents("addButton", this.addTask);
    this.listenEvents("pendingList", this.listenTaskButtonClicks);
    this.listenEvents("completedList", this.listenTaskButtonClicks);
  }

  listenEvents(id, functionName) {
    document.getElementById(id).addEventListener("click", functionName);
  }

  addTask = () => {
    const taskTextField = document.getElementById("taskTextField");
    if (taskTextField.value !== "") {
      this.taskList.add(taskTextField.value);
      this.render();
      taskTextField.value = "";
    }
  };

  listenTaskButtonClicks = (event) => {
    const clickedTask = this.taskList.tasks.find(
      (obj) => obj.id == event.target.parentNode.id
    );
    if (
      event.target.value === "Complete" ||
      event.target.value === "Incomplete"
    ) {
      clickedTask.changeStatus(clickedTask);
    } else if (event.target.value === "Remove") {
      this.taskList.remove(clickedTask);
    }
    this.render();
  };

  createTaskListElement(task) {
    const taskElement = document.createElement("li");
    taskElement.id = task.id;
    const labelElement = document.createElement("label");
    labelElement.textContent = task.name;
    const statusButton = document.createElement("input");
    statusButton.type = "button";
    statusButton.value = task.status == 0 ? "Complete" : "Incomplete";
    const removeButton = document.createElement("input");
    removeButton.type = "button";
    removeButton.value = "Remove";
    taskElement.append(labelElement, statusButton, removeButton);
    return taskElement;
  }

  render() {
    const pendingList = document.getElementById("pendingList");
    const completedList = document.getElementById("completedList");
    pendingList.innerHTML = "";
    completedList.innerHTML = "";
    let _this = this;
    this.taskList.tasks.forEach(function (task) {
      task.status == 0
        ? pendingList.appendChild(_this.createTaskListElement(task))
        : completedList.appendChild(_this.createTaskListElement(task));
    });
  }
}
