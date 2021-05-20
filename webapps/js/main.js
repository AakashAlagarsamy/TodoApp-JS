/* $Id$ */
import TaskList from "./taskList.js";

export default class Main {
  constructor() {
    this.taskList = new TaskList();
    this.bindEventListeners();
  }

  bindEventListeners() {
    document
      .getElementById("taskTextField")
      .addEventListener("keypress", this.handleKeyPress.bind(this));
    document
      .getElementById("addButton")
      .addEventListener("click", this.handleAddTask.bind(this));
    document
      .getElementById("pendingList")
      .addEventListener("click", this.handleTaskEvents.bind(this));
    document
      .getElementById("completedList")
      .addEventListener("click", this.handleTaskEvents.bind(this));
  }

  handleKeyPress(event) {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      this.handleAddTask();
    }
  }

  handleAddTask() {
    const taskTextField = document.getElementById("taskTextField");
    if (taskTextField.value !== "") {
      this.taskList.add(taskTextField.value);
      this.render();
      taskTextField.value = "";
    }
  }

  handleTaskEvents(event) {
    const id = Number(event.target.closest("li").id);
    const task = this.taskList.getTask(id);
    const action = event.target.dataset.action;
    if (action === "remove") {
      this.handleRemoveTask(task);
    } else if (action === "edit") {
      this.handleUpdateTask(task);
    } else if (action === "click") {
      this.handleChangeTask(task);
    }
    this.render();
  }

  handleUpdateTask(task) {
    // No I18N
    const updatedTaskName = prompt("Enter the updated task..", task.name);
    if (task.name === updatedTaskName || updatedTaskName === null) {
      // No I18N
      alert("No changes found!");
    } else if (updatedTaskName === "") {
      // No I18N
      alert("Invalid task name, Please try again!");
    } else {
      task.updateTask(updatedTaskName);
    }
  }

  handleChangeTask(task) {
    task.changeTaskStatus();
  }

  handleRemoveTask(task) {
    this.taskList.remove(task);
  }

  createIconButton(iconClassName, action) {
    // Button Element
    const button = document.createElement("button");
    button.classList.add("taskButtonClass");
    button.dataset.action = action;
    // Icon Element
    const icon = document.createElement("i");
    icon.classList.add("taskIconClass");
    icon.classList.add("fas");
    icon.classList.add(iconClassName);
    icon.dataset.action = action;
    button.appendChild(icon);
    return button;
  }

  createTaskListElement(task) {
    // List Tag
    const taskElement = document.createElement("li");
    taskElement.id = task.id;
    // Input Checkbox Tag
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "taskCheckboxClass";
    checkBox.dataset.action = "click";
    checkBox.checked = task.status == 0 ? false : true;
    // Label Tag - Task Name
    const labelElement = document.createElement("label");
    labelElement.className = "taskNameClass";
    labelElement.dataset.action = "click";
    labelElement.textContent = task.name;
    if (task.status === 1) labelElement.classList.add("completed");
    // Br Tag
    const lineBreakElement = document.createElement("br");
    // Label Tag - DateTime String
    const dateStringElement = document.createElement("label");
    dateStringElement.className = "dateStringClass";
    dateStringElement.textContent = task.timeString;
    // Edit Button
    const editButton = this.createIconButton("fa-pencil-alt", "edit");
    // Remove Button
    const removeButton = this.createIconButton("fa-trash", "remove");

    taskElement.append(
      checkBox,
      labelElement,
      lineBreakElement,
      dateStringElement,
      editButton,
      removeButton
    );
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
